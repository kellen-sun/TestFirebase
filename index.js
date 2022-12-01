'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const {createUser, readUser, updateUser, deleteUser} = require('./controllers/UserController');

const app = express(); //this is our application/website, which is important
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//makes the static files accessible to the webpages
app.use(express.static('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/static'));

app.post('/newUser', function (req, res, next) {
    var data = req.body.username;
    console.log(data);
    //console.log(req);
    //this function adds the data to the database
    createUser(req, res, next);
    //renders the newuser webpage with the data
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/newUser.html', { username: data });
});

app.get('/', function (req, res, next) {
    res.redirect('/home');
});

app.post('/home', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html')
});

app.get('/updateUser', function (req, res, next) {
    res.sendFile('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/updateUser.html');
});

app.post('/updateUser', async (req, res, next) => {
    const result = await updateUser(req, res, next);
    if (result[0]) {
        res.redirect('/home');
    }
    else {
        res.send(result[1]);
    }
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
