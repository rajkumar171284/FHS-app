import requests
from fastapi import FastAPI, Request
import uvicorn
import json

# API call: http://localhost:8000/sendSMS/?receiver_number=6382573460&sms_body=Hi!%20Welcome%20Buddy
# Output parameters: {"gateway_connectivity_status":'OK',"sms_sent_successfully":'OK'}

app = FastAPI()
PORT = 8000
default_number = "6382573460"
default_sms_body = "Testing"
gateway_url = "http://192.168.2.1/cgi-bin/"


@app.get("/sendSMS/")
async def SMSsender(receiver_number: str = default_number,sms_body: str = default_sms_body): # Default SMS parameters
    def checkGatewayConnectivity():
        try:
            http_req = requests.get(url=gateway_url+"luci/admin")
            resp_status = http_req.status_code
            if resp_status == 403:
                return 'OK'
            else:
                return 'NOK'
        except:
            return 'NOK'
    def sendSMSbyNumber(receiver_number,sms_body):
        sms_uname = "shamshu"
        sms_passwd = "tsunami"
        sms_params = {"username":sms_uname,"password":sms_passwd,"number":receiver_number,"text":sms_body}
        try:
            http_req = requests.get(url=gateway_url+"sms_send",params=sms_params)
            resp_status = http_req.text
            resp_status = resp_status[:2] # Response is "OK\n", so clipping just "OK"
            return resp_status
        except:
            resp_status = 'NOK'
            return resp_status
    resp_status = sendSMSbyNumber(receiver_number,sms_body)
    return {"gateway_connectivity_status":checkGatewayConnectivity(),"sms_sent_successfully":resp_status,"receiver_number":receiver_number,"sms_body":sms_body}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT) # Set port number here
