var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://127.0.0.1:1883")
const sqlite3 = require('sqlite3').verbose();
var pgtools = require("pgtools");
const { Pool, Client } = require("pg");
var config1 = require('./config.json');
const user = config1.user;
const host = config1.host;
const password = config1.password;
const port = config1.port;

const config = {
    user: user,
    host: host,
    password: password,
    port: port
  };

  const pool = new Pool({
    user: user,
    host: host,
    database: "Amaraja",//"123"
    password: password,
    port: port
  });

  async function functionforasync ()
  {

let d=new Promise((myResolve,myreject)=>
 {pgtools.createdb(config, "Amaraja", function(err, res) {
   // {pgtools.createdb(config, "123", function(err, res) {

    if (err) {
        console.log('DB exists')
        myResolve(1)


    }
    else{
      //Alertid int NOT NULL AUTO_INCREMENT,
      pool.query(
        "CREATE TABLE Alert_table(alertid SERIAL ,sensorID text, operator text,values1 float8,name text, phoneNO text, Modified_Date timestamp not null,status BOOLEAN NOT NULL, Lastmodified timestamp)",
          (err, res) => {
            console.log('Alert Table created')
          }
      ); 
            pool.query(
              "CREATE TABLE Sensor_Value(sensorID text,lat float8 ,lng float8 ,zone text,type text,unit text,values1 float8,Date timestamp not null )",
                (err, res) => {
                  console.log('Sensor Table created')
                  myResolve(1)
                }
            ); 
            
    }
  });
})

let d1=await d
var register=[]

let db = new sqlite3.Database('./AR_config.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
});
// Connects the db to get the list of registors



async function Callback() {

    var sql = "SELECT sensorID FROM activeSensors";
    var promisevar = new Promise(function (resolve, reject) {
        db.all(sql, function (err, rows) {          
            let sensorIDarray = rows.map((element, index) => {
                return element.sensorID
            })
            resolve(sensorIDarray);
        });
    });
    register = await promisevar //register values after querying the db in promise

client.on("connect", function () {
    console.log("connected");
}) //Function to connect to mqtt, executesonly the first time mqtt is connet

client.subscribe(register) // Function to subscribed the topics to read from mqtt

client.on('message', function (topic, message, packet) {
    var messagejson = JSON.parse(message.toString());
    var k=parseFloat(messagejson.value)
    console.log(k)
    pool.query(
        "INSERT INTO Sensor_Value(sensorID, lat, lng, zone, type, unit, values1, Date) VALUES('"+messagejson.sensorID+"',"+messagejson.lat+" , "+messagejson.lng+", '"+messagejson.zone+"', '"+messagejson.type+"','"+messagejson.unit+"','"+k+"','"+messagejson.D+"')",
        (err, res) => {
            if(err)
            console.log(err)
            else
            console.log('inserted')
        })
}); 
   
}
Callback()
  }
functionforasync()