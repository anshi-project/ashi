var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var registrationSchema=new Schema({
    lastname:String,
    firstname:String,
    date_of_birth:{type:Date},
    gender:String,
    weight:Number,
    height:Number,
    passport:Boolean,
    passport_expiration:{type:Date},
    
    contact_info:{
      phone_primary:Number,
      phone_secondary:Number,
      phone_parent:Number,
      //email:{type:String,unique:true,lowercase:true},
      social_media:{
        facebook:String,
        twitter:String,
        instagram:String,
        linkedin:String
      },
      address:String,
      city:String,
      state:String,
      zipcode:Number
    },
    bio:{
      education:String,
      hometown:String,
      hockey_history:String,
      other_sports:String,
      career_highlights:String,
      lifestyle:{
        movie:String,
        tvshow:String,
        athlete:String,
        sports_team:String,
        other_sport:String,
        food:String
      }
    },
    hockey_registration_info:{
      team:String,
      position:String,
      shooting_hand:String,
      tournament_team:String,
      leaugue_team:String,
      website:String
    },
    apparel:{
      number:Number,
      sizes:{
        jersey:String,
        shorts:String,
        socks:String,
        shirt:String,
        polo:String,
        hat:String,
        jacket:String
      }
    }
});


// registrationSchema.post('save', function(err, doc, next) {
//   if (err.name === 'MongoError' && err.code === 11000) {
//     next(new Error('There is already an account registered under the email '+doc.email));
//   } else {
//     next(err);
//   }
// });//handles when duplicate email is input

registrationSchema.post("save",function(doc){
  var id=this._id;
  var _team=this.hockey_registration_info.team;

  this.model("playerStats").create({player:id});
  //Note: This hook is currently just meant to set some dummy data 
})//TO DO : hook should only run upon the initial registration of a new player

module.exports=mongoose.model("registration",registrationSchema);



