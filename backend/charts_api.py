from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import random
import uvicorn
from influxdb import InfluxDBClient
import json
import pandas as pd
import sqlite3
import secrets

app = FastAPI()
security = HTTPBasic()
PORT = 4107
config = json.load(open('config.json','rb'))['time_select']
DBFILE = "AR_config.db"
conn = sqlite3.connect(DBFILE)
sensors_df = pd.read_sql_query("SELECT * FROM activeSensors",conn)
topics_list = [i for i in sensors_df['sensorID']]
client = InfluxDBClient(host='localhost',port=8086)
client.switch_database('fhs')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # IP whitelisting can be done here
    allow_credentials=True,
    allow_methods=["*"], # HTTP method whitelistings can be done here
    allow_headers=["*"],)

@app.post("/runtime")
async def runtime(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "isliot")
    correct_password = secrets.compare_digest(credentials.password, "isliot")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    query = """SELECT last(value) FROM "501","502","503","504","505","506","507","508"; """
    result = client.query(query).raw['series']
    print(result)
    result_json = {"id":[],"ts":[],"val":[]}
    for i in result:
        result_json["id"].append(i["name"])
        result_json["ts"].append(i["values"][0][0])
        result_json["val"].append(i["values"][0][1])
    return result_json

@app.post("/charts/pressure")
async def pressure():
    query = """SELECT mean(value) FROM "502","503","504","505","506","507","508"; """
    result = client.query(query).raw['series']
    print(result)
    result_json = {"sensorid":[],"date1":[],"values1":[]}
    for i in result:
        result_json["sensorid"].append(i["name"])
        result_json["date1"].append(i["values"][0][0])
        result_json["values1"].append(i["values"][0][1])
    return result_json

@app.post("/charts/level")
async def level():
    return_list = [random.choice(char_list) for i in range(random.randint(3,7))]
    return_str = ""
    for i in return_list:
        return_str = return_str + i
    return {"message": return_str}

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=PORT)