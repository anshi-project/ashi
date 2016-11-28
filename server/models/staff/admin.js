var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main");

var adminSchema=new Schema({
    resetPasswordToken: String,
  	resetPasswordExpires: Date
	
})

module.exports=Staff.discriminator("Admin",adminSchema);