# Fire Hydrant Monitoring system
Web application 


**Pressure, Water level sensor** ---Modbus---> **IoT gateway** ---MQTT---> **On premises server(DB & Alert)** ---HTTP---> **Web UI**
<br>

### Prerequisite:
* Install **python**
* Install **node**
* Install **Postgres** as service and store credentials in ***config.json***
* Mosquitto **MQTT**

## To run server
#### Run all services:
> runMe_windows.bat [For Windows PC] <br>

Or <br>
> runMe_linux.sh [For Linux PC] <br>

#### Run individual services:
> python datagen.py <br>
> node mqtt2postgres.js <br>
> python sendSMS.py <br>
> npm start <br>
> node alertusingnode.js <br>


## API calls



Name | URL | Type | Input params | Output params
-----|-----|------|--------------|-----------------
sendSMS | http://localhost:8000/sendSMS/ | GET | receiver_number, sms_body | gateway_connectivity_status, sms_sent_successfully, receiver_number, sms_body
Backend server | http://localhost:4107/ | GET | |
Realtime call |  http://10.1.1.16:4107/runtime | POST | |
Alert Add | http://10.1.1.16:4107/alert/add | POST | sensorID, operator, value, person_name, phoneNO |
Alert Edit | http://10.1.1.16:4107/alert/edit | POST | sensorID, operator, value, person_name, phoneNO, status, id |
Alert Show | http://10.1.1.16:4107/alert/show | GET ||
Alert Delete | http://10.1.1.16:4107/alert/delete | DELETE | id |
