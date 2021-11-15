var pgtools = require("pgtools");
const { Pool, Client } = require("pg");
var config1 = require('./config.json');
const { query } = require("express");
const user = config1.db_cred.user;
const host = config1.db_cred.host;
const password = config1.db_cred.password;
const port = config1.db_cred.port;
const axios=require('axios')
console.log(user)
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
{   mypromise101=new Promise(async function(myResolve100, myReject100) {
    mypromise=new Promise(async function(myResolve1, myReject) {
        pool.query(
        "Select * from alert_table where (status = true) and (lastmodified IS NULL OR lastmodified < now() - interval '1 minute')      ",
        (err, res) => {
            myResolve1(res.rows)
        })
    })
    let Alertarray=await mypromise
    console.log(Alertarray)
    if(Alertarray.length==0)
    {
        myResolve100(1)
    }
    for(let j=0;j<Alertarray.length;j++)
        {
                let newpromise=new Promise(async (myResolve,myreject)=>{
                    var qury="Select * from sensor_value where sensorid='"+Alertarray[j].sensorid+"'and date1 > now() - interval '1 minute'"
                    pool.query(qury,
                async(err, res) => {
                if(err) console.log(err)
                   if(res.rows.length!=0)
                   {
                    for(let i=0;i<res.rows.length;i++)
                    {       
                        if(Alertarray[j].operator=='lessthan')
                                {   
                                    if(parseFloat(res.rows[i].values1)<parseFloat(Alertarray[j].values1))
                                    {  var k=res.rows[i].date1.toISOString()
                                        var querystr="Insert into Notification_Table (alertid ,sensorID , operator ,values1, alertvalue , phoneNO, AlertDate, status) Values ("+Alertarray[j]['alertid']+","+Alertarray[j]['sensorid']+",'"+Alertarray[j]['operator']+"',"+res.rows[i].values1+","+Alertarray[j]['values1']+",'"+Alertarray[j]['phoneno']+"','"+k+"',TRUE)"
                                       console.log(querystr)
                                        pool.query(
                                          querystr,
                                            (err, res1) => {
                                                if(!err)
                                                {   const d1 = new Date();
                                                    let date1234 = d1.toLocaleString();
                                                    var querystr2="UPDATE alert_table  SET lastmodified = '"+date1234+"' WHERE alertid= '"+Alertarray[j].alertid+"';"
                                                    console.log(querystr2)
                                                 pool.query(
                                                       querystr2,
                                                         (err1, res2) => {
                                                             if(!err1)
                                                             {  
                                                                 console.log('query updated')
                                                                 myResolve100(1)

                                                             }
                                                         })
                                                }

                                               // myResolve(res.rows)
                                            })
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
               if(j==Alertarray.length-1)
               {
                myResolve100(1)
                
            }
           }
        })
        let100=await(mypromise101)
        console.log(1)
        asyncfunction()

}

asyncfunction()
 