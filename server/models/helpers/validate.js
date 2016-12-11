
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

function dateValidator (val){
  var d = new Date();
  var year = Number(val.substr(0, 4));
  var month = Number(val.substr(5,2));
  var day = Number(val.substr(8, 2));
  var pattern = new RegExp(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!pattern.test(val) || val.length !== 10 || ((d.getFullYear - year) > 1)) {
    console.log('date error')
    return false;
  }
  if ((day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false' || month < 1 || month > 12 ||
      day < 1 || day > 31)) {
        console.log('date error')
        return false;
  }
  return true;
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
      (month === 2 && day === 29 && isLeapYear(year) === 'false' || month < 1 || month > 12 ||
      day < 1 || day > 31)) {
        console.log('birthday error')
        return false;
  }
  return true;
}

function passportDateValidator (val) {
  if(!val) return true;
  var todaysDate;
  var d = todaysDate = new Date();
  var year = Number(val.substr(0, 4));
  var month = Number((val.match(/-\d{1,2}-/)[0]).slice(1, -1));
  var day =  Number(val.match(/-\d{1,2}$/)[0].slice(1));
  var passportDate = new Date(year, (month - 1), day);
  if (year === 0 || month === 0 || day === 0 || (passportDate < todaysDate)) return false;
  var pattern = new RegExp(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (!pattern.test(val) || val.length < 9 || val.length > 10  || ((d.getFullYear - year) < 5)) {
    console.log('passport date error')
    return false;
  }
  if ((day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false' || month < 1 || month > 12 ||
      day < 1 || day > 31)) {
        console.log('passport date error')
        return false;
  }
  return true;
}

function jerseyNoValidator (num) {
  num = +num;
  return num>-1 && num <100;
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
  date: dateValidator,
}

module.exports = validate;
