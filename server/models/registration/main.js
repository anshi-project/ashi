var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Method=require("./methods");

var registrationSchema=new Schema({
    firstname:String,
    lastname:String,
    apparel:{},
    contact:{},
    public_data:{},
    registration_status:{type:String,default:"pending"}
},{timestamps:true})

registrationSchema.statics.assignRole=Method.assignRole;
    /*Processes registration- assigns player/coach to a team, 
    assigns manager to a division in turn linking all 
    players/coaches to their respective manager*/
registrationSchema.statics.handleFormSubmission=Method.handleFormSubmission;
    //creates new registration, sets correct fields by passing in a particular discriminator type
registrationSchema.statics.findPending=Method.findPending;
    //fetches a list by a particular type


module.exports=mongoose.model("registration",registrationSchema);