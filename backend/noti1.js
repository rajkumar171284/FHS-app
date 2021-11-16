var pgtools = require("pgtools");
const { Pool, Client } = require("pg");
var config1 = require('./config.json');
const { query } = require("express");
const user = config1.db_cred.user;
const host = config1.db_cred.host;
const password = config1.db_cred.password;
const port = config1.db_cred.port;
const axios=require('axios')
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
    console.log('program started')
async function asyncfunction()
{   
    mypromise101=new Promise(async function(myResolve100, myReject100) {
    mypromise=new Promise(async function(myResolve1, myReject) {
        pool.query(
            "Select * from alert_table where (status = true) and (lastmodified IS NULL OR lastmodified < now() - interval '1 minute')      ",
            (err, res) => {
                myResolve1(res.rows)
            }) 
    })
    let Alertarray=await mypromise
    if(Alertarray.length==0)
    {
        myResolve100(1)
    }
    for(let j=0;j<Alertarray.length;j++)
        {
                let newpromise=new Promise(async (myResolve,myreject)=>{
                var qury="Select * from sensor_value where sensorid='"+Alertarray[j].sensorid+"'and date1 > now() - interval '1 minute'"
                if(Alertarray[j].operator=='lessthan'){
                   qury+="and values1<'"+Alertarray[j].values1+"'"
                }
                else if(Alertarray[j].operator=='equal'){
                    qury+="and values1='"+Alertarray[j].values1+"'"
                 }
                 else if(Alertarray[j].operator=='greaterthan'){
                    qury+="and values1>'"+Alertarray[j].values1+"'"
                 }
                console.log(qury)

                pool.query(qury,
                    async(err, res) => {
                    if(!err) 
                   { 
                       setTimeout(() => {
                        console.log(res.rows)    
                    }, 200);
                    
                }
                    
                })
                
            })
        }
    })
}

asyncfunction()