const Router = require('koa-router');
const database = require('../database');
const repository = require('./repository')(database);
const add = require('./add')(repository);
const all = require('./all')(repository);
const router = new Router();

router
    .get('/projects', (ctx, next) => {
        return all()
            .then((projects) => {
                ctx.status = 200;
                ctx.body = projects;
            })
            .catch((err) => {
                ctx.status = 500;
                ctx.body = 'Error at list project';
            });
    })
    .post('/projects', (ctx, next) => {
        const data = ctx.request.body;
        return add(data)
            .then((project) => {
                ctx.status = 201;
                ctx.body = project;
            })
            .catch((err) => {
                ctx.status = 500;
                ctx.body = 'Error at create new project';
            });
    });

module.exports = router;
