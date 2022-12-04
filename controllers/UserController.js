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

const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        var name = data.username;
        if (data.email && data.password && data.username) {
            //checks if it's nonnzero inputs
            
            //now checking if username is taken
            var success1 = await checkUser(req, res, next, name);
            console.log(success1)
            if (success1) {
                //console.log("user exists");
                return [false, "2"];
            } else {
                //console.log("user does not exist");
                await firestore.collection('users').doc().set(data);
                return [true];
            } 
        }
        else {
            //so now it won't create the user (in the database) if one of the fields is empty
            console.log("Empty field.")
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
        console.log(data);
        var output = [false, 'Email not found!'];
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
        console.log(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const data = req.body;
        var output = [false, 'Email not found!'];
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
        console.log(error);
    }
}

const readUser = async (req, res, next) => {
    try {
        const data = req.body;
        var output = [false, 'Email not found!'];
        const user = await firestore.collection('users').where("email", "==", data.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password == data.password) {
                        output = [true, doc.data()];
                    }
                    else {
                        output = [false, 'Incorrect Password'];
                    }
                });
            });
        return(output);
    }
    catch (error) {
        //res.status(400).send(error.message);
    }
};


module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    checkUser
};