const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const { videoToken } = require('./tokens');

var TokenProvider = require('./tokenprovider');
var tokenProvider = new TokenProvider({
  "accountSid": process.env.TWILIO_ACCOUNT_SID,
  "signingKeySid": process.env.TWILIO_API_KEY,
  "signingKeySecret": process.env.TWILIO_API_SECRET,
  "serviceSid": process.env.TWILIO_SERVICE_SID,
  "pushCredentialSid": process.env.TWILIO_PUSH_CREDENTIALS_SID
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

app.post('/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.get('/getToken', (req, res) => {
  const identity = req.query && req.query.identity;
  if (!identity) {
    res.status(400).send('getToken requires an Identity to be provided');
  }
  const token = tokenProvider.getToken(identity);
  res.send(token);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
