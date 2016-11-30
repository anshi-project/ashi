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


module.exports = function(body,next){
  var recipients = body.recipients;

  transporter.sendMail({
    from: 'American Street Hockey Institute',
    bcc: "<adamhs3521@gmail.com>, "+recipients, 
    subject:body.subject,
    text: body.message+"\n\n Please Do Not Reply To This Message."
  },function(err,info){
    if(err){
      return next(err);
    }else{
      return next(null, info);
    }
  });

}