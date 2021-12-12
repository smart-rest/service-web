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

    get(id) {
        const users = this.getAll();
        return _.find(users, { id });
    }

    update(id, user) {
        if (user.id !== id)
            throw new ValidationError('You cannot change the identifier.');

        checkUser(user);
        const path = this.getIdPath(id);
        if (path == null) {
            throw new ValidationError('This user does not exists');
        }

        this.db.push(path, user);

        return user;
    }

    delete(id) {
        const path = this.getIdPath(id);
        if (path != null)
            this.db.delete(path);
    }

    getIdPath(id) {
        const users = this.getAll();
        const index = _.findIndex(users, { id });
        if (index == -1)
            return null;

        return '/users[' + index + ']';
    }
}

module.exports = UserRepository;