var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var methods = require("./methods");

var gender = ['Male', 'Female'];

var heights = ["4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"",
    "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"",
    "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"",
    "6'9\"", "6'10\"", "6'11\"", "7'0\""
];

var states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
    "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD",
    "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
    "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"
];

var divisions = ["Junior's", "Men's", "Women's", "Men's Master's", "Women's Master's"];

var teams = ["U16", "U18", "U20", "Men's Team USA", "Women's Team USA", "Men's Master's Team USA",
            "Men's Master's Team DC", "Women's Team Red", "Women's Team Blue"];

var positions = ["Left wing", "Right wing", "Center", "Right defense", "Left defense", "Goalie"];

var shootingHand = ['Left', 'Right'];

function isLeapYear (year) {
 if ((parseInt (year) % 4) === 0) {
  if (parseInt (year) % 100 === 0) {
    if (parseInt (year) % 400 !== 0) {
      return 'false';
    }
    if (parseInt (year) % 400 === 0) {
      return "true";
    }
  }
  if (parseInt (year) % 100 !== 0) {
    return "true";
  }
 }
 if ((parseInt (year) % 4) !== 0) {
    return "false";
 }
}

function birthdayValidator (val) {
  var d = new Date();
  var year = Number(val.substr(0, 4));
  var month = Number(val.substr(5,2));
  var day = Number(val.substr(8, 2));
  var pattern = new RegExp(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!pattern.test(val) || val.length !== 10 || ((d.getFullYear - year) < 5) ||
  (d.getFullYear - year) > 60) {
    console.log('birthday error')
    return false;
  }
  if ((day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false')) {
        console.log('birthday error')
        return false;
  }
}

function passportDateValidator (val) {
  var todaysDate;
  var d = todaysDate = new Date();
  var year = Number(val.substr(0, 4));
  var month = Number(val.substr(5,2));
  var day = Number(val.substr(8, 2));
  var passportDate = new Date(year, (month - 1), day);
  if (year === 0 || month === 0 || day === 0 || (passportDate < todaysDate)) return false;
  var pattern = new RegExp(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!pattern.test(val) || val.length !== 10 || ((d.getFullYear - year) < 5)) {
    console.log('passport date error')
    return false;
  }
  if ((day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false')) {
        console.log('passport date error')
        return false;
  }
}

function jerseyNoValidator (no) {
  return /^\d{2}$/.test(no);
}

//the following block of validator functions use code from JQuery Validation Plugin
function emailValidator (email){
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
}

function phoneNoValidator (phoneNo) {
  var pattern = new RegExp(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
  var phoneNo = '(555) 555-5555';
  phoneNo = phoneNo.replace( /\s+/g, "");
  return pattern.test(phoneNo);
}

function zipcodeValidator (zipcode) {
  return /^\d{5}(-\d{4})?$/.test(zipcode);
}

function urlValidator (url) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
}
//end Jquery Validation Plugin code


var playerSchema = new Schema({
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 40,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 40,
    },
    paid: {type:Boolean,default:false},
    headshot:{type:Boolean,default:false},
    archive:{
      paid:Boolean,
      //Make sure a player who hasn't paid doesn't get a free pass if theyre archived and then restored
      //Stores current payment status before being archived
      timestamp:Date,
      isArchived:Boolean
    },
    team: {
      name: {
        type: String,
        required: true,
        enum: teams,
      },
      division: {
        type: String,
        required: true,
        enum: divisions,
      },
      position:[{
        type: String,
        required: true,
        enum: positions
      }],
      jersey_number: {
        type: String,
        required: true,
        validate: jerseyNoValidator,
      },
      shooting_hand: {
        type: String,
        required: true,
        enum: shootingHand,
      },
    },
    public_data:{
      date_of_birth: {
        type: String,
        required: true,
        validate: birthdayValidator,
      },
      gender: {
        type: String,
        required: true,
        enum: gender,
      },
      weight: {
        type: Number,
        min: 50,
        max: 350,
      },
      height: {
        type: String,
        required: true,
        enum: heights,
      },
    },
    background:{
      social_media:{},
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
        minlength: 1,
        maxlength: 50,
      },
      tv_show: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      athlete: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      sports_team: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      other_sport: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      food_or_restaurant: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
    },
    contact: {
      phone1: {
        type: String,
        required: true,
        validate: phoneNoValidator,
      },
      phone2:{
        type: String,
        default: 'N/A',
        validate: phoneNoValidator,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        validate: emailValidator,
      },
      alt_email: {
        type: String,
        required: true,
        lowercase: true,
        validate: emailValidator,
      },
      passport: {
        type: String,
        required: true,
        enum: ["Yes", "No"],
      },
      passport_expiration:{
        type: String,
        default: "N/A",
        validate: passportDateValidator,
      },
      private_data:{
        guardian_name:{type:String,default:"N/A"},
        guardian_number:{type:String,default:"N/A"},
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
            enum: states,
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
           validate: zipcodeValidator,
         },
        }
      }
    },
    apparel:{},
    hockey_info:{
      team:String,
      website:{
        type: String,
        trim: true,
        validate: urlValidator,
      },
      league_team: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      tournament_team: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
      },
      jersey_number:{
        choice1: {
          type: String,
          required: true,
          validate: jerseyNoValidator,
        },
        choice2: {
          type: String,
          required: true,
          validate: jerseyNoValidator,
        },
        choice3: {
          type: String,
          required: true,
          validate: jerseyNoValidator,
        },
      }
    },
    status: {
      type: String,
      default: "Active"
    },
  }, //inactive, renewing membership, Active
  {timestamps: true}
  );

playerSchema.virtual("public_data.age").get(function(){
    var now=Date.now();
    var dob=new Date(this.public_data.date_of_birth).getTime();
    var ageDate=new Date(now-dob);
    return Math.abs(ageDate.getUTCFullYear()-1970)

})

playerSchema.virtual("team.pos_abrv").get(function(){
  var arr=[];
  this.team.position.forEach(pos=>{
    if(/Defense/.test(pos)){
      arr.push("D")
    }else{
      pos = pos.split(" ").map(v=>{return v.charAt(0).toUpperCase()}).join("")
      arr.push(pos);
    }
  })
  return arr.join("/")
})




playerSchema.plugin(require("../plugins/setFullName"));
playerSchema.plugin(require("../plugins/phonenumber"));

playerSchema.statics.updateTeamRecords = methods.updateTeamRecords;
playerSchema.statics.assignToTeam = methods.assign;
//Create a new player object from the registration object. Assign to a team.
playerSchema.statics.updatePayments = methods.updatePayments;


module.exports=mongoose.model("Player", playerSchema)
