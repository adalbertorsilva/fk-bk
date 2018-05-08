module.exports = (user) => {
    return {
        username: user.username,
        email: user.email.email,
        password: user.password,
        timestamp: user.timestamp,
    };
};
