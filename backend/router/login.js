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

router.post('/', async (req,res1) => {
console.log("login-api")
pool.query(
    "SELECT * FROM login_table  WHERE username ='"+req.body.username+"' and password ='"+req.body.password+"'",
    ).then((res,err)=>{
        if(res.rows.length>0)
        {
            console.log('Successful Login')
            res1.json('Login Successful')
        }
        else
        {
            console.log('Invalid Login')
            res1.json('Invalid credentials')
        }
    })
})
module.exports=router