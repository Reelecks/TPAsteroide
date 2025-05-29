# backend/app.py

from flask import Flask, jsonify
from pyhive import hive

app = Flask(__name__)

# Connexion à HiveServer2 (nom de service Docker = hive-server)
conn = hive.Connection(
    host="hive-server",
    port=10000,
    username="hiveuser",
    database="default"
)

def query_to_json(query):
    cursor = conn.cursor()
    cursor.execute(query)
    cols = [c[0] for c in cursor.description]
    rows = cursor.fetchall()
    return [dict(zip(cols, row)) for row in rows]

@app.route("/objects")
def get_objects():
    q = """
    SELECT
      id,
      `timestamp`,
      position.x    AS x,
      position.y    AS y,
      position.z    AS z,
      vitesse,
      taille,
      type
    FROM space_all
    ORDER BY `timestamp` DESC
    LIMIT 100
    """
    return jsonify(query_to_json(q))

@app.route("/alerts")
def get_alerts():
    q = """
    SELECT
      id,
      `timestamp`,
      position.x AS x,
      position.y AS y,
      position.z AS z,
      vitesse,
      taille,
      type
    FROM space_alerts
    ORDER BY `timestamp` DESC
    LIMIT 100
    """
    return jsonify(query_to_json(q))

if __name__ == "__main__":
    # écoute sur 0.0.0.0:5550 comme exposé dans docker-compose
    app.run(host="0.0.0.0", port=5550)
