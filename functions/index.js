const functions = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { addDoc, collection } = require("firebase/firestore");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const {Firestore, Timestamp}=require("firebase-admin/firestore")
admin.initializeApp();
const me = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: "kedarswami9900@gmail.com", pass: "ovvy mlyb ndhk bghw" },
});
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
exports.apiType = onCall((req, res) => {
  switch (req.method) {
    case "GET":
      res.send("This is Veer Get Request method");
      break;
    case "POST":
      res.send(`Hi this is what you have sent ${req.body}`);
      break;
    default:
      res.send("Default response");
      break;
  }
});

exports.onProfileButtonClick = onCall((req) => {
  console.log(req);
  // admin.firestore().collection("Welcom_Mail_Sent").add({});
});
exports.userAdded = functions.auth.user().onCreate(async (user) => {
  try {
    console.log(`user added ${user.email}`);
    admin
      .firestore()
      .collection("Profile_User")
      .doc(user.uid)
      .set({
        email: user.email,
        added: new Date(),
      });
    console.log("DataDone");
    me.sendMail(
      {
        from: "kedarswami9900@gmail.com",
        to: user.email,
        subject: "Welcome to kedTodo - Your New Task Management Platform!",
        text: `Dear ${user.email || "User"},\n\n
        Welcome to kedTodo, your new favorite task management platform! We're thrilled to have you join our community.
        
        At kedTodo, we're committed to helping you stay organized, focused, and productive. Whether you're managing personal tasks, collaborating with a team, or tackling big projects, kedTodo has everything you need to succeed.
        
        Here are a few key features you'll love:
        - Intuitive task organization: Easily create, prioritize, and categorize your tasks for maximum efficiency.
        - Seamless collaboration: Invite team members, assign tasks, and track progress together in real-time.
        - Customizable workflows: Tailor kedTodo to your unique needs with customizable tags, labels, and task views.
        - Mobile accessibility: Access kedTodo anytime, anywhere, with our user-friendly mobile app.
        
        Get started today by logging in to your kedTodo account at [website URL]. If you have any questions, feedback, or need assistance, don't hesitate to reach out to our support team at [support email].
        
        Once again, welcome to kedTodo! We're excited to embark on this productivity journey with you.
        
        Best regards,
        The kedTodo Team`,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      }
    );
    console.log("Done");
  } catch (e) {
    console.log(e);
  }
  return Promise.resolve();
});

// exports.changeEmail=functions.auth.user().((user,context)=>{
//   console.log(`${user.email,context} is being logged in.`)
//   return Promise.resolve();
// })
