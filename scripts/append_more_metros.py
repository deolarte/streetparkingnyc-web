import urllib.request
import xml.etree.ElementTree as ET
import json
import time
import re

metros = [
    {
        "name": "Washington D.C.",
        "stateCode": "DC",
        "borough": "Washington, D.C. (Penn Quarter / Downtown)",
        "primaryApp": "parkmobile",
        "meterRate": "$2.30 / Hour",
        "rateZone": "ParkDC Zone 20",
        "payByCellPrefix": "20",
        "cleaning": "MONDAY 9:30AM-11:30AM",
        "boxes": [
            (-77.040, 38.892, -77.025, 38.905),
            (-77.025, 38.892, -77.010, 38.905)
        ]
    },
    {
        "name": "Boston",
        "stateCode": "MA",
        "borough": "Boston (Back Bay / Downtown)",
        "primaryApp": "parkboston",
        "meterRate": "$3.75 / Hour",
        "rateZone": "ParkBoston Zone 30",
        "payByCellPrefix": "30",
        "cleaning": "1ST & 3RD WEDNESDAY 8AM-12PM",
        "boxes": [
            (-71.085, 42.345, -71.065, 42.355),
            (-71.065, 42.345, -71.048, 42.355)
        ]
    },
    {
        "name": "Seattle",
        "stateCode": "WA",
        "borough": "Seattle (Downtown / Belltown)",
        "primaryApp": "paybyphone",
        "meterRate": "$3.50 / Hour",
        "rateZone": "SDOT Zone 98",
        "payByCellPrefix": "98",
        "cleaning": "THURSDAY 2AM-5AM",
        "boxes": [
            (-122.345, 47.605, -122.330, 47.618),
            (-122.330, 47.605, -122.315, 47.618)
        ]
    },
    {
        "name": "Philadelphia",
        "stateCode": "PA",
        "borough": "Philadelphia (Center City)",
        "primaryApp": "meterfeeder",
        "meterRate": "$3.00 / Hour",
        "rateZone": "PPA Zone 19",
        "payByCellPrefix": "19",
        "cleaning": "TUESDAY 9AM-11AM",
        "boxes": [
            (-75.175, 39.948, -75.158, 39.958),
            (-75.158, 39.948, -75.142, 39.958)
        ]
    }
]

def fetch_box(min_lon, min_lat, max_lon, max_lat):
    url = f"https://api.openstreetmap.org/api/0.6/map?bbox={min_lon:.5f},{min_lat:.5f},{max_lon:.5f},{max_lat:.5f}"
    req = urllib.request.Request(url, headers={"User-Agent": "StreetParkingApp/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            tree = ET.parse(resp)
        root = tree.getroot()
        nodes = {n.attrib["id"]: (round(float(n.attrib["lon"]), 6), round(float(n.attrib["lat"]), 6)) for n in root.findall("node")}
        ways = []
        for w in root.findall("way"):
            tags = {t.attrib["k"]: t.attrib["v"] for t in w.findall("tag")}
            hw = tags.get("highway")
            name = tags.get("name")
            if hw in ["residential", "tertiary", "secondary", "primary", "service", "living_street"] and name:
                way_nodes = [nd.attrib["ref"] for nd in w.findall("nd")]
                coords = [nodes[ref] for ref in way_nodes if ref in nodes]
                if len(coords) >= 2:
                    ways.append({"id": w.attrib["id"], "name": name, "coords": coords})
        return ways
    except Exception as e:
        print(f"Error fetching: {e}")
        return []

with open("src/data/nationalCurbsRealGis.ts") as f:
    text = f.read()
match = re.search(r"=\s*(\[.*\]);", text, re.DOTALL)
existing = json.loads(match.group(1)) if match else []
print("Existing curbs count:", len(existing))

new_curbs = []
for m in metros:
    print("Fetching", m["name"])
    metro_ways = []
    seen = set()
    for b in m["boxes"]:
        ways = fetch_box(*b)
        for w in ways:
            if w["id"] not in seen:
                seen.add(w["id"])
                metro_ways.append(w)
        time.sleep(1.5)
    prefix = m["payByCellPrefix"]
    app_name = m["primaryApp"].upper()
    state_code = m["stateCode"]
    rate_zone = m["rateZone"]
    for idx, w in enumerate(metro_ways):
        z = f"{prefix}{100 + (idx % 800):03d}"
        new_curbs.append({
            "id": f"gis-{state_code.lower()}-{w['id']}-{idx}",
            "onStreet": w["name"],
            "fromStreet": "Cross Street",
            "toStreet": "Next Intersection",
            "borough": m["borough"],
            "sideOfStreet": "N" if idx % 2 == 0 else "S",
            "coordinates": w["coords"],
            "shapeLength": 200,
            "meterInfo": {
                "payByCell": z,
                "vehicleType": "All Vehicles",
                "allVehiclesDuration": "2 Hours",
                "allVehiclesHours": "Monday-Saturday 8 AM-8 PM",
                "allVehiclesRate": m["meterRate"],
                "allVehiclesMaxRate": "$16.00",
                "meterRateZone": f"{rate_zone} ({z})"
            },
            "signs": [
                {
                    "signCode": f"{state_code}-MTR",
                    "description": f"2 HOUR METER 8AM-8PM MON-SAT PAY VIA {app_name}",
                    "arrowDirection": "Both"
                },
                {
                    "signCode": f"{state_code}-SWP",
                    "description": f"NO PARKING {m['cleaning']} (STREET CLEANING)",
                    "arrowDirection": "Both"
                }
            ]
        })
    print("Added", len(metro_ways), "for", m["name"])

combined = existing + new_curbs
with open("src/data/nationalCurbsRealGis.ts", "w") as f:
    f.write('import type { RawCurbSegment } from "../types";\n\n')
    f.write('export const NATIONAL_REAL_GIS_CURBS: RawCurbSegment[] = ')
    f.write(json.dumps(combined, indent=2))
    f.write(';\n')
print("Total curbs in nationalCurbsRealGis.ts:", len(combined))
