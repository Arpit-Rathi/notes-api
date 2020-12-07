const router = require('express').Router();

const notesController = require('../controllers/notes');

router.post('/', notesController.createNote);

router.get('/:noteId', notesController.fetchNote);

router.get('/', notesController.getAllNotes);

module.exports = router;