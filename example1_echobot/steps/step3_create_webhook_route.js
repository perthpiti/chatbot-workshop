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