'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World';
});

app.use(router.routes());

module.exports = app;
