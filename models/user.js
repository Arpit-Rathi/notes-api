const { getDB } = require('../utils/database');

const mongodb = require('mongodb');

class User {
    constructor(userName, email, password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.status = 'active';
    }

    createUser() {
        const db = getDB();
        return db
        .collection('users')
        .find({email: this.email})
        .toArray()
        .then(data => {
            if(data && data.length > 0) {
                return Promise.reject('Email already in use');
            }
            
            return db
            .collection('users')
            .insertOne(this)
            .then(data => {
                return data;
            });
        });
    }

    static fetchUserById(userId) {
        const db = getDB();
        return db
        .collection('users')
        .find({_id: new mongodb.ObjectID(userId)})
        .toArray()
        .then(data => {
            if(data.length == 0)
                return Promise.reject('No user found')
            return data[0];
        });
    }

    static editUser(userId, body) {
        const db = getDB();

        if(body.email) {
            return db
            .collection('users')
            .find({$and: [{_id: {$ne: new mongodb.ObjectID(userId)}}, {email: body.email}]})
            .toArray()
            .then(data => {
                if(data && data.length > 0) {
                    return Promise.reject('Email already in use');
                }

                return db
                .collection('users')
                .updateOne({_id: new mongodb.ObjectID(userId)}, { $set: body })
                .then(data => data)
            });
        }

        return db
        .collection('users')
        .updateOne({_id: new mongodb.ObjectID(userId)}, { $set: body })
        .then(data => data)
    }
}

module.exports = User;