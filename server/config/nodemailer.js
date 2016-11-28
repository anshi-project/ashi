var nodemailer = require('nodemailer');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ashi.hockey132@gmail.com',
        pass: 'hockey1234'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
}, {

    from: 'A.S.H.I. <noreply@ashi.com>',

});

var format = function(str){
  if(!str) return null; 
  return str.split(" ").map(v=> {return "<"+v+">"}).join(", ");
}

module.exports = function(body){
  var cc = format(body.cc); 
  var recipients = format(body.recipients);
  
  transporter.sendMail({
    from: 'American Street Hockey Institute',
    cc:"<adamhs7843521@gmail.com>",
    to: "<adamhs3521@gmail.com>", 
    subject:body.subject,
    text: body.message
  });

}