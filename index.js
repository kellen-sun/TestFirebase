const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const {addUser} = require('./controllers/UserController');

const app = express(); //this is our application/website, which is important
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/static'));

app.get('/home', function (req, res, next) {
    res.sendFile('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/home.html');
});

app.get('/newUser', function (req, res, next) {
    res.sendFile('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/newUser.html');
});

app.post('/newUser', function (req, res, next) {
    var data = req.body.username;
    console.log(data);
    //console.log(req);
    //this function adds the data to the database
    addUser(req, res, next);
    //renders the newuser webpage with the data
    res.render('C:/Users/sunke/Desktop/Kellen/Programming/Javascript/TestFirebase/templates/newUser.html', { username: data });
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
