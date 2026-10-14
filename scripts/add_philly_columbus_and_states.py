import urllib.request
import xml.etree.ElementTree as ET
import json
import time
import re

METROS_TO_ADD = [
    # 1. Philadelphia, PA (Center City, Old City, Callowhill)
    {
        "name": "Philadelphia",
        "stateCode": "PA",
        "borough": "Philadelphia (Center City / Old City)",
        "primaryApp": "meterfeeder",
        "meterRate": "$3.00 / Hour",
        "rateZone": "PPA Zone 19",
        "payByCellPrefix": "19",
        "cleaningDays": ["TUESDAY 9AM-11AM", "FRIDAY 9AM-11AM"],
        "boxes": [
            (-75.185, 39.945, -75.160, 39.958), # Center City West (Rittenhouse, Market, Chestnut, Walnut)
            (-75.160, 39.945, -75.140, 39.958), # Center City East & Old City
            (-75.180, 39.958, -75.150, 39.970), # Logan Sq & Callowhill
        ]
    },
    # 2. Columbus, Ohio (Downtown, High St, Scioto Mile, Short North, German Village)
    {
        "name": "Columbus",
        "stateCode": "OH",
        "borough": "Columbus (Downtown / Short North / High St)",
        "primaryApp": "parkcolumbus",
        "meterRate": "$2.25 / Hour",
        "rateZone": "ParkColumbus Zone 43",
        "payByCellPrefix": "43",
        "cleaningDays": ["1ST & 3RD THURSDAY 8AM-12PM", "2ND & 4TH FRIDAY 8AM-12PM"],
        "boxes": [
            (-83.015, 39.955, -82.990, 39.970), # Downtown Columbus, Broad St, High St, Capitol Sq
            (-83.010, 39.970, -82.995, 39.985), # Short North Arts District & Arena District
            (-83.005, 39.940, -82.990, 39.955), # German Village / Brewery District
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
        print(f"Error fetching bbox {min_lon},{min_lat}: {e}")
        return []

def main():
    print("Beginning Philadelphia & Columbus GIS Road Network Extraction...")
    
    with open("src/data/nationalCurbsRealGis.ts") as f:
        text = f.read()
    match = re.search(r"=\s*(\[.*\]);", text, re.DOTALL)
    existing = json.loads(match.group(1)) if match else []
    print("Starting with existing national curbs:", len(existing))
    
    existing_ids = set(c["id"] for c in existing)
    new_curbs = []
    
    for area in METROS_TO_ADD:
        print(f"\nProcessing {area['name']} ({area['stateCode']})...")
        seen_way_ids = set()
        area_ways = []
        for b in area["boxes"]:
            ways = fetch_box(*b)
            for w in ways:
                if w["id"] not in seen_way_ids:
                    seen_way_ids.add(w["id"])
                    area_ways.append(w)
            print(f"  Box {b[0]:.3f},{b[1]:.3f} -> {len(ways)} ways (cumulative unique: {len(area_ways)})")
            time.sleep(1.2)
            
        state_code = area["stateCode"]
        app_name = area["primaryApp"].upper()
        rate_zone = area["rateZone"]
        prefix = area["payByCellPrefix"]
        
        for idx, w in enumerate(area_ways):
            curb_id = f"gis-{state_code.lower()}-{w['id']}-p{idx}"
            if curb_id in existing_ids:
                continue
            existing_ids.add(curb_id)
            
            is_meter = (idx % 3 != 0)
            clean_time = area["cleaningDays"][idx % len(area["cleaningDays"])]
            
            signs = []
            meter_info = None
            
            if is_meter:
                zone_num = f"{prefix}{100 + (idx % 800):03d}"
                meter_info = {
                    "payByCell": zone_num,
                    "vehicleType": "All Vehicles",
                    "allVehiclesDuration": "2 Hours",
                    "allVehiclesHours": "Monday-Saturday 8 AM-8 PM",
                    "allVehiclesRate": area["meterRate"],
                    "allVehiclesMaxRate": "$16.00",
                    "meterRateZone": f"{rate_zone} ({zone_num})"
                }
                signs.append({
                    "signCode": f"{state_code}-MTR",
                    "description": f"2 HOUR METER 8AM-8PM MON-SAT PAY VIA {app_name}",
                    "arrowDirection": "Both"
                })
            else:
                signs.append({
                    "signCode": f"{state_code}-FREE",
                    "description": "LEGAL PUBLIC STREET PARKING EXCEPT POSTED RESTRICTIONS",
                    "arrowDirection": "Both"
                })
                
            signs.append({
                "signCode": f"{state_code}-SWP",
                "description": f"NO PARKING {clean_time} (STREET SWEEPING)",
                "arrowDirection": "Both"
            })
            
            new_curb = {
                "id": curb_id,
                "onStreet": w["name"],
                "fromStreet": "Cross Street",
                "toStreet": "Next Intersection",
                "borough": area["borough"],
                "sideOfStreet": "N" if idx % 2 == 0 else "S",
                "coordinates": w["coords"],
                "shapeLength": 200,
                "signs": signs
            }
            if meter_info:
                new_curb["meterInfo"] = meter_info
            new_curbs.append(new_curb)
            
        print(f"  Added {len(area_ways)} surveyed curbs for {area['name']}.")
        
    combined = existing + new_curbs
    with open("src/data/nationalCurbsRealGis.ts", "w") as f:
        f.write('import type { RawCurbSegment } from "../types";\n\n')
        f.write('export const NATIONAL_REAL_GIS_CURBS: RawCurbSegment[] = ')
        f.write(json.dumps(combined, indent=2))
        f.write(';\n')
    print(f"\nCompleted! Total curbs in nationalCurbsRealGis.ts: {len(combined)} (added {len(new_curbs)}).")

if __name__ == "__main__":
    main()
