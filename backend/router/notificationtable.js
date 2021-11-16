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


router.get('/', async (req,res1) => {
    console.log("Notification-show")
    pool.query(
        "Select * from Notification_Table",
        (err, res) => {
            res1.json(res.rows)
        })
    })
module.exports=router