var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');
var FBMessenger = require('fb-messenger');
var messenger = new FBMessenger({token: process.env.PAGE_ACCESS_TOKEN});

var app = express();
app.use(bodyParser.json());

//Step 1 Setup chatbot server
var port = process.env.PORT;
app.listen(port, () => console.log(`Chatbot server listening on port ${port}!`));
app.get('/', function(req, res, next) {
  res.send('Hello, This is chatbot server.');
});

//Step 2 Create route to verify facebook verification token
function verifyFacebook(req, res, next) {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }
  res.send('Validation failed, Verify token mismatch');
}
app.get('/webhook/', verifyFacebook);

//Step 3 Create route to handle webhook event
function handleFacebookMessage(req, res, next) {
  var messagingList = req.body.entry[0].messaging;
  messagingList.forEach(async function(messageEntry) {
    //Sender ID
    var senderId = messageEntry.sender.id;
    if (messageEntry.message) {
      if (messageEntry.message.text) {
        var text = messageEntry.message.text;
        await messenger.sendTextMessage({id: senderId, text: text})
      }
    }
  });
  res.sendStatus(200);
}
app.post('/webhook/', handleFacebookMessage);