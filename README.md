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
> runMe.bat <br>

Or

> python datagen.py <br>
> node mqtt2postgres.js <br>
> python sendSMS.py <br>
> npm start <br>
> node alertusingnode.js <br>

### API calls
Name | URL | Input params | Output params
-----|-----|--------------|--------------
sendSMS | http://localhost:8000/sendSMS/ | receiver_number,sms_body | gateway_connectivity_status, sms_sent_successfully, receiver_number, sms_body
Backend server | http://localhost:4107/ | |
Realtime call |  | Post call No parameter <br>
alert add | 10.1.1.16:4107/runtime | Post call| {
    "sensorID":"502",
    "operator":"lessthan",
    "value":2.2,
    "person_name":"krmk",
    "phoneNO":"9884000157"
} <br>
alert edit |127.0.0.1:4107/alert/edit | Post call | {
    "sensorID":"501",
    "operator":"lessthan",
    "value":100,
    "person_name":"krmk",
    "phoneNO":"9884000157",
    "status":false,
    "id":5
} <br>
alert show | 127.0.0.1:4107/alert/show | Get call No parameter <br>
alert delete | 127.0.0.1:4107/alert/delete | delete call |{    "id":"4" } <br>
