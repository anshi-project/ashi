var nodemailer = require('nodemailer');

var flag = process.env.mode == "development";

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    
    auth: {
      user: process.env.google_address,
      pass: process.env.google_password
    },
    logger: flag, // log to console
    debug: flag// include SMTP traffic in the logs
});

module.exports = function(body,next){
  var recipients = body.recipients;

  transporter.sendMail({
    from: 'American Street Hockey Institute',
    bcc: recipients, 
    subject: body.subject,
    html:"<div>"+ body.message+"</div><hr><h4>Please Do Not Reply To This Message.</h4>"
  }, 
    function(err,info){
      if(err){
        return next(err);
      }else{
        return next(null, info);
      }
  });
}