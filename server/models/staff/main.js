var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var staffSchema = new Schema({
    username: {
      type: String,
      required: true,
      // validate: validate.username,
    },
    password:{
      type: String,
      required: true,
    },
    lastname:{
      type:String,
      required: true,
      lowercase:true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    firstname:{
      type:String,
      required: true,
      lowercase:true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    status:{
      type:String,
      default:"Pending",
    },//Active, Pending, inactive
    contact:{},
    resetPasswordToken: String,
  	resetPasswordExpires: Date,
    regToken:String,
    regTokenExp:Date
})

staffSchema.plugin(require("../plugins/setFullName"));
staffSchema.plugin(require("../plugins/phonenumber"));
staffSchema.plugin(require("../plugins/encrypt"));
staffSchema.plugin(require("../plugins/comparePassword"));

module.exports = mongoose.model("StaffMember",staffSchema);
