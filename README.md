# Fire Hydrant Monitoring system
Web application 


**Pressure, Water level sensor** ---Modbus---> **IoT gateway** ---MQTT---> **On premises server(DB & Alert)** ---HTTP---> **Web UI**
<br>

## Prerequisite:
* Install **python**
* Install **node**
* Install **Postgres** as service and store credentials in ***config.json***
* Mosquitto **MQTT**

## Run
1. '''python
python datagen.py
'''
2. '''javascript
node mqtt2postgres.js
'''
