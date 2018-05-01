const Router = require('koa-router');
const EventEmitter = require('events').EventEmitter;
const database = require('../database');
const repository = require('./repository')(database);
const {register} = require('./services');
const [SUCCESS, ERROR] = ['SUCCESS', 'ERROR'];
const router = new Router();

router
    .post('/register', async (ctx, next) => {
        const event = new EventEmitter();
        const registerUser = register(repository, event);

        event.on(SUCCESS, (user) =>{
            ctx.status = 201;
            ctx.body = user;
        });

        event.on(ERROR, (err) => {
            ctx.status = err.code;
            ctx.body = err;
        });

        const user = ctx.request.body;
        await registerUser(user);
    });

module.exports = router;
