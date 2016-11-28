var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var staffSchema=new Schema({
    username:String,
    password:{type:String},   
    lastname:{type:String,lowercase:true},
    firstname:{type:String,lowercase:true},
    status:{type:String,default:"Pending"},//Active, Pending, inactive
    contact:{},
    resetPasswordToken: String,
  	resetPasswordExpires: Date
})

staffSchema.plugin(require("../plugins/setFullName"));
staffSchema.plugin(require("../plugins/phonenumber"));
staffSchema.plugin(require("../plugins/encrypt"));
staffSchema.plugin(require("../plugins/comparePassword"));

module.exports=mongoose.model("StaffMember",staffSchema);