# Fire Hydrant Monitoring system
Web application 


**Pressure, Water level sensor** ---Modbus---> **IoT gateway** ---MQTT---> **On premises server(DB & Alert)** ---HTTP---> **Web UI**
<br>

### Prerequisite:
* Install **python**
* Install **node**
* Install **Postgres** as service and store credentials in ***config.json***
* Mosquitto **MQTT**

### Run(In backend)
> python datagen.py <br>
> node mqtt2postgres.js <br>
> python sendSMS.py <br>
> npm start
> node alertusingnode.js

### API calls
Name | URL | Input params | Output params
-----|-----|--------------|--------------
sendSMS | http://localhost:8000/sendSMS/ | receiver_number,sms_body | gateway_connectivity_status, sms_sent_successfully, receiver_number, sms_body
Backend server | http://localhost:4107/ | |

