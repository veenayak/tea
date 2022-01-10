const mongoose = require('mongoose');
const config = require("./config");

const url = "mongodb://"+config.development.database.user+":"+config.development.database.pwd+"@"+config.development.database.host+":"+config.development.database.port+"/tea";  

mongoose.connect(url, {useNewUrlParser: true});
const conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;