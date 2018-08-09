// const express = require("express");
// const app = express();
const config = require('../config');
const mongoDB = `${config.mongoHost}${config.mongoName}`;
const mongoose = require('mongoose');
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('Connect database success');

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))
