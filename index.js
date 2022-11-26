const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express(); //this is our application/website, which is important

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    res.sendFile('C:\Users\sunke\Desktop\Kellen\Programming\Javascript\TestFirebase\main.html');
});
app.post('/', function (req, res, next) {
    console.log(req.body);
    register(req, res, next);
    res.send('User created successfully');
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
