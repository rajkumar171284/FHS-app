import pandas as pd
import sqlite3
import paho.mqtt.client as mqtt
import time
from datetime import datetime
import numpy as np
import json
import random

DBFILE = "AR_config.db"
conn = sqlite3.connect(DBFILE)
broker_address="127.0.0.1"
client = mqtt.Client("P1") #create new instance
#client.username_pw_set(username="isl123",password="Isl@2021")
MQTT_QOS = 1
time_delay = 1.0 
intersample_delay = 3.0 # seconds between each gateway MQTT messages
from_hardware = {}#"A-R-001":[1,26,52,54],"W-R-001":[1],"R-R-001":[1],"P-R-001":[1]} # skip data generation

sensors_df = pd.read_sql_query("SELECT * FROM activeSensors",conn)
topics_list = [i for i in sensors_df['sensorID']]

def sendMQTT(json_data):
    try:
        client.connect(broker_address,port=1883,keepalive=60)
    except:
        pass
    D = datetime.now()
    D = D.strftime('%d/%m/%Y %H:%M:%S')
    json_data['D'] = D
    channel = json_data['sensorID']
    mqtt_msg = json.dumps(json_data)
    response = client.publish(channel,mqtt_msg,MQTT_QOS)
    status = response[0]
    if status == 0: # Check whether MQTT msg sent or not
        print("Msg sent: ",mqtt_msg,'- to: ',channel)
    else:
        print("Unable to send msg, re-attempting: ",mqtt_msg)
        response = client.publish(channel,mqtt_msg,0)
        status = response[0]
        if status == 0:
            print("Sent in second attempt",mqtt_msg)
        else:
            print("Final attempt",mqtt_msg)
            response = client.publish(channel,mqtt_msg,2)
    client.disconnect()

while True:
    for sensor in topics_list:
        sensors = sensors_df[sensors_df['sensorID'] == sensor].to_dict(orient='list')
        json_data = {}
        print(sensors)
        for (k,v) in zip(sensors.keys(),sensors.values()):
            json_data[k]=v[0]
        if json_data['type'] == 'P':
            json_data['value'] = random.randrange(0,100,1)/10.0
        elif json_data['type'] == 'L':
            json_data['value'] = random.randrange(200,1000,1)/10.0
        else:
            json_data['value'] = 0
        print(json_data)
        sendMQTT(json_data)
        time.sleep(intersample_delay)
