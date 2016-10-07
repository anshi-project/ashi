var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSeasonStatsSchema = new Schema({
    season: {type: String, default: "2016"},
    GP: {type:Number, default:0},
    W: {type:Number, default:0},
    L: {type:Number, default:0},
    T: {type:Number, default:0},
    OT: {type:Number, default:0},
    OSO: {type:Number, default:0},
    P: {type:Number, default:0},
    GF: {type:Number, default:0},
    GA: {type:Number, default:0},
    PP_percent: {type:Number, default:0},
    PK_percent: {type:Number, default:0}
});

module.exports = mongoose.model("TeamSeasonStats", TeamSeasonStatsSchema);