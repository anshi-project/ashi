var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Registration=require("./main");

var fields = require("../commonFields/index")


var CoachReg = Registration.discriminator("coach-registration",
  new Schema ({
    apparel: fields.apparel.staff,
    background: fields.background.coach
  })
);


module.exports = CoachReg;
