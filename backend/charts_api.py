from fastapi import Depends, FastAPI, HTTPException, status, Request
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
time_config = {"Last 5 minutes":[0,'5m'],"Last 15 minutes":[1,'15m'],"Last 30 minutes":[1,'30m'], \
    "Last 1 Hour":[5,'1h'],"Last 3 Hours":[10,'3h'],"Last 6 Hours":[20,'6h'],"Last 24 Hours":[60,'1d'], \
    "Last 7 days":[360,'7d'],"Last 30 days":[720,'30d']}
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
    result_json = {"id":[],"ts":[],"val":[]}
    for i in result:
        result_json["id"].append(i["name"])
        result_json["ts"].append(i["values"][0][0])
        result_json["val"].append(i["values"][0][1])
    return result_json

@app.post("/charts/pressure")
async def pressure(request:Request):
    request = await request.json()
    temp = time_config[request['time_period']]
    result_json = {}
    query = 'SELECT value FROM "502","503","504","505","506","507","508" WHERE time >= now() -'+temp[1]+' ;' # GROUP BY time('+str(temp[0])+'s);'
    result = client.query(query).raw['series']
    for i in result:
        result_json[i['name']] = {'ts':[],'val':[]}
        for j in i['values']:
            result_json[i['name']]['ts'].append(j[0])
            result_json[i['name']]['val'].append(j[1])
    return result_json

@app.post("/charts/level")
async def pressure(request:Request):
    request = await request.json()
    temp = time_config[request['time_period']]
    result_json = {}
    query = 'SELECT value FROM "501" WHERE time >= now() -'+temp[1]+' ;' # GROUP BY time('+str(temp[0])+'s);'
    result = client.query(query).raw['series']
    for i in result:
        result_json[i['name']] = {'ts':[],'val':[]}
        for j in i['values']:
            result_json[i['name']]['ts'].append(j[0])
            result_json[i['name']]['val'].append(j[1])
    return result_json

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=PORT)