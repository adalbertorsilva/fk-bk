'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const projects = require('./projects/routes');
const auth = require('./auth/routes');
const cors = require('koa2-cors');


const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(projects.routes());
app.use(auth.routes());

module.exports = app;
