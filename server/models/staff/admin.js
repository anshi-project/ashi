var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main");

var adminSchema=new Schema({})

module.exports=Staff.discriminator("Admin",adminSchema);