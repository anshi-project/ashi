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

module.exports = function(body){
  var cc = body.cc 
  var DEFAULT = "adamhs3521@gmail.com"
  var rec = body.recipients || DEFAULT;
  var recipients =  rec.split(" ").map(v=> {return "<"+v+">"}).join(", ")
  
  transporter.sendMail({
    from: 'American Street Hockey Institute',
    // cc,
    to: recipients,
    subject:body.subject,
    text: body.message
  });

}