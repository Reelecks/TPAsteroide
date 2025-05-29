# app/batch_analysis.py

from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import time

def main():
    spark = SparkSession.builder \
        .appName("SpaceDataBatch") \
        .config("spark.sql.shuffle.partitions", "3") \
        .getOrCreate()

    # Calcul du timestamp de coupure (24h avant maintenant)
    now_ts = int(time.time())
    cutoff = now_ts - 24 * 3600

    # 1) Chargement des données Parquet depuis HDFS
    df = spark.read.parquet("hdfs://namenode:9000/data/space/all/")

    # 2) Filtre sur les 24 dernières heures
    recent = df.filter(col("timestamp") >= cutoff)

    # 3) Agrégation par type
    print("=== Agrégation par type sur 24 h ===")
    recent.groupBy("type") \
          .count() \
          .withColumnRenamed("count", "total_obs") \
          .show(truncate=False)

    # 4) Top 5 des objets les plus rapides
    print("=== Top 5 des objets les plus rapides sur 24 h ===")
    recent.orderBy(col("vitesse").desc()) \
          .select("id", "timestamp", "vitesse", "taille", "type") \
          .limit(5) \
          .show(truncate=False)

    spark.stop()

if __name__ == "__main__":
    main()
