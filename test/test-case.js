const jwt = require('jwt-simple');
const config = require('../src/config');
const database = require('../src/database');

const init = () => {
    return database.connect();
};

const makeUser = () => {
    return {
        username: 'test',
        email: 'test@test.com',
        password: 'secret',
    };
};

const makeJwtToken = () => {
    const users = database.collection('users');
    return users.insertOne(makeUser())
        .then((result) => result.ops[0])
        .then((result) => {
            const payload = {
                _id: result._id,
            };
            return `Bearer ${jwt.encode(payload, config.jwtSecret)}`;
        });
};

const makeModel = (model) => {
    return database.collection(model);
};

const clear = (model) => {
    return makeModel(model).remove({});
};

const finished = () => {
    return clear(users).then(() => database.close());
};

module.exports = {
    init: init,
    authUser: makeUser,
    makeJwtToken: makeJwtToken,
    makeModel: makeModel,
    clear: clear,
    finished: finished,
};
