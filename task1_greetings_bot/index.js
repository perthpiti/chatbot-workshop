const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({token: process.env.PAGE_ACCESS_TOKEN})

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT;
app.listen(port, () => console.log(`Chatbot server listening on port ${port}!`));
app.get('/', function(req, res) {
  res.send('Hello, This is chatbot server.');
});

function verifyFacebook(req, res) {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }
  res.send('Validation failed, Verify token mismatch');
}
app.get('/webhook/', verifyFacebook);

function handleFacebookMessage(req, res) {
  var messagingList = req.body.entry[0].messaging;
  messagingList.forEach(async function(messageEntry) {
    //Sender ID
    var senderId = messageEntry.sender.id;
    if (messageEntry.message) {
      if (messageEntry.message.text) {
        var question = messageEntry.message.text;
        await answer(senderId,question);
      }
    }
  });
  res.sendStatus(200);
}
app.post('/webhook/', handleFacebookMessage);

async function answer(senderId,question) {
  var greetingKeywords = ["สวัสดี","hello","hi","ดีครับ","ดีค่ะ","สบายดีไหม"]
  for(var keyword of greetingKeywords){
    if(question.includes(keyword)){
        await messenger.sendTextMessage({id: senderId, text: "สวัสดีครับ"})
    }
  }
  return "ไม่เข้าใจครับ"
}