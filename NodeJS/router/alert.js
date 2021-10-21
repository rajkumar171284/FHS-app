express=require('express')
router=express.Router()
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


router.post('/add', async (req,res1) => {
console.log("Alert-Add")
const d = new Date();
let date = d.toLocaleString();
pool.query(
    "INSERT INTO Alert_table(sensorID, operator, value, name, phoneNO, Modified_Date, Status) VALUES('"+req.body.sensorID+"','"+req.body.operator+"' , "+req.body.value+", '"+req.body.name+"', '"+req.body.phoneNO+"','"+date+"',TRUE)",
    (err, res) => {
        console.log('Data Added')
        res1.json('Data Added')
        if(err) throw (err)
    })
})

router.get('/show', async (req,res1) => {
    console.log("Alert-show")
    pool.query(
        "Select * from Alert_table",
        (err, res) => {
            console.log('Data Added')
            res1.json(res.rows)
        })
    })
    
router.post('/edit', async (req,res1) => {
    console.log("Alert-edit")
    const d = new Date();
    let date = d.toLocaleString();
    pool.query(
        "Update Alert_table SET sensorID='"+req.body.sensorID+"',operator='"+req.body.operator+"',value='"+req.body.value+"',name='"+req.body.name+"',phoneNO='"+req.body.phoneNO+"',status='"+req.body.status+"',Modified_Date='"+date+"' WHERE alertid='"+req.body.id+"'",
        (err, res) => {
            console.log('Data Editted')
            res1.json('Data Editted')
        })
    })
module.exports=router