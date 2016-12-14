var validate = require("../helpers/validate")
var enums = require("../../locals/fields/enums")

module.exports= {
  date_of_birth:{
    type: Date,
    required: true,
    validate: validate.birthday,
  },
  gender: {
    type: String,
    required: true,
    enum: enums.player.gender,
  },
  weight: {
    type: Number,
    min: 50,
    max: 350,
  },
  height: {
    type: String,
    required: true,
    enum: enums.heights
  }
}
