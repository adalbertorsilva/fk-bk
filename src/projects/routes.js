const Router = require('koa-router');
const database = require('../database');
const repository = require('./repository');
const Add = require('./add');
const All = require('./all');
const Update = require('./update');
const router = new Router();
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];

router
    .get('/projects', async (ctx, next) => {
        const all = new All(repository(database));
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
        const add = new Add(repository(database));
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
        const update = new Update(repository(database));
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
    });

module.exports = router;
