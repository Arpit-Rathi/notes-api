const { getDB } = require('../utils/database');

const mongodb = require('mongodb');

class Label {
    constructor(userId, title, color) {
        this.userId = userId;
        this.title = title;
        this.color = color;
    }

    createLabel() {
        const db = getDB();

        return db
        .collection('labels')
        .insertOne(this)
        .then(data => data)
    }

    static getLabelById(userId, labelId) {
        const db = getDB();

        return db
        .collection('labels')
        .find({$and: [{userId: userId}, {_id: new mongodb.ObjectID(labelId)}]})
        .toArray()
        .then(data => {
            if(data.length == 0)
                return Promise.reject('No label found')
            return data;
        });
    }

    static fetchAll(userId) {
        const db = getDB();
        console.log(userId)
        return db
        .collection('labels')
        .find({userId: userId})
        .toArray()
        .then(data => data)
    }

    static deleteLabel(userId, labelId) {
        const db = getDB();

        return db
        .collection('labels')
        .deleteOne({$and: [{userId: userId}, {_id: new mongodb.ObjectID(labelId)}]})
        .then(data => {
            if(data.deletedCount == 0)
                return Promise.reject('Error deleting label')
            return data;
        });
    }

    static modifyLabel(data) {
        const db = getDB();

        const _id = data._id;
        const userId = data.userId;
        delete data._id;
        delete data.userId;

        return db
        .collection('labels')
        .updateOne({$and: [{_id: new mongodb.ObjectID(_id)}, {userId: userId}]}, {$set: data})
        .then(data => {
            if(data.matchedCount == 0)
                return Promise.reject('Error updating label');
            return data;
        })
    }
}

module.exports = Label;