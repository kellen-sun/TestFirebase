'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const {createUser, readUser, updateUser, deleteUser, checkUser} = require('./controllers/UserController');

const app = express(); //this is our application/website, which is important
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//makes the static files accessible to the webpages
app.use(express.static('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/static'));

app.post('/newUser', async (req, res, next) => {
    var data = req.body.username;
    console.log(data);
    //console.log(req);
    //this function adds the data to the database
    var success = createUser(req, res, next);
    console.log(success);
    success.then(function(result) {
        console.log(result)
        if (result[0]){
            res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/newUser.html', { username: data });
        } else if (result[1]=="1"){
            res.redirect('/home/error1');
        } else if (result[1]=="2"){
            res.redirect('/home/error2');
        };
    });
});

app.get('/', function (req, res, next) {
    res.redirect('/home');
});

app.post('/home/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "One of the fields is empty" });
    } else if (req.param('error')=='error2'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "Username already taken" });
    }else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "" });
    }
});

app.get('/home/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "One of the fields is empty" });
    } else if (req.param('error')=='error2'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "Username already taken" });
    }else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "" });
    }
});

app.get('/home', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "" });
});

app.post('/home', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html', { error: "" });
});

app.get('/updateUser', function (req, res, next) {
    res.sendFile('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/updateUser.html');
});

app.post('/updateUser', async (req, res, next) => {
    const result = await updateUser(req, res, next);
    //result[0] is a boolean value right now, if changed in UserController.js will need to update this side too
    if (result[0]) {
        res.redirect('/home');
    }
    else {
        res.send(result[1]);
    }
});

app.get('/users/:name', async (req, res, next) => {
    var name = req.param('name');
    var success = await checkUser(req, res, next, name);
    //console.log(success);
    if (success) {
        //console.log("user exists");
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/users.html', { username: name });
    } else {
        //console.log("user does not exist");
        res.send("User does not exist");
    }
});

app.post('/users', async (req, res, next) => {
    var success = deleteUser(req, res, next);
    success.then(function(result) {
        //console.log(result)
        if (result[0]) {
            console.log("Account deleted");
            res.send("Account deleted successfully :(");
        } else {
            console.log(result[1]);
            res.send(result[1]);
        }
    });
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
