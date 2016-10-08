var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Team=require("../team/team")

var playerSchema=new Schema({
     games_played:{type:Number,default:0},
     team:{
       name:String,
       division:String,
       position:String,
       jersey_number:String
     },
     registration:{},//any neccessary details from the players registration
     status:{type:String,default:"registered"}
})

playerSchema.statics.findByName=function(name,callback){
     var fullname=name.split();
     var first=fullname[0].toLowerCase(),last=fullname[1].toLowerCase();
     var query={"registration.public_data.firstname":first,"registration.public_data.lastname":last};
     
     this.find({query},function(err,docs){
          if(err) throw err;
          callback(docs);
     });
};

playerSchema.methods.registerForNewSeason=function(_status){
     var status=_status||"pending"
     
     this.status=status;
     this.save();
}

playerSchema.statics.findReturningPlayers=function(callback){
     this.find({status:"pending"},function(err,docs){
          if(err) return callback(err);
          return callback(null,docs);
     })
}
playerSchema.statics.reassign=function(id,team,type){
     this.findById(id,function(err,doc){
          if(err) throw err;
          
          doc.team=team;
          doc.registerForNewSeason("registered");
          Team.addToRoster(team.name,team.division,id,type);
     })
}




module.exports=mongoose.model("Player",playerSchema)

