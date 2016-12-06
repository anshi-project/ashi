var validate = require("../helpers/validate")
var enums = require("../../locals/fields/enums")

module.exports= {
  date_of_birth:{
    type: String,
    required: true,
    // validate: validate.birthday,
  },
  gender: {
    type: String,
    required: [true,"Gender must be included."],
    enum: enums.player.gender,
  },
  weight: {
    type: Number,
    min: [50, "Weight must be above 50 lbs"],
    max: [350, "Weight must be 350 or below"],
  },
  height: {
    type: String,
    required: true,
    enum: enums.heights
  }
}