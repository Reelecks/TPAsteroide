-- create_tables.hql

CREATE EXTERNAL TABLE IF NOT EXISTS space_all (
  id STRING,
  `timestamp` BIGINT,
  position STRUCT<x:DOUBLE,y:DOUBLE,z:DOUBLE>,
  vitesse DOUBLE,
  taille DOUBLE,
  type STRING
)
STORED AS PARQUET
LOCATION 'hdfs://namenode:9000/data/space/all/';

CREATE EXTERNAL TABLE IF NOT EXISTS space_alerts (
  id STRING,
  `timestamp` BIGINT,
  position STRUCT<x:DOUBLE,y:DOUBLE,z:DOUBLE>,
  vitesse DOUBLE,
  taille DOUBLE,
  type STRING
)
STORED AS PARQUET
LOCATION 'hdfs://namenode:9000/data/space/alerts/';
