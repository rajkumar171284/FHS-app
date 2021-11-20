import json
import paho.mqtt.client as mqtt
import time
from influxdb import InfluxDBClient
from datetime import datetime
from datetime import timezone
import pandas as pd
import sqlite3

DBFILE = "AR_config.db"
conn = sqlite3.connect(DBFILE)
broker_address="127.0.0.1"
influxClient = InfluxDBClient('localhost', 8086, '', '','fhs')

# Remove this multi line comment part on actual deployment
try:
    influxClient.drop_database('fhs')
except:
    pass
influxClient.create_database('fhs')

sensors_df = pd.read_sql_query("SELECT * FROM activeSensors",conn)
topics_list = [i for i in sensors_df['sensorID']]

def on_message(client, userdata, message):
    msg = str(message.payload.decode("utf-8"))
    msg = json.loads(msg)
    value = msg['value']
    topic = message.topic
    #lt = datetime.now(timezone.utc)
    lt = datetime.strptime(msg['D'],"%d/%m/%Y %H:%M:%S")
    timeInStr = lt.strftime('%Y-%m-%dT%H:%M:%SZ') # current timestamp
    json_body = [{"measurement":topic,"fields":{"lat":msg['lat'], \
        "time":timeInStr, "lng":msg['lng'],"zone":msg['zone'], \
        "type":msg['type'],"unit":msg['unit'],"value":msg['value']}}] # Standard JSON format
    try:
        influxClient.write_points(json_body) # Write json to DB
        print(json_body)
    except:
        pass
    time.sleep(0.1)    

client = mqtt.Client("P2") #create new instance
client.on_message=on_message #attach function to callback
client.connect(broker_address,port=1883) #connect to broker
client.loop_start() #start the loop

for channel in topics_list:
    client.subscribe(channel)
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Exiting...")
    client.disconnect()
    client.loop_stop()
    
