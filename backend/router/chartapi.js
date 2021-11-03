express=require('express')
router=express.Router()
const { response } = require('express');
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


router.post('/level', async (req,res1) => {
// select date_trunc('hour', date)
//     + date_part('minute', date)::int / 1* interval '1 min' as timeinterval , avg(values1) from sensor_value group by 1
// order by timeinterval asc

//SELECT * FROM (SELECT * from generate_series(timestamp '2021-03-11T15:00'  , timestamp '2021-04-11T20:00' , interval  '5 minute') as day1) d Left JOIN (Select DATE_TRUNC('minute', date1) as day1, avg(values1) from sensor_value where sensorid='501' and date1 between '2021-03-11' and '2021-04-11' group by 1 order by day1 asc) t USING (day1)ORDER  BY day1;
//SELECT * from generate_series(timestamp '2007-12-01'                        , timestamp '2008-12-01'                        , interval  '5 minute')
console.log("chart")
var querystr;
var stop=new Date()
var start=     new Date ( stop );
stop.setMinutes ( stop.getMinutes() +330 );

if(req.body.time_period=="Last 5 minutes")
{ 
  start.setMinutes ( start.getMinutes() +325 );
  querystr="Select values1, date1 from sensor_value where sensorid='501' and date1 between '"+start.toISOString()+"' and '"+stop.toISOString()+"'"
}
if(req.body.time_period=="Last 15 minutes")
{ 
  start.setMinutes ( start.getMinutes() +315 );
  querystr="Select DATE_TRUNC('minute', date1) as date1, avg(values1) from sensor_value where sensorid='501' and date1 between '"+start.toISOString()+"' and '"+stop.toISOString()+"' group by 1 order by date1 asc"
}
console.log(querystr)
pool.query(    querystr,    (err, res) => {  
        if(err) 
        {            console.log(err)        }
        else
        { 
           console.log(res.rows)        
          let outputarray=res.rows.map((element100,index)=>{
              element100['date']=element100['date1'].toString()
            return(element100)          })
          res1.json(outputarray)     }
    })
})


module.exports=router

// if(req.body.start=='' && req.body.stop=='' &&req.body.groupby=='')
// querystr+="values1, date from sensor_value where sensorid='501'"
// else if(req.body.start!=''&& req.body.stop!='')
// querystr+="values1,date from sensor_value where sensorid='501' and date between '"+req.body.start+"' and '"+req.body.stop+"'"