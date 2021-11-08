express=require('express')
router=express.Router()
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


router.post('/add', async (req,res1) => {
console.log("Alert-Add")
const d = new Date();
let date = d.toLocaleString();
pool.query(
    "INSERT INTO Alert_table(sensorID, operator, values1, name, phoneNO, Modified_Date, Status) VALUES('"+req.body.sensorID+"','"+req.body.operator+"' , "+parseFloat(req.body.value)+", '"+req.body.person_name+"', '"+req.body.phoneNO+"','"+date+"',TRUE)",
    (err, res) => {
  
        if(res) 
        {
            res1.json('Data Added')
        }
    })
})

router.get('/show', async (req,res1) => {
    console.log("Alert-show")
    pool.query(
        "Select * from Alert_table",
        (err, res) => {
            res1.json(res.rows)
        })
    })
    
router.post('/edit', async (req,res1) => {
    console.log("Alert-edit")
    const d = new Date();
    let date = d.toLocaleString();
    pool.query(
        "Update Alert_table SET sensorID='"+req.body.sensorID+"',operator='"+req.body.operator+"',values1='"+parseFloat(req.body.value)+"',name='"+req.body.person_name+"',phoneNO='"+req.body.phoneNO+"',status='"+req.body.status+"',Modified_Date='"+date+"' WHERE alertid='"+req.body.id+"'",
        (err, res) => {
            if(err) res1.json(err)
            else
           {
            res1.json('Data Editted')}
            
        })
    })

    router.delete('/delete', async (req,res1) => {
        console.log("Alert-delete")
        pool.query(
            "DELETE FROM Alert_table WHERE alertid='"+req.body.id+"'       ",
            (err, res) => {
                if(err) res1.json("Delete error")
                else res1.json("Deleted")
            })
        })
module.exports=router