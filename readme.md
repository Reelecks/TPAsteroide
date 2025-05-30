## Project Overview

Ce projet met en place une pipeline de données temps réel et batch pour la surveillance d'objets spatiaux (météorites et exoplanètes). Il comprend :

- **Kafka** : ingestion et simulation de flux JSON (`space_data`).
- **Spark Structured Streaming** : consommation du flux Kafka, filtrage des objets dangereux, écriture Parquet dans HDFS.
- **HDFS (Hadoop)** : stockage des fichiers Parquet.
- **Hive** : tables externes pointant vers les dossiers HDFS.
- **Spark Batch** : job PySpark pour analyse historique (24 h) et top 5 des objets les plus rapides.
- **API Flask** : exposition des endpoints `/objects` et `/alerts` via Hive.

## Structure du dépôt

```
./
├── app/
│   ├── structured_streaming.py    # Spark Streaming
│   └── batch_analysis.py         # Spark Batch
├── backend/
│   ├── app.py                    # API Flask
│   └── requirements.txt          # Dépendances Python
├── create_tables.hql             # DDL Hive
├── producer.py                   # Simulateur Kafka
├── docker-compose.yml            # Infrastructure Docker
└── README.md                     # Cette documentation
```

## Prérequis

- Docker et Docker Compose installés
- Ports suivants libres : `9000`, `9870`, `8080`, `8081`, `9092`, `2181`, `9083`, `10000`, `5550`
- (Optionnel) `jq` pour formater les JSON

## Démarrage de l'infrastructure

1. **Lancer** tous les services :

   ```bash
   docker-compose up -d
   ```

2. **Vérifier** l’état des conteneurs :

   ```bash
   docker-compose ps
   ```

## Simulation Kafka

1. **Créer** le topic `space_data` ( optionnel déja créer dans le docker compose) :

   ```bash
   docker exec -it kafka kafka-topics.sh \
     --create --topic space_data \
     --bootstrap-server kafka:9092 \
     --partitions 3 --replication-factor 1
   ```

2. **Lancer** le producer (dans Docker) :

   ```bash
   docker run --rm -it --network hive-net -v "$(pwd)":/app -w /app python:2.7 sh -c "pip install kafka-python && python app/producer.py --bootstrap-servers kafka:9092 --rate 20"
   ```

3. **Vérifier** les messages :

   ```bash
   docker exec -it kafka kafka-console-consumer.sh \
     --bootstrap-server kafka:9092 \
     --topic space_data --from-beginning --timeout-ms 10000
   ```

## Spark Structured Streaming

1. **Code** : `app/structured_streaming.py`
2. **Lancement** :

   ```bash
   docker exec -d spark-master bash -c "\
     /spark/bin/spark-submit \
       --master spark://spark-master:7077 \
       --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0 \
       /app/structured_streaming.py"
   ```

3. **Vérifier** UI Spark : [http://localhost:8080](http://localhost:8080)
4. **Contrôler** HDFS :

   ```bash
   docker exec -it namenode hdfs dfs -ls /data/space/all/
   docker exec -it namenode hdfs dfs -ls /data/space/alerts/
   ```

## Spark Batch (analyse 24 h)

1. **Code** : `app/batch_analysis.py`
2. **Lancement** :

   ```bash
   docker exec -d spark-master bash -c "\
     /spark/bin/spark-submit \
       --master spark://spark-master:7077 \
       /app/batch_analysis.py"
   ```

3. **Voir** les résultats :

   ```bash
   docker logs spark-master --tail 100
   ```

## API Flask

1. **Dépendances** : `backend/requirements.txt`
2. **Code** : `backend/app.py`
3. **Build & Run** :

   ```bash
   docker-compose build backend
   docker-compose up -d backend
   ```

4. **Tester** :

   ```bash
   curl http://localhost:5550/objects | jq .
   curl http://localhost:5550/alerts  | jq .
   ```
