var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Registration=require("./main");
var validate = require('../helpers/validate');

var CoachReg = Registration.discriminator("coach-registration",
  new Schema ({
    contact:{
      phone1: {
        type: String,
        required: true,
        validate: validate.phoneNo,
      },
      phone2:{
        type: String,
        default: 'N/A',
        validate: validate.altPhoneNo,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        validate: validate.email,
      },
      alt_email: {
        type: String,
        lowercase: true,
        validate: validate.altEmail,
      },
      passport: {
        type: String,
        required: true,
        enum: ["Yes", "No"],
      },
      passport_expiration:{
        type: String,
        default: "N/A",
        validate: validate.passport,
      },
    },
    apparel: {
      shirt: {
        type: String,
        required: true,
        enum: validate.sizes,
      },
      polo: {
        type: String,
        required: true,
        enum: validate.sizes,
      },
      hat: {
        type: String,
        required: true,
        enum: validate.sizes,
      },
      jacket: {
        type: String,
        required: true,
        enum: validate.sizes,
      },
    },
    background:{
      social_media:{
        facebook: {
          type: String,
          trim: true,
          maxlength: 50,
        },
        twitter: {
          type: String,
          trim: true,
          maxlength: 50,
        },
        instagram: {
          type: String,
          trim: true,
          maxlength: 50,
        },
        linkedin: {
          type: String,
          trim: true,
          maxlength: 50,
        },
      },
      former_coaching_positions:[{
        type:String,
        required: true,
        enum: validate.sportsCoached,
      }],
      hometown: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      short_answers:{
        career_highlights: {
          type: String,
          trim: true,
          minlength: 1,
          maxlength: 4000,
        },
        preparation: {
          type: String,
          trim: true,
          minlength: 1,
          maxlength: 4000,
        },
        coaching_style: {
          type: String,
          trim: true,
          minlength: 1,
          maxlength: 4000,
        },
        why_a_good_candidate: {
          type: String,
          trim: true,
          minlength: 1,
          maxlength: 4000,
        },
        create_team_atmosphere: {
          type: String,
          trim: true,
          minlength: 1,
          maxlength: 4000,
        },
      },
      preferred_coaching_position:{
        type: String,
        required: true,
        enum: validate.coachingPositions
      },
      team_applying_for: {
        type: String,
        required: true,
        enum: validate.teams,
      },
      highest_level_coached: {
        type: String,
        required: true,
        enum: validate.highestLevelCoached,
      },
    }
  })
);


module.exports = CoachReg;
