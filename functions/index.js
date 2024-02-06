const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.apiType = onRequest((req, res) => {
  switch (req.method) {
    case "GET":
      res.send("This is Veer Get Request method");
      break;
    case "POST":
      console.log("index", req.body);
      res.send(req.body);
      break;
    default:
      res.send("Default response");
      break;
  }
});

// exports.userAdded=functions
exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log("User in functions", auth, user);
  addDoc(collection(db, "Profile_Section"), {
    name: firebase.user.name,
    email: firebase.user.email,
    city: firebase.user.city,
    age: firebase.user.age,
  });
  return Promise.resolve();
});
// exports.todoAdded = functions.firestore
//   .document("{userId}/documentID")
//   .onCreate((snap, context) => {
//     console.log("Hii");
//   });
