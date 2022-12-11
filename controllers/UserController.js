'use strict';

const firebase = require('../db');
const User = require('../models/users');
const firestore = firebase.firestore();
const { openDelimiter } = require('ejs');

const checkUser = async (req, res, next, name) => {
    try {
        const data = req.body;
        //var name = req.param('name');
        const db = firestore.collection('users');
        const snapshot = await db.where('username', '==', name).get();
        if (snapshot.empty) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        console.log(error.message);
    }
};

const checkEmail = async (req, res, next, email) => {
    try {
        const data = req.body;
        const db = firestore.collection('users');
        const snapshot = await db.where('email', '==', email).get();
        if (snapshot.empty) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        console.log(error.message);
    }
};

const checkPassword = async (req, res, next) => {
    //checks if the username and password matches
    try {
        const data = req.body;
        var name = data.username;
        var password = data.password;
        if (name && password) {
            //checks if there's empty inputs
            //now checking if username is taken
            var success1 = await checkUser(req, res, next, name);
            var psw2 = "";
            if (success1) {
                const db = firestore.collection('users');
                const snapshot = await (await db.where('username', '==', name).get()).docs;
                snapshot.forEach((doc) => {
                    psw2 = doc.data().password;
                });
                if (psw2 == password){
                    return [true]
                } else {
                    return [false, "3"]
                }
            } else {
                return [false, "2"];
            } 
        }
        else {
            //so now it won't create the user (in the database) if one of the fields is empty
            return [false, "1"];
        }
    }
    catch (error) {
        console.log(error.message);
    }
};

const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        var name = data.username;
        var email = data.email;
        if (data.email && data.password && data.username) {
            //checks if it's empty inputs
            //now checking if username is taken
            var success1 = await checkUser(req, res, next, name);
            if (success1) {
                return [false, "2"];
            } else {
                var success2 = await checkEmail(req,res,next,email);
                if (success2) {
                    return [false, "3"]
                } else {
                    await firestore.collection('users').doc().set(data);
                    return [true];
                }
                
            } 
        }
        else {
            //so now it won't create the user (in the database) if one of the fields is empty
            return [false, "1"];
        }
    }
    catch (error) {
        console.log(error.message);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const data = req.body;
        var output = [false, 'Incorrect Email'];
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.oldPassword) {
                        doc.ref.update(
                            {
                                'email': data.email,
                                'password': data.newPassword,
                                'username': data.newUsername
                            }
                        );
                        output = [true];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        
        return(output);
    }
    catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const data = req.body;
        var output = [false, 'Incorrect Email'];
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.password) {
                        doc.ref.delete();
                        output = [true];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        return(output);
    }
    catch (error) {
        console.log(error.message);
    }
}

const findEmail = async (req, res, next, name) => {
    try {
        const data = req.body;
        var output = 'Email not found!';
        const user = await firestore.collection('users').where("username", "==", name)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => { 
                  output = doc.data().email;
                });
            });
        return(output);
    }
    catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    createUser,
    findEmail,
    updateUser,
    deleteUser,
    checkUser,
    checkEmail,
    checkPassword
};