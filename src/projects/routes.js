const Router = require('koa-router');
const database = require('../database');
const repository = require('./repository')(database);
const Add = require('./add');
const All = require('./all');
const Update = require('./update');
const Get = require('./get');
const router = new Router();
const [SUCCESS, ERROR, NOT_FOUND] = ['SUCCESS', 'ERROR', 'NOT_FOUND'];

router
    .get('/projects', async (ctx, next) => {
        const all = new All(repository);
        all.on(SUCCESS, (projects) =>{
            ctx.status = 200;
            ctx.body = projects;
        }).on(ERROR, (err) => {
            ctx.status = 500;
            ctx.body = err;
        });

        await all.execute();
    })
    .post('/projects', async (ctx, next) => {
        const add = new Add(repository);
        const data = ctx.request.body;

        add.on(SUCCESS, (project) =>{
            ctx.status = 201;
            ctx.body = project;
        }).on(ERROR, (err) => {
            ctx.status = 500;
            ctx.body = err;
        });

        await add.execute(data);
    })
    .put('/projects/:id', async (ctx, next) => {
        const update = new Update(repository);
        const data = ctx.request.body;
        const id = ctx.params.id;

        update.on(SUCCESS, (project) =>{
            ctx.status = 200;
            ctx.body = project;
        }).on(ERROR, (err) => {
            ctx.status = 500;
            ctx.body = err;
        });

        await update.execute(id, data);
    })
    .get('/projects/:id', async (ctx, next) => {
        const get = new Get(repository);
        const id = ctx.params.id;

        get.on(SUCCESS, (project) =>{
            ctx.status = 200;
            ctx.body = project;
        }).on(NOT_FOUND, (err) => {
            ctx.status = 404;
            ctx.body = err;
        }).on(ERROR, (err) => {
            ctx.status = 500;
            ctx.body = err;
        });

        await get.execute(id);
    });

module.exports = router;
