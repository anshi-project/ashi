var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var adminSchema=new Schema({
    username:{type:String,unique:true,lowercase:true},
    password:String,
    email:String
})

module.exports=mongoose.model("Admin",adminSchema);