'use strict';

const app = require('./app');
const config = require('./config');

const port = process.env.PORT || config.port;
app.listen(port);
console.log('Listening app to http://localhost:' + port);
