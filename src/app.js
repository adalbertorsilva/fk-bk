'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const projects = require('./projects/routes');


const app = new Koa();

app.use(bodyParser());
app.use(projects.routes());

module.exports = app;
