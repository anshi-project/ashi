var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Registration = require("./main");
var validate = require('../helpers/validate');

var PlayerReg = Registration.discriminator("player-registration",
  new Schema({
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
      socks: {
        type: String,
        required: true,
        enum: validate.sizes,
      },
      shorts: {
        type: String,
        required: true,
        enum: validate.sizes,
      },
      jersey: {
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
    public_data:{
      date_of_birth:{
        type: String,
        required: true,
        validate: validate.birthday,
      },
      gender: {
        type: String,
        required: true,
        enum: validate.gender,
      },
      weight: {
        type: Number,
        min: 50,
        max: 350,
      },
      height: {
        type: String,
        required: true,
        enum: validate.heights,
      },
    },
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
        required: true,
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
      private_data:{
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
            enum: validate.states,
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
      hometown: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      education: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      hockey_history: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 4000,
      },
      other_sports: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 4000,
      },
      career_highlights: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 4000,
      },
    },
    favorite:{
      movie: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      tv_show: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      athlete: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      sports_team: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      other_sport: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      food_or_restaurant: {
        type: String,
        trim: true,
        maxlength: 50,
      },
    },
    hockey_info:{
      website:{
        type: String,
        trim: true,
        validate: validate.url,
      },
      league_team: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      tournament_team: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      jersey_number:{
        choice1: {
          type: String,
          required: true,
          validate: validate.jerseyNo,
        },
        choice2: {
          type: String,
          required: true,
          validate: validate.jerseyNo,
        },
        choice3: {
          type: String,
          required: true,
          validate: validate.jerseyNo,
        },
      }
    },
  })
);

module.exports = PlayerReg;
