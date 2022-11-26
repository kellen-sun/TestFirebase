const dotenv = require(‘dotenv’) //used to get the stuff from .env
const assert = require(‘assert’)

const {PORT, HOST, HOST_URL, API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID} = process.env; //creates and sets these variables to the stuff we made in .env

assert(PORT, ‘PORT is required’);
assert(HOST, ‘HOST is required’);
