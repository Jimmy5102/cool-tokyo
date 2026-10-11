import pandas as pd
import requests
import time
import xml.etree.ElementTree as ET


INPUT_FILE = "data/coolshare.csv"
OUTPUT_FILE = "data/shelters_with_coords.csv"

GEOCODE_URL = "https://geocode.csis.u-tokyo.ac.jp/cgi-bin/simple_geocode.cgi"


df = pd.read_csv(
    INPUT_FILE,
    encoding="utf-8-sig"
)

df["latitude"] = None
df["longitude"] = None


for i, row in df.iterrows():

    address = f"東京都{row['住所']}"

    try:
        response = requests.get(
            GEOCODE_URL,
            params={
                "addr": address,
                "series": "ADDRESS"
            },
            timeout=10
        )

        root = ET.fromstring(response.text)

        candidate = root.find("candidate")

        if candidate is not None:

            longitude = candidate.findtext("longitude")
            latitude = candidate.findtext("latitude")

            df.at[i, "longitude"] = longitude
            df.at[i, "latitude"] = latitude

        else:
            print(f"[NO RESULT] {i}: {address}")

    except Exception as e:
        print(f"[ERROR] {i}: {address} -> {e}")

    if (i + 1) % 50 == 0:
        print(f"Progress: {i + 1}/{len(df)}")

    time.sleep(0.2)


df.to_csv(
    OUTPUT_FILE,
    index=False,
    encoding="utf-8-sig"
)

print()
print("Finished!")
print(f"Saved to: {OUTPUT_FILE}")
print(
    "Coordinates found:",
    df["latitude"].notna().sum(),
    "/",
    len(df)
)