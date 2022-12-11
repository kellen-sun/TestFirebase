'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const {createUser, findEmail, updateUser, deleteUser, checkUser, checkPassword} = require('./controllers/UserController');

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
            res.redirect('/createAccount/error1');
        } else if (result[1]=="2"){
            res.redirect('/createAccount/error2');
        } else if (result[1]=="3"){
            res.redirect('/createAccount/error3');
        };
    });
});

app.post('/returningUser', async (req, res, next) => {
    var data = req.body.username;
    console.log(data);
    //console.log(req);
    //this function adds the data to the database
    var success = checkPassword(req, res, next);
    console.log(success);
    success.then(function(result) {
        console.log(result)
        if (result[0]){
            res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/returningUser.html', { username: data });
        } else if (result[1]=="1"){
            res.redirect('/signin/error1');
        } else if (result[1]=="2"){
            res.redirect('/signin/error2');
        } else if (result[1]=="3"){
            res.redirect('/signin/error3');
        }
    });
});

app.post('/signin/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "One of the fields is empty" });
    } else if (req.param('error')=='error2'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "Username doesn't exist" });
    } else if (req.param('error')=='error3') {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "Incorrect Password" });
    } else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "" });
    }
});

app.get('/signin/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "One of the fields is empty" });
    } else if (req.param('error')=='error2'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "Username doesn't exist" });
    } else if (req.param('error')=='error3') {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "Incorrect Password" });
    } else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "" });
    }
});

app.get('/signin', function(req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "" });
});

app.post('/signin', function(req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signin.html', { error: "" });
});

app.get('/', function (req, res, next) {
    res.redirect('/home');
});

app.post('/createAccount/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "One of the fields is empty" });
    } else if (req.param('error')=='error2'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "Username already taken" });
    } else if (req.param('error')=='error3') {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "Email already taken" });
    } else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "" });
    }
});

app.get('/createAccount/:error', function (req, res, next) {
    if (req.param('error')=='error1'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "One of the fields is empty" });
    } else if (req.param('error')=='error2'){
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "Username already taken" });
    } else if (req.param('error')=='error3') {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "Email already taken" });
    } else {
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "" });
    }
});

app.get('/createAccount', function(req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "" });
});

app.post('/createAccount', function(req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/createAccount.html', { error: "" });
});

app.get('/home', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html');
});

app.post('/home', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html');
});

app.get('/login', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/login.html');
});

app.post('/signout', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signout.html');
});

app.get('/signout', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/signout.html');
});

app.post('/login', function (req, res, next) {
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/login.html');
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
    var value = await findEmail(req, res, next, name);
    //console.log(success);
    if (success) {
        //console.log("user exists");
        res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/users.html', { username: name, email: value });
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
