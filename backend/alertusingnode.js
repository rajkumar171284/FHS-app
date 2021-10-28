var pgtools = require("pgtools");
const { Pool, Client } = require("pg");
var config1 = require('./config.json');
const axios=require('axios');
const { query } = require("express");

const user = config1.user;
const host = config1.host;
const password = config1.password;
const port = config1.port;
const pool = new Pool({
    user: user,
    host: host,
    database: "Amaraja",
    password: password,
    port: port
});
flag=0
// while(1)
// {
async function asyncfunction()
{   
    mypromise=new Promise(function(myResolve, myReject) {
        pool.query(
        "Select * from alert_table where (status = true) and (lastmodified IS NULL OR lastmodified < now() - interval '1 minute')      ",
        (err, res) => {
            myResolve(res.rows)
        })
    })
    let Alertarray=await mypromise
    console.log(Alertarray)
    for(let j=0;j<Alertarray.length;j++)
        {
                let newpromise=new Promise((myResolve,myreject)=>{
                pool.query("Select * from sensor_value where sensorid='"+Alertarray[j].sensorid+"'and date > now() - interval '3 minute'",
                async(err, res) => {
                if(err) console.log(err)
                   if(res.rows.length!=0)
                   {
                    console.log(res.rows.length)
                    for(let i=0;i<res.rows.length;i++)
                    {                       
                          console.log('j '+j)
                          console.log('i '+i)
                        if(Alertarray[j].operator=='lessthan')
                                {
                                    if(parseFloat(res.rows[i].value)<parseFloat(Alertarray[j].value))
                                    {  
                                        let message='Alertinsensor'+ res.rows[i].sensorid +'withvalue'+ res.rows[i].value+'lessthan'+Alertarray[j].value+'indatetime'//+element1.date
                                        let phone='9962391114'
                                        console.log(message,phone)
                                        let mypromise=new Promise((myResolve1,myreject)=>{
                                                            axios.get('http://localhost:8000/sendSMS', {
                                                            params: {
                                                            receiver_number: phone,
                                                            sms_body: message,             
                                                            }
                                                          })
                                                          .then(function (response) {
                                                            console.log(response.data.sms_sent_successfully);
                                                            if(response.data.sms_sent_successfully!='NOK')
                                                                {   
                                                                    const d = new Date();
                                                                    let date1 = d.toLocaleString();
                                                                    pool.query(
                                                                        "Update Alert_table SET lastmodified='"+date1+"' WHERE alertid='"+Alertarray[j].alertid+"'",
                                                                        (err, res) => {
                                                                            if(err) {console.log(err);console.log('pg update error')}
                                                                            else
                                                                            { console.log("Data Editted")                                                                          
                                                                            }
                                                                            
                                                                        })
                                                                        setTimeout(() => {
                                                                            asyncfunction()
                                                                        }, 1000);
                                                                }
                                                            else
                                                            {
                                                                console.log("Alert Not sent")
                                                                myResolve(1)
                                                            }
                                                            
                                                          })
                                                        })
                                        
                                        let k1=await mypromise
                                        myResolve(1)
                                    }
                                    else
                                   { 
                                       myResolve(1)
                                    }
                                }
                                else if(Alertarray[j].operator=='greaterthan')
                                {
                                    if(parseFloat(res.rows[i].value)>parseFloat(Alertarray[j].value))
                                    {  
                                        myResolve(1)
                                    }
                                    else
                                    {  
                                        myResolve(1)
                                    }                              
                                  }
                        else
                        {
                             myResolve(1)
                        }
                   }
                }
                   else
                   {
                       myResolve(1)
                   }
                })
               })
               let k= await newpromise
           }
        
    
  
}


asyncfunction()
 