var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var playerSchema=new Schema({
    lastname:String,
    firstname:String,
    email:{type:String,unique:true,lowercase:true}
});


playerSchema.post('save', function(err, doc, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    next(new Error('There is already an account registered under the email '+doc.email));
  } else {
    next(err);
  }
});//handles when duplicate email is input

module.exports=mongoose.model("player",playerSchema);