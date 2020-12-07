const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/notes', notesRouter);

mongoConnect(() => {
    app.listen(3000, (err) => {
        if(err)
            console.log(err);
        else
            console.log('Server running on PORT 3000');
    });
})