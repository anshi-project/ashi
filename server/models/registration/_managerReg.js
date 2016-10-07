var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var Registration=require("./main");

var managerReg=Registration.discriminator("ManagerRegistration",
    new Schema({
        username:{type:String,lowercase:true},
        division:String
    })
)


module.exports=managerReg;