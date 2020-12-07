const { getDB } = require("../utils/database");
const mongodb = require('mongodb');

class Notes {
    constructor(userId, labelId, title, summary, content, isArchived) {
        this.userId = userId;
        this.lableId = labelId;
        this.data = {
            title: title,
            summary: summary,
            content: content
        };
        this.isArchived = isArchived;
    }

    save() {
        const db = getDB();
        return db.collection('notes')
            .insertOne(this)
            .then(res => console.log('Data inserted'))
            .catch(err => console.log(err))
    }

    static fetchNote(id) {
        const db = getDB();
        console.log(new mongodb.ObjectId(id))
        return db.collection('notes')
            .find({_id: new mongodb.ObjectId(id)})
            .next()
            .then(data => {
                console.log('Data found');
                return data
            })
            .catch(err => console.log(err))
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('notes')
            .find()
            .toArray()
            .then(data => {
                console.log('Data found');
                return data;
            })
            .catch(err => console.log(err))
    }
}

module.exports = Notes;