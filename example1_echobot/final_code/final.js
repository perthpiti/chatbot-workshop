var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');

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
  messagingList.forEach(function(messageEntry) {
    //Sender ID
    var senderId = messageEntry.sender.id;
    if (messageEntry.message) {
      if (messageEntry.message.text) {
        var text = messageEntry.message.text;
        sendTextMessage(senderId, text);
      }
    }
  });
  res.sendStatus(200);
}
function sendTextMessage(receiver, inputMessage) {
  var payload = {
    text: inputMessage,
  };
  axios({
    method: 'post',
    url: process.env.FB_MESSENGER_URL,
    params: {
      access_token: process.env.PAGE_ACCESS_TOKEN,
    },
    data: {
      recipient: { id: receiver },
      message: payload,
    },
  })
    .then(function(response) {
      console.log(`Send message ${inputMessage} to ${receiver} successfully`);
    })
    .catch(function(error) {
      console.log(`Failed send message ${inputMessage} to ${receiver}!!`);
    });
}
app.post('/webhook/', handleFacebookMessage);