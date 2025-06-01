# backend/app.py

from flask import Flask, jsonify
from hdfs import InsecureClient
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connexion à HDFS (nom de service Docker = namenode)
hdfs_url = "http://namenode:9870"  # WebHDFS REST API
hdfs_user = "root"  # ou l'utilisateur configuré
client = InsecureClient(hdfs_url, user=hdfs_user)

@app.route("/list-files")
def list_files():
    files = client.list("/data/space/results")
    print(files)
    return jsonify(files)

@app.route("/results/agg-type")

def get_objects():
    meteors = []
    with client.read("/data/space/results/agg_type_24h.json", encoding="utf-8") as reader:
        for line in reader:
            meteors.append(json.loads(line))
    return jsonify(meteors)

@app.route("/results/top-speed")
def get_top_speed():
    meteors = []
    with client.read("/data/space/results/top_speed_24h.json", encoding="utf-8") as reader:
        for line in reader:
            meteors.append(json.loads(line))
    return jsonify(meteors)

if __name__ == "__main__":
    # écoute sur 0.0.0.0:5550 comme exposé dans docker-compose
    app.run(host="0.0.0.0", port=5550)
