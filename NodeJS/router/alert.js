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
    "INSERT INTO Alert_table(sensorID, operator, value, name, phoneNO, Modified_Date) VALUES('"+req.body.sensorID+"','"+req.body.operator+"' , "+req.body.value+", '"+req.body.name+"', '"+req.body.phoneNO+"','"+date+"')",
    (err, res) => {
        console.log('Data Added')
        res1.json('Data Added')
    })
})

router.post('/edit', async (req,res1) => {
    console.log("Alert-edit")
    const d = new Date();
    let date = d.toLocaleString();
    pool.query(
        "INSERT INTO Alert_table(sensorID, operator, value, name, phoneNO, Modified_Date) VALUES('"+req.body.sensorID+"','"+req.body.operator+"' , "+req.body.value+", '"+req.body.name+"', '"+req.body.phoneNO+"','"+date+"')",
        (err, res) => {
            console.log('Data Editted')
            res1.json('Data Editted')
        })
    })
module.exports=router