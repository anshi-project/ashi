var nodemailer = require('nodemailer');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'adamhs7843521@gmail.com',
        pass: 'adam3521'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
}, {

    from: 'A.S.H.I. <noreply@ashi.com>',

});

module.exports = function(body){
  var cc = "<dreaser@ashihockey.org>";
  var DEFAULT = "adamhs3521@gmail.com, michael@freecodecamp.com, ms-ams@outlook.com, jasonrfcc@gmail.com"
  var rec = body.recipients || DEFAULT;
  var recipients =  rec.split(" ").map(v=> {return "<"+v+">"}).join(", ")
  
  



  transporter.sendMail({
    from: 'American Street Hockey Institute',
    cc,
    to: recipients,
    subject:body.subject,
    text: body.message
  });

}