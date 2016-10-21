var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var adminSchema=new Schema({
    username:String,
    password:{type:String,select:false},
    lastname:String,
    firstname:String,
    status:{type:String,default:"pending"},
    contact:{
    	email:String,
    	alt_email:String,
    	phone1:String,
    	phone2:String
    }
})

adminSchema.plugin(require("../plugins/encrypt"));
adminSchema.plugin(require("../plugins/comparePassword"));

module.exports=mongoose.model("Admin",adminSchema);