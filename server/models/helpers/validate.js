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

var sizes = ["SM", "M", "L", "XL", "XXL", "XXXL", "S/M", "L/XL", "Goalie-XXL",
            "Goalie-XXXL"];

var sportsCoached = ["Ice hockey", "Ball hockey", "Field Hockey", "Other"];
var teams = ["U16", "U18", "U20", "Men's Team USA", "Women's Team USA", "Men's Master's Team USA",
            "Men's Master's Team DC", "Women's Team Red", "Women's Team Blue"];
var highestLevelCoached = ["Youth Hockey", "Junior's", "College", "Semi-Professional", "Professional", "Travel Ball Hockey"];
var coachingPositions = ["Head Coach", "Assistant Head Coach", "Assistant Coach for Forwards", "Assistant Coach for Defense", "Other"];

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

function altEmailValidator (email){
  if (email === '') return true;
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
}

function phoneNoValidator (phoneNo) {
  var pattern = new RegExp(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
  phoneNo = phoneNo.replace( /\s+/g, "");
  return pattern.test(phoneNo);
}

function altPhoneNoValidator (phoneNo) {
  if (phoneNo === '') return;
  var pattern = new RegExp(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
  phoneNo = phoneNo.replace( /\s+/g, "");
  return pattern.test(phoneNo);
}


function zipcodeValidator (zipcode) {
  return /^\d{5}(-\d{4})?$/.test(zipcode);
}

function urlValidator (url) {
  if (url.length === 0) return true;
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
}
//end Jquery Validation Plugin code


var validate = {
  gender: gender,
  heights: heights,
  states: states,
  divisions: divisions,
  teams: teams,
  positions: positions,
  shootingHand: shootingHand,
  sizes: sizes,
  sportsCoached: sportsCoached,
  teams: teams,
  highestLevelCoached: highestLevelCoached,
  coachingPositions: coachingPositions,
  isLeapYear: isLeapYear,
  birthday: birthdayValidator,
  passport: passportDateValidator,
  jerseyNo: jerseyNoValidator,
  email: emailValidator,
  altEmail: altEmailValidator,
  phoneNo: phoneNoValidator,
  altPhoneNo: altPhoneNoValidator,
  zipcode: zipcodeValidator,
  url: urlValidator,
}

module.exports = validate;
