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

function getModel(_type){
    var type;
    switch(_type){
        case "players":
            type="PlayerRegistration"
            break;
        case "coaches":
            type="CoachRegistration"
            break;
        case "managers":
            type="managerRegistration";
            break;
        case "player":
            type="../players/_default"
            break;
        case "goalie":
            type="../players/_goalie"
            break;
        case "coach":
            type="../staff/coach"
            break;
        case "manager":
            type="../staff/manager"
            break;
        default:
            type=null;
    }
    return type;
}


registrationSchema.statics.submit=function(id,team,type){
    var model=getModel(type);
    var PERSON=require(model);
    
    var fields=" -__v";
    
    if(type=="player") fields="-contact -jersey_number_choices -hockey_info  -__v";
    
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



registrationSchema.statics.findByType=function(_type,_query,callback){
    var type=getModel(_type);
    var query={__t:type};
    if(_query) query.registration_status=_query;
    
    this.find(query,function(err,docs){
        if(err) return callback(err);
        return callback(null,docs);
    })
}

registrationSchema.statics.handleFormSubmission=function(fields,type,callback){
    var REGISTRATION=require("./_"+type+"Reg");
    REGISTRATION.create(fields,function(err,data){
        if(err) return callback(err);
        return callback(null,data);
    })
    
}


module.exports=mongoose.model("registration",registrationSchema);