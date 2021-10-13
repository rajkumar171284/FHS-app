import pandas as pd
import sqlite3
import paho.mqtt.client as mqtt
import time
from datetime import datetime
import json
from influxdb import InfluxDBClient
import pytz

DBFILE = "AR_config.db"
conn = sqlite3.connect(DBFILE)

broker_address="127.0.0.1"
MQTT_QOS = 1

influxClient = InfluxDBClient('localhost', 8086, '', '','ARbat')
influxClient.drop_database('ARbat')
influxClient.create_database('ARbat')
timezone = pytz.timezone("Asia/Kolkata")


sensors_df = pd.read_sql_query("SELECT * FROM activeSensors",conn)

def on_message(client, userdata, message):
    print('msg received')
    msg = message.payload.decode("utf-8")
    msg = json.loads(msg)
    print(msg)
    print(type(msg))
    topic = message.topic
    lt = datetime.strptime(msg['D'],"%d/%m/%Y %H:%M:%S")
    lt = timezone.localize(lt)
    measurement = msg['sensorID']
    json_body = [{"measurement":measurement,"fields":msg}] # Standard JSON format
    try:
        influxClient.write_points(json_body) # Write json to DB
        print(json_body)
    except:
        pass    

topics_list = [(i,MQTT_QOS) for i in sensors_df['sensorID']]
client = mqtt.Client("P2") #create new instance
#client.username_pw_set(username="isl123",password="Isl@2021")
client.connect(broker_address,port=1883,keepalive=60) #connect to broker
client.on_message=on_message #attach function to callback
client.loop_start() #start the loop
client.subscribe(topics_list)
print("Subscribed to : ",topics_list)
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Exiting")
    client.disconnect()
    client.loop_stop()
