const Label = require('../models/label');

exports.createLabel = (req, res, next) => {

    // get userId from auth

    const { userId, title, color } = req.body;
    const newLabel = new Label(userId, title, color);

    newLabel
    .createLabel()
    .then(data => {
        res
        .status(201)
        .json({
            'message': 'Label created',
            'body': data.ops[0]
        })
    })
    .catch(err => {
        const error = new Error('Server error creating label, please try again');
        error.status = 409;
        next(error);
    })
}

exports.fetchLabelById = (req, res, next) => {
    const userId = '5fd0fb19c657a52cd52f4254';
    const labelId = req.params.labelId;
    Label.getLabelById(userId, labelId)
    .then(data => {
        res
        .status(200)
        .json(data[0])
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 409;
        next(error);
    })
}

exports.fetchAll = (req, res, next) => {
    const userId = '5fd0fb19c657a52cd52f4254';
    Label.fetchAll(userId)
    .then(data => {
        res
        .status(200)
        .json(data)
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 409;
        next(error);
    });
}

exports.deleteLabel = (req, res, next) => {
    const userId = '5fd0fb19c657a52cd52f4254';
    const labelId = req.params.labelId;
    Label.deleteLabel(userId, labelId)
    .then(data => {
        res
        .status(200)
        .json({
            'message': 'Label deleted successfully'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 409;
        next(error);
    })
}

exports.editLabel = (req, res, next) => {
    const userId = '5fd0fb19c657a52cd52f4254';
    req.body.userId = userId;
    Label.modifyLabel(req.body)
    .then(data => {
        res
        .status(200)
        .json({
            'message': 'Label modified successfully'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 400;
        next(error);
    });
}