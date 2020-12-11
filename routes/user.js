const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/:userId', userController.fetchUserById);

router.post('/', userController.createUser);

router.patch('/', userController.editUser);

router.patch('/deactivate', userController.deactivateUser);

module.exports = router;