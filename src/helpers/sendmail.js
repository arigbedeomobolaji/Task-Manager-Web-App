var API_KEY = process.env.MAILGUN_API_KEY;
var DOMAIN = process.env.DOMAIN_NAME;
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});




const verifyEmail = (email) => {
 const data = {
   from: 'arigbedeEsther18@gmail.com',
   to: email,
   subject: 'Hello',
   text: 'Testing some Mailgun awesomeness!'
 };
 
 mailgun.messages().send(data, (error, body) => {
  if (error) return console.log(error.message);
   console.log(body);
 });
}

module.exports = {
 verifyEmail
}