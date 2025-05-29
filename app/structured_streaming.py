# app/structured_streaming.py

from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType, LongType, DoubleType

# 1) Schéma des événements
positionSchema = StructType([
    StructField("x", DoubleType(), True),
    StructField("y", DoubleType(), True),
    StructField("z", DoubleType(), True)
])

eventSchema = StructType([
    StructField("id", StringType(), True),
    StructField("timestamp", LongType(), True),
    StructField("position", positionSchema, True),
    StructField("vitesse", DoubleType(), True),
    StructField("taille", DoubleType(), True),
    StructField("type", StringType(), True)
])

# 2) Création du SparkSession
spark = SparkSession.builder \
    .appName("SpaceDataStreaming") \
    .config("spark.sql.shuffle.partitions", "3") \
    .getOrCreate()

# 3) Lecture du flux Kafka
raw_df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "space_data") \
    .option("startingOffsets", "latest") \
    .load()

# 4) Parsing JSON
json_df = raw_df.selectExpr("CAST(value AS STRING) as json_str") \
    .select(from_json(col("json_str"), eventSchema).alias("data")) \
    .select("data.*")

# 5) Filtrage des objets dangereux
alerts_df = json_df.filter((col("vitesse") > 25.0) & (col("taille") > 10.0))

# 6) Écriture continue vers HDFS
#   - Tous les événements
all_query = json_df.writeStream \
    .format("parquet") \
    .option("path", "hdfs://namenode:9000/data/space/all/") \
    .option("checkpointLocation", "hdfs://namenode:9000/checkpoints/all/") \
    .outputMode("append") \
    .start()

#   - Seulement les alertes
alerts_query = alerts_df.writeStream \
    .format("parquet") \
    .option("path", "hdfs://namenode:9000/data/space/alerts/") \
    .option("checkpointLocation", "hdfs://namenode:9000/checkpoints/alerts/") \
    .outputMode("append") \
    .start()

# 7) Attente indéfinie
spark.streams.awaitAnyTermination()
