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


## API calls  (Remember to clear the postgres-db before using, there are some structural changes in tables)

Name | URL | Type | Input params | Output params
-----|-----|------|--------------|-----------------
Send SMS | http://10.1.1.16:8000/sendSMS/ | GET | receiver_number, sms_body | gateway_connectivity_status, sms_sent_successfully, receiver_number, sms_body
Realtime call |  http://10.1.1.16:4107/runtime | POST | |JSON
Time plot Pressure | http://10.1.1.16:4107/chart/pressure | POST | time_period (Refer below) | JSON
Time plot Level | http://10.1.1.16:4107/chart/level | POST | time_period (Refer below)  | Json
Alert Add | http://10.1.1.16:4107/alert/add | POST | sensorID, operator, value, person_name, phoneNO (refer below)| 'Data Addition error' or 'Data Added'
Alert Edit | http://10.1.1.16:4107/alert/edit | POST | sensorID, operator, value, person_name, phoneNO, status, id (refer below) |'Data Editted'
Alert Show | http://10.1.1.16:4107/alert/show | GET ||[{"alertid": 2, "sensorid": "505", "operator": "lessthan", "values1": 15696, "name": "krmk", "phoneno": "99623691114", "modified_date": "2021-11-08T08:31:51.000Z", "status": true, "lastmodified": null  }]|
Alert Delete | http://10.1.1.16:4107/alert/delete | DELETE | id | "Deleted" or "Delete error" |
Login | http://10.1.1.16:4107/login/ | Post | username, password (refer below) | "Invalid credentials" or "Login Successful" |
Notification Show | http://10.1.1.16:4107/notification | GET ||[{ "notificationid": 13, "alertid": "1",sensorid": "501","operator":"lessthan", "values1": 93.8,"alertvalue": 1000,        "name": null,        "phoneno": "9884000157",        "alertdate": "2021-11-15T00:36:52.000Z",        "status": true    }]
    Generate report | http://10.1.1.16:8001/genReport/ | POST | sensorID, startTime, stopTime | min, max, mean, sd, filename
Send report | http://10.1.1.16:8001/sendReport/ | POST | filename, emailID | sentstatus

#### Input for timeperiod - chart -level and pressure
> "Last 5 minutes"<br>
> "Last 15 minutes"<br>
> "Last 30 minutes"<br>
> "Last 1 Hour"<br>
> "Last 3 Hours"<br>
> "Last 6 Hours"<br>
> "Last 24 Hours"<br>
> "Last 7 days"<br>
> "Last 30 days"<br>


#### Sample Input for alert addition
{ "sensorID":"505", "operator":"lessthan","value":"15696","person_name":"krmk","phoneNO":"99623691114"}


#### Sample Input for alert edit
{  "id":1,    "sensorID":"11",    "operator":"greater",    "value":"51",    "person_name":"kk",    "phoneNO":"4",    "status":"FALSE"}

#### Sample Input for login
{  "username":"admin",    "password":"admin"} // correct credentials

#### git token token krishnankrm, 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 
#### Ubuntu ip-3.23.238.254

