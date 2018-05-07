'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const projects = require('./projects/routes');
const user = require('./auth/routes');
const cors = require('koa2-cors');
const auth = require('./auth/auth');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(auth.initialize());
app.use(user.routes());
app.use(auth.authenticate('jwt', {session: false}));
app.use(projects.routes());

module.exports = app;
