var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Player = require("./main");
var enums = require('../../locals/fields/enums');
var validate = require('../helpers/validate');

var GoalieSeasonStatsSchema = new Schema({
  _id: false,
  season: {
    type: String,
    required: true,
    match: /^20\d{2}$/,
  },
  team_name: {
    type: String,
    required: true,
    trim: true,
    enum: enums.teams.names,
  },
  games_played: {
    type: Number,
    required: true,
    default: 0,
    max: 40,
  },
  MIN: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
    max: 1200,
  },
  SA: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  SV: {
    type: Number,
    required: true,
    default:0,
    min: 0,
    max: 2000,
  },
  GA: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 200,
  },
  SO: {
    type: Number,
    required: true,
    default:0,
    min: 0,
    max: 2000,
  },
  G: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 200,
  },
  A: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 500,
  },
  P: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 400,
  },
  PIM: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 1000,
  },
  SOSh: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  SOSa: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  win: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 0
  },
  loss: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
  tie: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
});

var GoalieGameStatsSchema = new Schema({
  _id: false,
  season: {
    type: String,
    required: true,
    match: /^20\d{2}$/,
  },
  team_name: {
    type: String,
    required: true,
    trim: true,
    enum: enums.teams.names,
  },
  date: {
    type: String,
    required: true,
    validate: validate.date,
  },
  home_game: {
    type: String,
    required: true,
    enum: ['true', 'false'],
  },
  opponent:{
    type: String,
    required: true,
    maxlength: 50,
  },
  result: {
    type: String,
    required: true,
    enum: enums.gameResult,
  },
  MIN: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
    max: 1200,
  },
  SA: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  SV: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  GA: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 200,
  },
  SO: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  G: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 200,
  },
  A: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 500,
  },
  P: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 400,
  },
  PIM: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 1000,
  },
  SOSh: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  SOSa: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2000,
  },
  GAA:{
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 20,
  },
  SVP: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 1,
  },
});

var GoalieStatsSchema = new Schema({
    season_stats : [GoalieSeasonStatsSchema],
    game_stats : [GoalieGameStatsSchema],
    career_stats : {
      games_played: {
        type: Number,
        required: true,
        default: 0,
        max: 800,
      },
      MIN: {
        type: Number,
        required: true,
        default: 0,
        min: 1,
        max: 20000,
      },
      SA: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 40000,
      },
      SV: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 40000,
      },
      GA: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 4000,
      },
      SO: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 40000,
      },
      G: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 4000,
      },
      A: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 1000,
      },
      P: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 8000,
      },
      PIM: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 20000,
      },
      SOSh: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 40000,
      },
      SOSa: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 40000,
      },
      win: {
        type: Number,
        required: true,
        default:0,
        enum: [0, 1],
      },
      loss: {
        type: Number,
        required: true,
        default:0,
        enum: [0, 1],
      },
      tie: {
        type: Number,
        required: true,
        default:0,
        enum: [0, 1],
      },
    }
});

var goalie = Player.discriminator("Goalie", GoalieStatsSchema);

module.exports = goalie;
