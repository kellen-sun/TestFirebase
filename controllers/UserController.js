const firebase = require(‘../db’);
const User = require(‘../models/student’);
const firestore = firebase.firestore();
const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
    }
    catch (error) {
        console.log(error.message);
    }
};
module.exports = {addUser};