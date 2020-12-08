const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');
const userRouter = require('./routes/user');
const labelRouter = require('./routes/label');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/notes', notesRouter);
app.use('/user', userRouter);
app.use('/label', labelRouter);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.status ? error.message : 'Internal server error';
    const data = error.data || {};
    res
    .status(error.status)
    .json({
        message: message,
        data: data
    })
})

mongoConnect(() => {
    app.listen(3000, (err) => {
        if(err)
            console.log(err);
        else
            console.log('Server running on PORT 3000');
    });
})