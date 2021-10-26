const express = require('express')
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors());
var port = process.env.PORT||4107

app.use('/runtime', require('./router/runtime.js'));
app.use('/alert', require('./router/alert.js'));

app.listen(port, () => {   
    console.log('Server started @' +port)
})