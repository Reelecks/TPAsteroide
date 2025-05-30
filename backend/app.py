# backend/app.py

from flask import Flask, jsonify
from hdfs import InsecureClient
import json

app = Flask(__name__)

# Connexion à HDFS (nom de service Docker = namenode)
hdfs_url = "http://namenode:9870"  # WebHDFS REST API
hdfs_user = "root"  # ou l'utilisateur configuré
client = InsecureClient(hdfs_url, user=hdfs_user)

@app.route("/objects")
def get_objects():
    # Lis le fichier JSON sur HDFS (une ligne = un objet)
    meteors = []
    with client.read("/data/meteors.json", encoding="utf-8") as reader:
        for line in reader:
            meteors.append(json.loads(line))
    return jsonify(meteors)

if __name__ == "__main__":
    # écoute sur 0.0.0.0:5550 comme exposé dans docker-compose
    app.run(host="0.0.0.0", port=5550)
