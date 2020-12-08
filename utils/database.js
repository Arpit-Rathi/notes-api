const CONNECTION_URI = 'mongodb+srv://root:root@cluster0.nadle.mongodb.net/todo?retryWrites=true&w=majority';

const mongoDb = require('mongodb');

const mongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect(CONNECTION_URI)
    .then(client => {
        _db = client.db();
        console.log('Connected to database');
        callback();
    })
    .catch(err => {
        console.log(err)
    })
}

const getDB = () => {
    if(_db) {
        return _db;
    }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;