from flask import Flask, render_template, jsonify
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

MAPTILER_API_KEY = os.getenv("MAPTILER_API_KEY")

DATA_PATH = "data/coolshare.csv"

print("MapTiler key loaded:", bool(MAPTILER_API_KEY))


@app.route("/")
def home():
    return render_template(
        "index.html",
        maptiler_api_key=MAPTILER_API_KEY
    )


@app.route("/api/shelters")
def shelters():
    df = pd.read_csv(
        DATA_PATH,
        encoding="utf-8-sig"
    )

    # Only return useful fields to the browser
    data = []

    for _, row in df.iterrows():
        data.append({
            "city": str(row["区市町村名"]),
            "name": str(row["施設名称"]),
            "address": str(row["住所"]),
            "url": str(row["ホームページURL"]),
            "cooling": str(row["クーリングシェルター\nの指定"]),
            "hours": str(row["開放可能日等(開館時間等)"]),
            "capacity": str(row["受入れ\n可能名数"]),
            "share_spot": str(row["TOKYOクールシェア\nスポットの登録"]),
            "place": str(row["対象の場所"])
        })

    return jsonify(data)


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )