var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Admin=require("../staff/admin")
var Registration=require("./main");

var manangerSchema=new Schema({
    division:String,
    password:String,
    username:{type:String,unique:true,lowercase:true}
})

manangerSchema.plugin(require("../plugins/encrypt"));


var managerReg=Registration.discriminator("manager-registration",manangerSchema)

module.exports=managerReg;