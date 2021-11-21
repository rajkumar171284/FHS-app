from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import uvicorn
import influxdb
import json
import pandas as pd
import sqlite3

app = FastAPI()
PORT = 4107
config = json.load(open('config.json','rb'))['time_select']
DBFILE = "AR_config.db"
conn = sqlite3.connect(DBFILE)
sensors_df = pd.read_sql_query("SELECT * FROM activeSensors",conn)
topics_list = [i for i in sensors_df['sensorID']]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # IP whitelisting can be done here
    allow_credentials=True,
    allow_methods=["*"], # HTTP method whitelistings can be done here
    allow_headers=["*"],)


@app.post("/runtime")
async def runtime():
    return_list = [random.choice(char_list) for i in range(random.randint(3,7))]
    return_str = ""
    for i in return_list:
        return_str = return_str + i
    return {"message": return_str}

@app.post("/charts/pressure")
async def pressure():
    return_list = [random.choice(char_list) for i in range(random.randint(3,7))]
    return_str = ""
    for i in return_list:
        return_str = return_str + i
    return {"message": return_str}

@app.post("/charts/level")
async def level():
    return_list = [random.choice(char_list) for i in range(random.randint(3,7))]
    return_str = ""
    for i in return_list:
        return_str = return_str + i
    return {"message": return_str}

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=PORT)

