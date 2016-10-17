var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Team=require("../team/team")

var playerSchema=new Schema({
     team:{
       name:String,
       division:String,
       position:String,
       jersey_number:String
     },
     registration:{},//any neccessary details from the players registration
     status:{type:String,default:"active"} //retired, renewing membership, active
})

playerSchema.statics.findByName=function(name,callback){

     var query={"registration.public_data.firstname":name.firstname,"registration.public_data.lastname":name.lastname};
     
     this.find({query},function(err,docs){
          if(err) return callback(err)
          callback(null,docs);
     });
};

playerSchema.methods.registerForNewSeason=function(_status){
     var status=_status||"renewing membership"
     
     this.status=status;
     this.save();
}

playerSchema.statics.reassign=function(id,team,type){
     this.findById(id,function(err,doc){
          if(err) throw err;
          
          doc.team=team;
          doc.registerForNewSeason("active");
          Team.addToRoster(team.name,team.division,id,type);
     })
}




module.exports=mongoose.model("Player",playerSchema)

