const accountSid = "ACe609b58c16363e450fb59e824e6ade9e";
const authToken = "5cf576cb46b53f2f82e3ab90e53006df";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    from: "+12565768405",
    to: "+821089017060",
  })
  .then(message => console.log(message.sid));
