'use strict';

const app = require('./app');
const config = require('./config');
const database = require('./database');

const port = process.env.PORT || config.port;

app.listen(port);
console.log('Listening app to http://localhost:' + port);

database.connect().then(() => console.log('connect to database'));
