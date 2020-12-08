const { db } = require('../utils/database');

const mongodb = require('mongodb');

class User {
    constructor(userName, email, password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.status = 'active';
    }
}

module.exports = User;