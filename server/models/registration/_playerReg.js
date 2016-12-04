var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Registration = require("./main");

var common = require("../commonSchemas/index")

var validate = require('../helpers/validate');
var enums = require("../../locals/fields/enums")

var PlayerReg = Registration.discriminator("player-registration",
  new Schema({
    
    apparel: common.apparel.player,
    
    public_data: common.public_data,
    
    contact: common.contact.player,
    
    background:{
      social_media:common.social_media,
      
      hometown: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 50,
      },
      education: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 50,
      },
      hockey_history: {
        type: String,
        trim: true,
        minlength: 12,
        maxlength: 4000,
      },
      other_sports: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 4000,
      },
      career_highlights: {
        type: String,
        trim: true,
        minlength: 2,
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
