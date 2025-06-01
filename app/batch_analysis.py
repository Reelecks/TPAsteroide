# app/batch_analysis.py

from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import time

TOP_LIMIT_SPEED = 10

def main():
    spark = SparkSession.builder \
        .appName("SpaceDataBatch") \
        .config("spark.sql.shuffle.partitions", "3") \
        .getOrCreate()
    # spark.sparkContext.setLogLevel("ERROR")

    # Calcul du timestamp de coupure (24h avant maintenant)
    now_ts = int(time.time())
    cutoff = now_ts - 24 * 3600

    # 1) Chargement des données Parquet depuis HDFS
    df = spark.read.parquet("hdfs://namenode:9000/data/space/all/")

    # 2) Filtre sur les 24 dernières heures
    recent = df.filter(col("timestamp") >= cutoff)
    print(recent)

    # 3) Agrégation par type
    print("=== Agrégation par type sur 24 h ===")
    agg_type = recent.groupBy("type") \
        .count() \
        .withColumnRenamed("count", "total_obs")
    agg_type.show(truncate=False)

    agg_type.write.mode("overwrite").json("hdfs://namenode:9000/data/space/results/agg_type_24h.json")

    # 4) Top 5 des objets les plus rapides
    print("=== Top 10 des objets les plus rapides sur 24 h ===")
    top5 = recent.orderBy(col("vitesse").desc()) \
        .select("id", "timestamp", "vitesse", "taille", "type") \
        .limit(TOP_LIMIT_SPEED)
    top5.show(truncate=False)

    top5.write.mode("overwrite").json("hdfs://namenode:9000/data/space/results/top_speed_24h.json")

    spark.stop()

if __name__ == "__main__":
    main()
