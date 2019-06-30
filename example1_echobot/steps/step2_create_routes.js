//Step 2 Create route to verify facebook verification token
function verifyFacebook(req, res, next) {
  if (req.query['hub.verify_token'] === conf.VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }
  res.send('Validation failed, Verify token mismatch');
}
app.get('/webhook/', verifyFacebook);
