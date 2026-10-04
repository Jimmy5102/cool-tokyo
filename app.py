from flask import Flask, render_template
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

MAPTILER_API_KEY = os.getenv("MAPTILER_API_KEY")


@app.route("/")
def home():
    return render_template(
        "index.html",
        maptiler_api_key=MAPTILER_API_KEY
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)