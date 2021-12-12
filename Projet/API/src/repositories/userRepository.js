const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkUser = function(user) {
    if (!user.name || !user.age)
        throw new ValidationError('The user must have a name and an age.')
}

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return this.db.getData("/users");
    }

    add(user) {
        checkUser(user);
        user.id = uuid();
        this.db.push("/users[]", user)
    }
}

module.exports = UserRepository;