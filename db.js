
var admin = require("firebase-admin");

var serviceAccount = require("C:\Users\sunke\Desktop\Kellen\Programming\Javascript\TestFirebase\fir-test-b379f-firebase-adminsdk-xlhof-0b2e35362b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports = db;

