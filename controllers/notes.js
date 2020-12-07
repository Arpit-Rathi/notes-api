const Notes = require('../models/notes');

exports.createNote = (req, res) => {
    const {userId, labelId, title, summary, content, isArchived} = req.body;
    const note = new Notes(userId, labelId, title, summary, content, isArchived);
    note
    .save()
    .then(data => res.status(201).json({'message': 'New note created'}))
    .catch(err => console.log('Error creating new note'))
}

exports.getAllNotes = (req, res) => {
    Notes
    .fetchAll()
    .then(data => {
        console.log(data);
        res.status(200).json(data)
    })
    .catch(err => console.log('Error creating new note'))
}

exports.fetchNote = (req, res) => {
    Notes
    .fetchNote(req.params.noteId)
    .then(data => {
        console.log(data);
        res.status(200).json(data);
    })
}