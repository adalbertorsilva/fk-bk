const Router = require('koa-router');
const EventEmitter = require('events').EventEmitter;
const database = require('../db/database');
const repository = require('./repository')(database);
const {all, create, update, get, del} = require('./services');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR', 'NOT_FOUND'];
const router = new Router();

router
    .get('/projects', async (ctx, next) => {
        const event = new EventEmitter();
        const getAllProjects = all(repository, event);

        event.on(SUCCESS, (projects) =>{
            ctx.status = 200;
            ctx.body = projects;
        });

        event.on(ERROR, (err) => {
            ctx.status = err.code;
            ctx.body = err;
        });

        await getAllProjects();
    })
    .post('/projects', async (ctx, next) => {
        const event = new EventEmitter();
        const createProject = create(repository, event);

        event.on(SUCCESS, (project) =>{
            ctx.status = 201;
            ctx.body = project;
        });

        event.on(ERROR, (err) => {
            ctx.status = err.code;
            ctx.body = err;
        });

        const data = ctx.request.body;
        await createProject(data);
    })
    .put('/projects/:id', async (ctx, next) => {
        const event = new EventEmitter();
        const updateProject = update(repository, event);

        event.on(SUCCESS, (project) =>{
            ctx.status = 200;
            ctx.body = project;
        });

        event.on(ERROR, (err) => {
            ctx.status = err.code;
            ctx.body = err;
        });

        const data = ctx.request.body;
        const id = ctx.params.id;
        await updateProject(id, data);
    })
    .get('/projects/:id', async (ctx, next) => {
        const event = new EventEmitter();
        const getProject = get(repository, event);

        event.on(SUCCESS, (project) =>{
            ctx.status = 200;
            ctx.body = project;
        });

        event.on(ERROR, (err) => {
            ctx.status = err.code;
            ctx.body = err;
        });

        const id = ctx.params.id;
        await getProject(id);
    })
    .del('/projects/:id', async (ctx, next) => {
        const event = new EventEmitter();
        const deleteProject = del(repository, event);

        event.on(SUCCESS, () =>{
            ctx.status = 204;
        });

        event.on(ERROR, (err) => {
            ctx.status = err.code;
            ctx.body = err;
        });

        const id = ctx.params.id;
        await deleteProject(id);
    });

module.exports = router;
