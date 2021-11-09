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


router.post('/pressure', async (req,res1) => {
console.log("pressure-chart")
var querystr='';
var outputarray=[]
let outputarray1=[]
var stop=new Date()
stop.setMinutes ( stop.getMinutes() +330 );
registerarray=['502','503','504','505','506','507','508']

for (j=0;j<registerarray.length;)
{
  var start= new Date ();

  var promise = new Promise((resolve,reject)=>{
    if(req.body.time_period=="Last 5 minutes")
    { 
      start.setMinutes ( start.getMinutes() +325 );
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start.toISOString().slice(0,16)+"'  , timestamp '"+stop.toISOString().slice(0,16)+"' , interval  '1 second') as day1) d Left JOIN (Select DATE_TRUNC('second', date1) as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start.toISOString().slice(0,16)+"' and  '"+stop.toISOString().slice(0,16)+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
      //querystr="Select values1, date1 as day1 from sensor_value where sensorid='501' and date1 between '"+start.toISOString()+"' and '"+stop.toISOString()+"'"
    }
    else if(req.body.time_period=="Last 15 minutes")
    { 
      start.setMinutes ( start.getMinutes() +315 );
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start.toISOString().slice(0,16)+"'  , timestamp '"+stop.toISOString().slice(0,16)+"' , interval  '1 minute') as day1) d Left JOIN (Select DATE_TRUNC('minute', date1) as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start.toISOString().slice(0,16)+"' and  '"+stop.toISOString().slice(0,16)+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    else if(req.body.time_period=="Last 30 minutes")
    { 
      start.setMinutes ( start.getMinutes() +300 );
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start.toISOString().slice(0,16)+"'  , timestamp '"+stop.toISOString().slice(0,16)+"' , interval  '1 minute') as day1) d Left JOIN (Select DATE_TRUNC('minute', date1) as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start.toISOString().slice(0,16)+"' and  '"+stop.toISOString().slice(0,16)+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    else if(req.body.time_period=="Last 1 Hour")
    { 
      start.setMinutes ( start.getMinutes() +270 );
      var coff = 1000 * 60 * 5; //5min
    
      var stop1 = new Date(Math.ceil(stop/ coff) * coff);
      var start1 = new Date(Math.floor(start/ coff) * coff);
      var stop2 = new Date(Math.floor(stop/ coff) * coff);
    
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '5 minute') as day1) d Left JOIN (select date_trunc('hour', date1 ) + date_part('minute', date1)::int / 5 * interval '5 min'  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    else if(req.body.time_period=="Last 3 Hours")
    { 
      var coff = 1000 * 60 * 10; //10min
      start.setMinutes ( start.getMinutes() +150 );
      var stop1 = new Date(Math.ceil(stop/ coff) * coff);
      var stop2 = new Date(Math.floor(stop/ coff) * coff);
      var start1 = new Date(Math.floor(start/ coff) * coff);
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop1.toISOString()+"' , interval  '10 minute') as day1) d Left JOIN (select date_trunc('hour', date1 ) + date_part('minute', date1)::int / 10 * interval '10 min'  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    
    else if(req.body.time_period=="Last 6 Hours")
    { 
      var coff = 1000 * 60 * 20; //20min
      start.setMinutes ( start.getMinutes() -50 );
      var stop1 = new Date(Math.ceil(stop/ coff) * coff);
      var stop2 = new Date(Math.floor(stop/ coff) * coff);
      var start1 = new Date(Math.floor(start/ coff) * coff);
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '20 minute') as day1) d Left JOIN (select date_trunc('hour', date1 ) + date_part('minute', date1)::int / 20 * interval '20 min'  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    else if(req.body.time_period=="Last 24 Hours")
    { 
      var coff = 1000 * 60 * 60; //60min
      start.setMinutes ( start.getMinutes() -1130 );
      var stop1 = new Date(Math.ceil(stop/ coff) * coff);
      var stop2 = new Date(Math.floor(stop/ coff) * coff);
      var start1 = new Date(Math.floor(start/ coff) * coff);
    
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '1 hour') as day1) d Left JOIN (select date_trunc('hour', date1 )  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    else if(req.body.time_period=="Last 7 days")
    { 
      var coff = 1000 * 60 * 360; //6hrs
      start.setMinutes ( start.getMinutes() -9750 );
      var stop1 = new Date(Math.ceil(stop/ coff) * coff);
      var start1 = new Date(Math.floor(start/ coff) * coff);
      var stop2 = new Date(Math.floor(stop/ coff) * coff);
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '6 hour') as day1) d Left JOIN ( select date_trunc('day', date1 ) + date_part('hour', date1)::int / 6 * interval '6 hour'  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between   '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    else if(req.body.time_period=="Last 30 days")
    { 
      var coff = 1000 * 60 * 60*12; //12hrs
      start.setMinutes ( start.getMinutes() -42870 );
      var stop1 = new Date(Math.ceil(stop/ coff) * coff);
      var start1 = new Date(Math.floor(start/ coff) * coff);
      var stop2 = new Date(Math.floor(stop/ coff) * coff);
      querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '12 hour') as day1) d Left JOIN ( select date_trunc('day', date1 ) + date_part('hour', date1)::int / 12 * interval '12 hour'  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between   '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    }
    // else if(req.body.time_period=="Last 6 months")
    // { 
    //   var coff = 1000 * 60 * 60 * 72; //72hrs-3days
    //   start.setMinutes ( start.getMinutes() -330 );
    //   start.setMonth(start.getMonth() -6);
    //   var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    //   var start1 = new Date(Math.floor(start/ coff) * coff);
    //   var stop2 = new Date(Math.floor(stop/ coff) * coff);
    //   querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '3 day') as day1) d Left JOIN ( select date_trunc('week', date1 ) + date_part('day', date1)::int / 3 * interval '3 day'  as day1, avg(values1) as values1 from sensor_value where sensorid='"+registerarray[j]+"' and date1 between   '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
    // }
    console.log(querystr)
    pool.query(    querystr,    (err, res) => {  
            if(err) 
            {            console.log(err)        }
            else
            { 
              outputarray1=res.rows.map((element100,index)=>{
                element100['date']=element100['day1'].toString()
                 delete element100['day1']
    
                return(element100)  
                      })
                        var k= {"sensor":registerarray[j],"array":outputarray1}
                          outputarray.push(k)
                       resolve(1)
                                    
            }
        })
  })
  let k=await(promise)
  j++
if(j==registerarray.length)
res1.json(outputarray )
}

})

router.post('/level', async (req,res1) => {
  // select date_trunc('hour', date)
  //     + date_part('minute', date)::int / 1* interval '1 min' as timeinterval , avg(values1) from sensor_value group by 1
  // order by timeinterval asc
  
  //SELECT * FROM (SELECT * from generate_series(timestamp '2021-11-08T14:16:00'  , timestamp '2021-11-08T14:20:00' , interval  '1 minute') as day1) d Left JOIN (Select DATE_TRUNC('minute', date1) as day1, avg(values1) from sensor_value where sensorid='501' and date1 between '2021-11-08T14:16:00' and '2021-11-08T14:20:00' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1;
  //SELECT * from generate_series(timestamp '2007-12-01'                        , timestamp '2008-12-01'                        , interval  '5 minute')
  console.log("chart")
  var querystr='';
  var stop=new Date()
  var start=     new Date ( stop );
  stop.setMinutes ( stop.getMinutes() +330 );
  
  if(req.body.time_period=="Last 5 minutes")
  { 
    start.setMinutes ( start.getMinutes() +325 );
    querystr="Select values1, date1 from sensor_value where sensorid='501' and date1 between '"+start.toISOString()+"' and '"+stop.toISOString()+"'"
  }
  else if(req.body.time_period=="Last 15 minutes")
  { 
    start.setMinutes ( start.getMinutes() +315 );
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start.toISOString().slice(0,16)+"'  , timestamp '"+stop.toISOString().slice(0,16)+"' , interval  '1 minute') as day1) d Left JOIN (Select DATE_TRUNC('minute', date1) as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between  '"+start.toISOString().slice(0,16)+"' and  '"+stop.toISOString().slice(0,16)+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  else if(req.body.time_period=="Last 30 minutes")
  { 
    start.setMinutes ( start.getMinutes() +300 );
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start.toISOString().slice(0,16)+"'  , timestamp '"+stop.toISOString().slice(0,16)+"' , interval  '1 minute') as day1) d Left JOIN (Select DATE_TRUNC('minute', date1) as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between  '"+start.toISOString().slice(0,16)+"' and  '"+stop.toISOString().slice(0,16)+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  else if(req.body.time_period=="Last 1 Hour")
  { 
    start.setMinutes ( start.getMinutes() +270 );
    var coff = 1000 * 60 * 5; //5min
  
    var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    var start1 = new Date(Math.floor(start/ coff) * coff);
    var stop2 = new Date(Math.floor(stop/ coff) * coff);
  
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '5 minute') as day1) d Left JOIN (select date_trunc('hour', date1 ) + date_part('minute', date1)::int / 5 * interval '5 min'  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  else if(req.body.time_period=="Last 3 Hours")
  { 
    var coff = 1000 * 60 * 10; //10min
    start.setMinutes ( start.getMinutes() +150 );
    var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    var stop2 = new Date(Math.floor(stop/ coff) * coff);
  
    var start1 = new Date(Math.floor(start/ coff) * coff);
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop1.toISOString()+"' , interval  '10 minute') as day1) d Left JOIN (select date_trunc('hour', date1 ) + date_part('minute', date1)::int / 10 * interval '10 min'  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  
  else if(req.body.time_period=="Last 6 Hours")
  { 
    var coff = 1000 * 60 * 20; //20min
    start.setMinutes ( start.getMinutes() -50 );
    var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    var stop2 = new Date(Math.floor(stop/ coff) * coff);
    var start1 = new Date(Math.floor(start/ coff) * coff);
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '20 minute') as day1) d Left JOIN (select date_trunc('hour', date1 ) + date_part('minute', date1)::int / 20 * interval '20 min'  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  else if(req.body.time_period=="Last 24 Hours")
  { 
    var coff = 1000 * 60 * 60; //60min
    start.setMinutes ( start.getMinutes() -1130 );
    var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    var stop2 = new Date(Math.floor(stop/ coff) * coff);
    console.log(stop2)
    var start1 = new Date(Math.floor(start/ coff) * coff);
  
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '1 hour') as day1) d Left JOIN (select date_trunc('hour', date1 )  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between  '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  else if(req.body.time_period=="Last 7 days")
  { 
    var coff = 1000 * 60 * 360; //6hrs
    start.setMinutes ( start.getMinutes() -9750 );
    var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    var start1 = new Date(Math.floor(start/ coff) * coff);
    var stop2 = new Date(Math.floor(stop/ coff) * coff);
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '6 hour') as day1) d Left JOIN ( select date_trunc('day', date1 ) + date_part('hour', date1)::int / 6 * interval '6 hour'  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between   '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  else if(req.body.time_period=="Last 30 days")
  { 
    var coff = 1000 * 60 * 60*12; //12hrs
    start.setMinutes ( start.getMinutes() -42870 );
    var stop1 = new Date(Math.ceil(stop/ coff) * coff);
    var start1 = new Date(Math.floor(start/ coff) * coff);
    var stop2 = new Date(Math.floor(stop/ coff) * coff);
    querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '12 hour') as day1) d Left JOIN ( select date_trunc('day', date1 ) + date_part('hour', date1)::int / 12 * interval '12 hour'  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between   '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  }
  // else if(req.body.time_period=="Last 6 months")
  // { 
  //   var coff = 1000 * 60 * 60 * 72; //72hrs-3days
  //   start.setMinutes ( start.getMinutes() -330 );
  //   start.setMonth(start.getMonth() -6);
  //   var stop1 = new Date(Math.ceil(stop/ coff) * coff);
  //   var start1 = new Date(Math.floor(start/ coff) * coff);
  //   var stop2 = new Date(Math.floor(stop/ coff) * coff);
  //   querystr="SELECT * FROM (SELECT * from generate_series(timestamp '"+start1.toISOString()+"'  , timestamp '"+stop2.toISOString()+"' , interval  '3 day') as day1) d Left JOIN ( select date_trunc('week', date1 ) + date_part('day', date1)::int / 3 * interval '3 day'  as day1, avg(values1) as values1 from sensor_value where sensorid='501' and date1 between   '"+start1.toISOString()+"' and  '"+stop1.toISOString()+"' group by 1 order by day1 asc) t USING (day1) ORDER  BY day1"
  // }
  console.log(querystr)
  pool.query(    querystr,    (err, res) => {  
          if(err) 
          {            console.log(err)        }
          else
          { 
            let outputarray=res.rows.map((element100,index)=>{
              element100['date']=element100['day1'].toString()
              // delete element100['day1']
              return(element100)  
              //return(element100)  
  
                    })
            res1.json(outputarray )
          }
      })
  })
  

module.exports=router

// if(req.body.start=='' && req.body.stop=='' &&req.body.groupby=='')
// querystr+="values1, date from sensor_value where sensorid='501'"
// else if(req.body.start!=''&& req.body.stop!='')
// querystr+="values1,date from sensor_value where sensorid='501' and date between '"+req.body.start+"' and '"+req.body.stop+"'"