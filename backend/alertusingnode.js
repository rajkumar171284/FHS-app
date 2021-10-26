var pgtools = require("pgtools");
const { Pool, Client } = require("pg");
var config1 = require('./config.json');
const e = require("express");
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


async function asyncfunction()
{
    mypromise=new Promise(function(myResolve, myReject) {
        pool.query(
        "Select * from alert_table where (status = true) and (lastmodified IS NULL OR lastmodified > now() - interval '1 minute')      ",
        (err, res) => {
            myResolve(res.rows)
        })
    })
    let Alertarray=await mypromise
    Alertarray.forEach((element,index) => {
        pool.query("Select * from sensor_value where sensorid='"+element.sensorid+"'and date > now() - interval '1 minute'",
        (err, res) => {
            if(err) console.log(err)
           if(res.rows.length!=0)
           {
            res.rows.forEach((element1,index1) => {
                //   console.log(parseFloat(element.value))// From alerttable
                //   console.log(parseFloat(element1.value)) //from sensortable
                  if(element.operator=='lessthan')
                  {
                      if(parseFloat(element1.value)<parseFloat(element.value))
                      {     console.log(1)
                          let message='Alert in sensor '+ element1.sensorid +' with value '+ element1.value+' less than '+element.value+' in date time '+element1.date
                          let phone=element.phoneno
                          console.log(message,phone)
                      }
                  }
                  if(element.operator=='greaterthan')
                  { console.log(2)
                    if(parseFloat(element1.value)>parseFloat(element.value))
                    {
                        let message='Alert in sensor '+ element1.sensorid +' with value '+ element1.value+' greater than '+element.value+' in date time '+element1.date
                        let phone=element.phoneno
                        console.log(message,phone)

                    }
                  }
               });
           }
        })

    });
}

asyncfunction()
setInterval(() => {asyncfunction()}, 1000);

