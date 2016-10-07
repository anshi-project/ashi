var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var Registration=require("./main");

var manangerSchema=new Schema({
    division:String,
    password:String,
    username:{type:String,}
})

manangerSchema.plugin(require("../plugins/encrypt"));

var managerReg=Registration.discriminator("ManagerRegistration",manangerSchema)

module.exports=managerReg;