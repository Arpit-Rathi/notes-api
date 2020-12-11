const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const { userName, email, password } = req.body;
    const user = new User(userName, email, password);
    user
    .createUser()
    .then(data => {
        console.log(data.ops);
        res
        .status(201)
        .json({
            'message': 'User created',
            'data': {
                'userName': data.ops[0].userName,
                'email': data.ops[0].email
            }
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 409;
        next(error);
    })
}

exports.fetchUserById = (req, res, next) => {
    const userId = req.params.userId;
    User.fetchUserById(userId)
    .then(data => {
        res
        .status(200)
        .json(data)
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 404;
        next(error);
    });
}

exports.editUser = (req, res, next) => {
    const { userName, email, password } = req.body;
    User.editUser('5fd0f864ae8bbe2ab4dcbdd8', req.body)
    .then(data => {
        res
        .status(200)
        .json({
            'message': 'User modified'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 409;
        next(error);
    });
}

exports.deactivateUser = (req, res, next) => {
    const body = {
        status: 'deactive'
    }
    User.editUser('5fd0f864ae8bbe2ab4dcbdd8', body)
    .then(data => {
        res
        .status(200)
        .json({
            'message': 'Account deactivated successfully'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 409;
        next(error);
    });
}