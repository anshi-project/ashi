var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var coachSchema=new Schema({
    registration:{},
    team:{
        role:String,
        name:String,
        division:String        
    }
})

module.exports=mongoose.model("Coach",coachSchema);
