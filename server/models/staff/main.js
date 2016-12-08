var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var nameField = require("../commonFields/name")
var contactField = require("../commonFields/contact").staff

var staffSchema = new Schema({
    firstname: nameField,
    lastname: nameField,
    username: {
      type: String,
      unique:true,
      required:true
      // validate: validate.username,
    },
    password:{
      type: String
    },
    status:{
      type:String,
      default:"registration form delivered",
      enum: ["Active", "Pending", "inactive", "registration form delivered"] 
    },
    contact:contactField,
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
