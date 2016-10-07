var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Team=require("../team/team");


var registrationSchema=new Schema({
    apparel:{},
    contact:{},
    social_media:{
        facebook:{type:String,default:"N/A"},
        twitter:{type:String,default:"N/A"},
        instagram:{type:String,default:"N/A"},
        linkedin:{type:String,default:"N/A"}
  },
  registration_status:{type:String,default:"pending"}
})



registrationSchema.statics.submit=function(id,team,type,PERSON){
    var fields="-contact -jersey_number_choices  -registration_status -hockey_info  -__v";
    
    if(type=="coach") fields="-short_answers -coaching_info -registration_status -__v";
    
    this.findOne({_id:id}).select(fields).exec(function(err,doc){
        if(err)throw err;
    
        doc.registration_status="registered";
        doc.save();
        
        PERSON.create({registration:doc,team:team}).then(function(doc){
                Team.addToRoster(team.name,team.division,doc._id,type)      
            })
      })
};



registrationSchema.statics.findByType=function(type,callback){
    this.find({__t:type,registration_status:"pending"},function(err,docs){
        if(err) return callback(err);
        return callback(null,docs);
    })
}




module.exports=mongoose.model("registration",registrationSchema);