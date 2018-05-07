module.exports = (db) => {
    db.createIndex('users', 'email', {unique: true});
};
