const passport = require('koa-passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const config = require('./config');
const database = require('./database');
const repository = require('./auth/repository')(database);

module.exports = (() => {
    const options = {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const jwtStrategy = new Strategy(options, (payload, done) => {
        repository.one(payload._id)
            .then((user) => {
                if (user) {
                    return done(null, {
                        _id: user._id,
                        email: user.email,
                    });
                }
                return done(null, false);
            }).catch((err) => done(err, null));
    });

    passport.use(jwtStrategy);
    return passport;
})();
