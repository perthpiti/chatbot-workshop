//Step 1 Setup chatbot server
var port = conf.PORT;
app.listen(port, () => console.log(`Chatbot server listening on port ${port}!`));
app.get('/', function(req, res, next) {
  res.send('Hello, This is chatbot server.');
});
