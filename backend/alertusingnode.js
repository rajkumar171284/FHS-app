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
        "Select * from Alert_table where status = true",
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
                      if(element1.value<element.value)
                      {
                          console.log('Alert with value '+ element1.value+' less than '+element.value+' in date time '+element1.date)
                      }
                  }
                  if(element.operator=='greaterthan')
                  {
                      if(element1.value>element.value)
                      {
                        console.log('Alert with value '+ element1.value+' greater than '+element.value+' in date time '+element1.date)
                    }
                  }
               });
           }
           else console.log('No data')
        })

    });
}

setInterval(() => {
asyncfunction()
}, 1000);

