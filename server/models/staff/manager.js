var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var gmSchema=new Schema({
    apparel:{},
    contact:{},
    division:String,
    password:String
})

module.exports=mongoose.model("Manager",gmSchema);