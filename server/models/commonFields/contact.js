var validate = require("../helpers/validate")
var enums = require("../../locals/fields/enums")

var staff = {
 	phone1: {
        type: String,
        required: true,
        validate: validate.phoneNo,
    },
    phone2:{
        type: String,
        validate: validate.altPhoneNo,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 50,
        validate: validate.email,
    },
    alt_email: {
        type: String,
        lowercase: true,
        maxlength: 50,
        validate: validate.altEmail,
    },
    passport: {
        type: String,
        required: true,
        enum: ["Yes", "No"],
    },
    passport_expiration:{
        type: String,
        default: "",
        validate: validate.passport,
    }
}

var private_data = {
	guardian_name:{type:String},
    guardian_number:{type:String},
    address:{
        street: {
           	type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50,
        },
        state: {
            type: String,
            required: true,
            enum: enums.states,
        },
        city: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50,
        },
        zipcode: {
           type: String,
           required: true,
           trim: true,
           validate: validate.zipcode,
        },
    }
}

var player = Object.assign({}, staff, {private_data})

 module.exports = {player , staff}
