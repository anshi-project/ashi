var Team=require("../team/team");
var Player=require("../players/main")
var Coach=require("../staff/coach")

exports.assignRole=function(id,team,type){
    var Applicant=require(type.schema);
    var RegistrationModel=require(type.registration);    
    

    RegistrationModel.findById(id,function(err,doc){
        if(err)throw err;
        doc.registration_status="registered";
        doc.save();    
         Applicant.assign(doc,team,type.discriminator,function(_doc){             
            var query=_doc.query;
            Team.addToRoster(query,_doc._id,type.category)      
        })
    })
};

exports.handleFormSubmission=function(fields,type,callback){
    if(type=="admin") type="manager";
    var REGISTRATION=require("./_"+type+"Reg");
    REGISTRATION.create(fields,function(err,data){
        if(err) return callback(err);
        return callback(null,data);
    })
    
}

exports.findPending=function(q,callback){
    var query={__t:q+"-registration"};

    this.find(query,function(err,docs){
        if(err) return callback(err);
        
        if(query.__t=="player-registration"){
            Player.find({status:"renewing membership"},function(err,_docs){
                if(err) return callback(err);
                var results=docs.concat(_docs)
                return callback(null,results)
            })
        }else{
            callback(null,docs);
        }
    })
}