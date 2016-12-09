var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Player = require("./main");
var enums = require('../../locals/fields/enums');
var validate = require('../helpers/validate');

var PlayerSeasonStatsSchema = new Schema({
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
  G: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  A: {
    type: Number,
    required: true,
    min :0,
    max: 500,
  },
  P: {
    type: Number,
    required: true,
    min :0,
    max: 500,
  },
  PM: {
    type: Number,
    required: true,
    min : 0,
    max: 500,
  },
  PIM: {
    type: Number,
    required: true,
    min: 0,
    max: 500,
  },
  OTG: {
    type: Number,
    required: true,
    min :0,
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
  win: {
    type: Number,
    required: true,
    enum: [0, 1],
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

var PlayerGameStatsSchema = new Schema({
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
            G: {
              type: Number,
              required: true,
              min :0,
              max: 20,
            },
            A:{
              type: Number,
              required: true,
              min :0,
              max: 500,
            },
            P: {
              type: Number,
              required: true,
              min :0,
              max: 500,
            },
            PM: {
              type: Number,
              required: true,
              min : 0,
              max: 500,
            },
            PIM: {
              type: Number,
              required: true,
              min :0,
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
              min :0,
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
});

var PlayerStatsSchema = new Schema({
    season_stats : [PlayerSeasonStatsSchema],
    game_stats : [PlayerGameStatsSchema],
    career_stats : {
      games_played: {
        type: Number,
        required: true,
        default: 0,
        max: 400,
      },
      G: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
      },
      A: {
        type: Number,
        required: true,
        min :0,
        max: 1000,
      },
      P: {
        type: Number,
        required: true,
        min :0,
        max: 1000,
      },
      PM: {
        type: Number,
        required: true,
        min : 0,
        max: 1000,
      },
      PIM: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
      },
      OTG: {
        type: Number,
        required: true,
        min :0,
        max: 400,
      },
      GWG: {
        type: Number,
        required: true,
        min: 0,
        max: 200,
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
      win: {
        type: Number,
        required: true,
        enum: [0, 1],
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
    }
});

var player = Player.discriminator("Default", PlayerStatsSchema);


module.exports = player;
