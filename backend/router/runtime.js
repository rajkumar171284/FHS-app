const express = require('express')
const router = express.Router()
const { Pool } = require("pg");
var config1 = require('../config.json');
const user = config1.db_cred.user;
const host = config1.db_cred.host;
const password = config1.db_cred.password;
const port = config1.db_cred.port;

  const pool = new Pool({
    user: user,
    host: host,
    database: "Amaraja",
    password: password,
    port: port
  });

router.post('/', async (req,res) => {
    console.log("Real time-API")
    var distictsensorId=['501','502','503','504','505','506','507','508'];
    var sensordetail=[]

    var promisedummy= new Promise((resolve,reject)=>{distictsensorId.forEach(element => {
        
        pool.query(
            "SELECT * FROM Sensor_Value  WHERE sensorID ='"+element+"' ORDER BY Date DESC  LIMIT 1",
            ).then((res)=>{
                sensordetail.push(res.rows[0])
                if(sensordetail.length==distictsensorId.length)
                resolve(1)
            })
          
    });
})
var dummy11= await promisedummy

var promisedummy1=new Promise((resolve,reject)=>{
    var dummy10=sensordetail.map((element,index)=>{
        var datenow= new Date()
        var seconds = (datenow.getTime()-element.date.getTime()) / 1000;
        if(seconds<60)
        element.status='active'
        else
        element.status='inactive'
    }).then(resolve(1))
})
var dummy12= await promisedummy1

return res.json(sensordetail)
    })
module.exports=router