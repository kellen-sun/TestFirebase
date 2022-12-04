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
    var success = createUser(req, res, next);
    console.log(success);
    success.then(function(result) {
        if (result){
            res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/newUser.html', { username: data });
        } else {
            res.redirect('/home/error1');
        };
    });
});

app.get('/', function (req, res, next) {
    res.redirect('/home');
});

app.post('/home/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "One of the fields is empty" });
    } else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "" });
    }
});

app.get('/home/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "One of the fields is empty" });
    } else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "" });
    }
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

app.get('/users/:name', async (req, res, next) => {
    console.log("Username is");
    var name = req.param('name');
    console.log(name);
    //shuold only happen if name is in the database
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/user.html', { username: name });
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
