express=require('express')
router=express.Router()
const { response } = require('express');
const { Pool } = require("pg");
var config1 = require('../config.json');
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


router.post('/chart1', async (req,res1) => {
    //127.0.0.1:4107/charts/chart1
// {
//     "start":"2021-10-13",
//     "stop":"2021-10-13",
//     "groupby":"5s"
// }
console.log("chart1")
querystr="Select "
if(req.body.start=='' && req.body.stop=='' &&req.body.groupby=='')
querystr+="values1, date from sensor_value where sensorid='501'"
else if(req.body.start!=''&& req.body.stop!='')
querystr+="values1,date from sensor_value where sensorid='501' and date between '"+req.body.start+"' and '"+req.body.stop+"'"
console.log(querystr)
pool.query(    querystr,    (err, res) => {  
        if(err) 
        {            console.log(err)        }
        else
        { 
           console.log(res.rows)        
          let outputarray=res.rows.map((element100,index)=>{
               element100['date']=element100['date'].toString()
            return(element100)          })
          res1.json(outputarray)     }
    })
})


module.exports=router