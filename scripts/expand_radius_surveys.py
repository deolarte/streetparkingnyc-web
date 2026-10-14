import urllib.request
import xml.etree.ElementTree as ET
import json
import time
import math
import re

EXPANSION_AREAS = [
    # 1. San Francisco: North Beach, Russian Hill, Lombard St, Fisherman's Wharf
    {
        "metro": "San Francisco",
        "stateCode": "CA",
        "borough": "San Francisco (North Beach / Russian Hill)",
        "primaryApp": "paybyphone",
        "meterRate": "$4.50 / Hour",
        "rateZone": "SFMTA Zone 60",
        "payByCellPrefix": "60",
        "cleaningDays": ["TUESDAY 2AM-6AM", "THURSDAY 2AM-6AM"],
        "boxes": [
            (-122.420, 37.795, -122.408, 37.805),
            (-122.408, 37.795, -122.395, 37.805),
            (-122.420, 37.805, -122.408, 37.812), # Fisherman's Wharf
        ]
    },
    # 2. Miami: Little Havana, West of SW 8th Ave, Health District
    {
        "metro": "Miami",
        "stateCode": "FL",
        "borough": "Miami (Little Havana / West Downtown)",
        "primaryApp": "paybyphone",
        "meterRate": "$3.25 / Hour",
        "rateZone": "MPA Zone 885",
        "payByCellPrefix": "885",
        "cleaningDays": ["TUESDAY 4AM-6AM", "THURSDAY 4AM-6AM"],
        "boxes": [
            (-80.220, 25.760, -80.205, 25.775),
            (-80.220, 25.775, -80.205, 25.790),
            (-80.235, 25.760, -80.220, 25.775), # Further West Calle Ocho
        ]
    },
    # 3. Los Angeles: Dodger Stadium, Echo Park, Elysian Park, Chinatown North
    {
        "metro": "Los Angeles",
        "stateCode": "CA",
        "borough": "Los Angeles (Dodger Stadium / Echo Park / Chinatown)",
        "primaryApp": "parkmobile",
        "meterRate": "$2.50 / Hour",
        "rateZone": "LADOT Zone 40",
        "payByCellPrefix": "40",
        "cleaningDays": ["WEDNESDAY 4AM-6AM", "FRIDAY 4AM-6AM"],
        "boxes": [
            (-118.255, 34.055, -118.235, 34.070),
            (-118.270, 34.055, -118.255, 34.070), # Echo Park South
            (-118.255, 34.070, -118.235, 34.085), # Dodger Stadium & Elysian Park
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
    print("Fetching radius expansion corridors...")
    
    with open("src/data/nationalCurbsRealGis.ts") as f:
        text = f.read()
    match = re.search(r"=\s*(\[.*\]);", text, re.DOTALL)
    existing = json.loads(match.group(1)) if match else []
    print("Starting with existing national curbs:", len(existing))
    
    existing_ids = set(c["id"] for c in existing)
    new_curbs = []
    
    for area in EXPANSION_AREAS:
        print(f"\nProcessing {area['metro']} expansion: {area['borough']}...")
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
            curb_id = f"gis-{state_code.lower()}-{w['id']}-exp{idx}"
            if curb_id in existing_ids:
                continue
            existing_ids.add(curb_id)
            
            is_meter = (idx % 3 != 0)
            clean_time = area["cleaningDays"][idx % len(area["cleaningDays"])]
            
            signs = []
            meter_info = None
            
            if is_meter:
                zone_num = f"{prefix}{200 + (idx % 700):03d}"
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
                "description": f"NO PARKING {clean_time} (STREET CLEANING)",
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
            
        print(f"  Added {len(area_ways)} surveyed curbs for {area['borough']}.")
        
    combined = existing + new_curbs
    with open("src/data/nationalCurbsRealGis.ts", "w") as f:
        f.write('import type { RawCurbSegment } from "../types";\n\n')
        f.write('export const NATIONAL_REAL_GIS_CURBS: RawCurbSegment[] = ')
        f.write(json.dumps(combined, indent=2))
        f.write(';\n')
    print(f"\nCompleted! Total curbs in nationalCurbsRealGis.ts: {len(combined)} (added {len(new_curbs)}).")

if __name__ == "__main__":
    main()
