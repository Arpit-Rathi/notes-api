const router = require('express').Router();

const labelController = require('../controllers/label');

router.get('/', labelController.fetchAll);

router.get('/:labelId', labelController.fetchLabelById);

router.post('/', labelController.createLabel);

router.patch('/', labelController.editLabel);

router.delete('/:labelId', labelController.deleteLabel);

module.exports = router;