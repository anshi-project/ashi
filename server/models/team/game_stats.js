var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var enums = require('../../locals/fields/enums');
var validate = require('../helpers/validate');


var PlayerStatsSchema = new Schema({
    _id: false,
    jersey_number: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
    name: {
      type: String,
    	required: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 40,
      type: String
    },
    home_game: {
      type: String,
      required: true,
      enum: ['true', 'false'],
    },
    opponent: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    date: {
      type: String,
      required: true,
      validate: validate.date,
    },
    season: {
      type: String,
      required: true,
      match: /^20\d{2}$/,
    },
    result: {
      type: String,
      required: true,
      enum: enums.gameResult,
    },
    G: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    A:{
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },
    P: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },
    PM: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },
    PIM: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },
    OTG:{
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    GWG: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    PPG: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    SHG: {
      type: Number,
      required: true,
      min: 0,
      max: 400,
    },
    SOG: {
      type: Number,
      required: true,
      min: 0,
      max: 400,
    },
    SOM: {
      type: Number,
      required: true,
      min: 0,
      max: 400,
    },
});

var GoalieStatsSchema = new Schema({
    _id: false,
    jersey_number: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
    name: {
      type: String,
    	required: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 40,
      type: String
    },
    home_game: {
      type: String,
      required: true,
      enum: ['true', 'false'],
    },
    opponent:{
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    date: {
      type: String,
      required: true,
      validate: validate.date,
    },
    season: {
      type: String,
      required: true,
      match: /^20\d{2}$/,
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
      max: 90,
    },
    SA: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 1000,
    },
    SV: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 1000,
    },
    GA: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 500,
    },
    SO: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    G: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 50,
    },
    A: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    P: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    PIM: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    SOSh: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    SOSa: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
});

var TeamGameStatsSchema = new Schema({
    _id: false,
    home_game: {
      type: String,
      required: true,
      enum: ['true', 'false'],
    },
    opponent: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    date: {
      type: String,
      required: true,
      validate: validate.date
    },
    result: {
      type: String,
      required: true,
      enum: enums.gameResult,
    },
    season: {
      type: String,
      required: true,
      match: /^20\d{2}$/,
    },
    P1_goals: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    P2_goals: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    P3_goals: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    OT: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    OT2: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    OT3: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    GF: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    GA: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    PPG: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    PPO: {
      type: Number,
      required: true,
      min :0,
      max: 20,
    },
    PKP: {
      type: Number,
      required: true,
      min: -999,
      max: 1,
    },
    PPP: {
      type: Number,
      required: true,
      min: -999,
      max: 1,
    },
});

var GameStatsSchema = new Schema({
    team_name: {
      type: String,
      required: true,
      enum: enums.teams.names,
    },
    home_game: {
      type: String,
      required: true,
      enum: ['true', 'false'],
    },
    opponent: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    date: {
      type: String,
      required: true,
      validate: validate.date,
    },
    season: {
      type: String,
      required: true,
      match: /^20\d{2}$/,
    },
    time: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    ashi_players: [PlayerStatsSchema],
    ashi_goalies: [GoalieStatsSchema],
    ashi_team: [TeamGameStatsSchema],
    opponent_players: [PlayerStatsSchema],
    opponent_goalies: [GoalieStatsSchema],
    opponent_team: [TeamGameStatsSchema],
    gameNotes: {
      type: String,
      maxlength: 50000,
    },
});

module.exports = mongoose.model('GameStats', GameStatsSchema);
