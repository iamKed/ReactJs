/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

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
