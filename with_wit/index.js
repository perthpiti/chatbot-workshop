const axios = require('axios');
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
  // console.log(JSON.stringify(req.body,null,2))
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

async function answer(senderId,question) {
  const witResponse = await axios({
    method: 'get',
    url: 'https://api.wit.ai/message?v=20190712&q='+encodeURI(question),
    headers:{
      Authorization: "Bearer JLXTTBKVC3LNZDJH3E72S5XAGO4P65WU"
    }
  });
  const intentData = witResponse.data
  if(intentData.entities){
    const intent =  intentData.entities.intent;
    if(intent){
       const selectIntent = intent[0].value;
        if(selectIntent==="WEATHER_FORECAST"){
          await messenger.sendTextMessage({id:senderId,text:"อากาศดีครับ"})
        }
        if(selectIntent==="TRAFFIC"){
          await messenger.sendTextMessage({id:senderId,text:"รถติด"})
        }
    }else{
          await messenger.sendTextMessage({id:senderId,text:"ไม่เข้าใจครับ"})
    }
  }
}

app.post('/webhook/', handleFacebookMessage);