# producer.py

from __future__ import print_function
import json
import time
import uuid
import random
from kafka import KafkaProducer
import argparse

def generate_event():
    return {
        "id": "meteor_{0}".format(uuid.uuid4().hex[:8]),
        "timestamp": int(time.time()),
        "position": {
            "x": round(random.uniform(-500, 500), 2),
            "y": round(random.uniform(-500, 500), 2),
            "z": round(random.uniform(0, 1000), 2)
        },
        "vitesse": round(random.uniform(5, 30), 1),
        "taille": round(random.uniform(5, 20), 1),
        "type": random.choice(["asteroide", "comete", "exoplanete"])
    }

def main(bootstrap_servers, topic, rate):
    producer = KafkaProducer(
        bootstrap_servers=bootstrap_servers,
        value_serializer=lambda v: json.dumps(v).encode("utf-8")
    )
    try:
        while True:
            event = generate_event()
            producer.send(topic, value=event)
            # print() fonctionne sous Py2 et Py3 grace au __future__ import
            print("Sent: {0}".format(event))
            time.sleep(1.0 / rate)
    except (KeyboardInterrupt, SystemExit):
        print("Arrete par lutilisateur")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--bootstrap-servers", default="kafka:9092",
                        help="Adresse du broker Kafka")
    parser.add_argument("--topic", default="space_data",
                        help="Topic Kafka cible")
    parser.add_argument("--rate", type=float, default=10.0,
                        help="Nombre devenements par seconde")
    args = parser.parse_args()
    main(args.bootstrap_servers, args.topic, args.rate)
