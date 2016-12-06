var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var nameField = require("../commonFields/name")
var contactField = require("../commonFields/contact").staff

var staffSchema = new Schema({
    firstname: nameField,
    lastname: nameField,
    username: {
      type: String,
      required: true,
      unique:true,
      // validate: validate.username,
    },
    password:{
      type: String,
      required: true,
    },
    status:{
      type:String,
      default:"Pending",
      enum: ["Active", "Pending", "inactive"] 
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
