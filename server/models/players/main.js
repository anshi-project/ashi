var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var methods = require("./methods");

var fields = require("../commonFields/index");
var enums = require("../../locals/fields/enums");

var playerStats = require("./playerStatSchema");
var goalieStats = require("./goalieStatSchema");

var playerSchema = new Schema({
  firstname: fields.name,

  lastname: fields.name,

  public_data: fields.public_data,

  apparel: fields.apparel.player,

  contact: fields.contact.player,

  favorite: fields.favorite,

  background: fields.background.player,

  hockey_info: fields.hockey_info,

  archivedAt: {
    type:Date,
    required:false
  }, 
  paid: {
    type: Boolean,
    required: true,
    default: false
  },
  headshot: {
    type: Boolean,
    required: true,
    default: false
  },
  team: {
    name: {
      type: String,
      required: true,
      enum: enums.teams.names,
    },
    position: [{
      type: String,
      required: true,
      enum: enums.player.positions
    }],
    jersey_number: {
      type: Number,
      required: true,
      // validate: {
      //   validator: function(num){ return num >= 0 && num < 100 },
      //   message: "Please pick a number between 0 and 99"
      // },
    },
    shooting_hand: {
      type: String,
      required: true,
      enum: enums.player.shooting_hand,
    }
  },
  status: {
    type: String,
    default: "Active",
    enum: ["archived", "Active", "renewing membership"]
  },
  stats:{
    player:playerStats,
    goalie:goalieStats
  }
}, {
  timestamps: true
});


playerSchema.virtual("public_data.age").get(function() {
  var now = Date.now();
  var dob = new Date(this.public_data.date_of_birth).getTime();
  var ageDate = new Date(now - dob);
  return Math.abs(ageDate.getUTCFullYear() - 1970)
})

playerSchema.virtual("team.pos_abrv").get(function() {
  var arr = [];
  var regexp = new RegExp("defense", "i");
  this.team.position.forEach(pos => {
    if (regexp.test(pos)) {
      arr.push("D")
    } else {
      pos = pos.split(" ").map(v => {
        return v.charAt(0).toUpperCase()
      }).join("")
      arr.push(pos);
    }
  })
  return arr.join("/")
})


playerSchema.plugin(require("../plugins/virtuals"));

playerSchema.statics.updateTeamRecords = methods.updateTeamRecords;

playerSchema.statics.assignToTeam = methods.assign;
//Create a new player object from the registration object. Assign to a team.
playerSchema.statics.renewMembership = methods.renewMembership;

playerSchema.statics.updatePayments = methods.updatePayments;


module.exports = mongoose.model("Player", playerSchema)