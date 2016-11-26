var selectRadio = 'Please make a selection.';
var notRight = 'Hmm, that doesn\'t look right.';
var correctEmail = 'Enter your full email address, including the "@".';
var phoneNumberFormat = 'This phone number format is not recognized. Please check the number.'
var zipCode = 'Hmm, that ZIP code doesn\'t look right.'
var jerseyNumber = 'Choose a number from 00 through 99'

function notRightFunc(str, self){
  self.closest('.form-group').find('.empty').remove();
  self.closest('.form-group').append("<p class='empty'>" + str + "</p>");
  return;
}

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

$('form').validate({
  // onkeyup: function(element) { $(element).valid(); },
  onfocusout: function(element) { $(element).valid(); },
  invalidHandler: function(event, validator) {
    var errorMessage = 'Your form could not be sumitted. Please look at the form item(s) highlighted in red.';
    var errors = validator.numberOfInvalids();
    if (errors) {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
      $("p.message-box").html(errorMessage);
      $("p.message-box").css('border-color', '#dd4b39');
    } else {
      $("p.message-box").hide();
    }
  },
  rules: {
      firstname: {
          maxlength: 40,
      },
      lastname: {
        maxlength: 40,
      },
      'public_data[gender]': {
          required: true,
      },
      'public_data[weight]': {
        number: true,
        min: 50,
        max: 350,
      },
      'contact[passport]': {
          required: true,
      },
      'contact[email]': {
        required: true,
        email: true,
        maxlength: 50,
      },
      'contact[alt_email]': {
        email: true,
        maxlength: 50,
      },
      'contact[phone1]': {
          required: true,
          phoneUS: true,
          maxlength: 15,
      },
      'contact[phone2]': {
          phoneUS: true,
          maxlength: 15,
      },
      "contact[private_data][address][street]": {
        required: true,
        maxlength: 50,
      },
      'contact[private_data][address][city]': {
        required: true,
        maxlength: 50,
      },
      'contact[private_data][address][zipcode]': {
        required:true,
        zipcodeUS: true,
        maxlength: 10,
      },
      'background[hometown]': {
        required: true,
        maxlength: 50,
      },
      'contact[private_data][guardian_name]': {
        required: true,
        maxlength: 50,
      },
      'contact[private_data][guardian_number]': {
          required: true,
          phoneUS: true,
          maxlength: 15,
      },
      'hockey_info[team]': {
          required: true,
      },
      "team[position]": {
        required: true,
      },
      "team[shooting_hand]": {
        required: true,
      },
      "hockey_info[tournament_team]": {
        maxlength: 50,
      },
      "hockey_info[league_team]": {
        maxlength: 50,
      },
      'hockey_info[website]': {
        url: true,
        maxlength: 100,
      },
      'apparel[shirt]': {
          required: true,
      },
      'apparel[polo]': {
          required: true,
      },
      'apparel[jacket]': {
          required: true,
      },
      'apparel[hat]': {
          required: true,
      },
      'apparel[socks]': {
          required: true,
      },
      'apparel[shorts]': {
          required: true,
      },
      'apparel[jersey]': {
          required: true,
      },
      'hockey_info[shooting_hand]': {
        required: true,
      },
      'hockey_info[position]': {
        required: true,
      },
      'hockey_info[team]': {
        required: true,
      },
      "background[hockey_history]": {
        required: true,
      },
      "background[other_sports]": {
        required: true,
      },
      "background[career_highlights]": {
        required: true,
      },
      'hockey_info[jersey_number][choice1]':{
        required: true,
        number: true,
        min: 0,
        max: 99,
      },
      'hockey_info[jersey_number][choice2]':{
        required: true,
        number: true,
        min: 0,
        max: 99,
      },
      'hockey_info[jersey_number][choice3]':{
        required: true,
        number: true,
        min: 0,
        max: 99,
      },
      "favorite[movie]": {
        required: true,
        maxlength: 50,
      },
      "favorite[tv_show]": {
        required: true,
        maxlength: 50,
      },
      "favorite[sports_team]": {
        required: true,
        maxlength: 50,
      },
      "favorite[athlete]": {
        required: true,
        maxlength: 50,
      },
      "favorite[other_sport]": {
        required: true,
        maxlength: 50,
      },
      "favorite[food_or_restaurant]": {
        required: true,
        maxlength: 50,
      },
      "background[education]": {
        required: true,
        maxlength: 50,
      },
      "background[social_media][facebook]":{
        maxlength: 50,
      },
      "background[social_media][twitter]": {
        maxlength: 50,
      },
      "background[social_media][instagram]": {
        maxlength: 50,
      },
      "background[social_media][linkedin]": {
        maxlength: 50,
      },
  },
  messages: {
      'public_data[gender]': {
          required: selectRadio
      },
      'public_data[weight]': {
        number: notRight,
        min: notRight,
        max: notRight,
      },
      'contact[passport]': {
        required: selectRadio,
      },
      'contact[email]': {
        email: correctEmail,
      },
      'contact[alt_email]': {
        email: correctEmail,
      },
      'contact[phone1]': {
          phoneUS: phoneNumberFormat,
      },
      'contact[phone2]': {
          phoneUS: phoneNumberFormat,
      },
      'contact[private_data][address][zipcode]': {
        zipcodeUS: zipCode,
      },
      'contact[private_data][guardian_number]': {
          phoneUS: phoneNumberFormat,
      },
      'apparel[shirt]': {
          required: selectRadio,
      },
      'apparel[polo]': {
          required: selectRadio,
      },
      'apparel[jacket]': {
          required: selectRadio,
      },
      'apparel[hat]': {
          required: selectRadio,
      },
      'apparel[socks]': {
          required: selectRadio,
      },
      'apparel[shorts]': {
          required: selectRadio,
      },
      'apparel[jersey]': {
          required: selectRadio,
      },
      'hockey_info[shooting_hand]': {
        required: selectRadio,
      },
      'hockey_info[position]': {
        required: selectRadio,
      },
      'hockey_info[team]': {
        required: selectRadio,
      },
      'hockey_info[jersey_number][choice1]':{
        number: jerseyNumber,
        min: jerseyNumber,
        max: jerseyNumber,
      },
      'hockey_info[jersey_number][choice2]':{
        number: jerseyNumber,
        min: jerseyNumber,
        max: jerseyNumber,
      },
      'hockey_info[jersey_number][choice3]':{
        number: jerseyNumber,
        min: jerseyNumber,
        max: jerseyNumber,
      },
  },
  highlight: function (element, errorClass) {
      $(element).addClass('redBorder');
  },
  unhighlight: function (element, errorClass) {
      $(element).closest('.form-group').removeClass('redBorder');
  },
  errorPlacement: function (error, element) {
      if (element.attr('type') == 'radio') {
          element.closest('.form-group').append(error).addClass('redBorder');
      }
      else {
          error.insertAfter(element);
      }
  }
});

$.extend($.validator.messages, { required: "You can't leave this empty." });


$('.day').blur(function(){
  var self = $(this);
  var day = $(this).val();
  var month = Number($(this).parent().prev().val());
  var year = Number($(this).next().val());
  if ( day === '') {
    var str = "You can\'t leave the day empty";
    notRightFunc(str, self);
    $(this).addClass('redBorder');
    return;
  }
  day = Number(day);
  if (!Number.isInteger(day) || day < 1 || day > 31 || (day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false')) {
    var str = 'Hmm, the day doesn\'t look right';
    notRightFunc(str, self);
    $(this).addClass('redBorder');
    return;
  }
  $(this).removeClass('has-danger redBorder');
  $(this).closest('.form-group').find('.empty').remove();

});

$('.year').blur(function(){
  var self = $(this);
  console.log($(this));
  var currentYear = (new Date()).getFullYear();
  var day = Number($(this).prev().val());
  var month = Number($(this).parent().prev().val());
  var year = $(this).val();
  if ( year === '') {
    var str = "You can\'t leave the year empty";
    notRightFunc(str, self);
    $(this).addClass('redBorder');
    return;
  }
  year = Number(year);

  if (!Number.isInteger(year) || (year < 1950) ||
      ((year > (currentYear - 5)) && (self.attr('name') === 'birthday-year')) ||
      (day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false')) {
    var str = 'Hmm, the date doesn\'t look right';
    notRightFunc(str, self);
    return;
  }
  $(this).removeClass('has-danger redBorder');
  $(this).closest('.form-group').find('.empty').remove();

});

function checkMonth(){
  var self = $(this);
  var day = Number(self.next().children('.day').val());
  var month = Number(self.val());
  var year = Number(self.next().children('.year').val());
  if (self.val() !== 0) {
    self.removeClass('has-danger redBorder');
    self.closest('.form-group').find('.empty').remove();
  }
  if ((day > 29 && month === 2) || (([4, 6, 9, 11].indexOf(month) !== -1) && day === 31) ||
      (month === 2 && day === 29 && isLeapYear(year) === 'false')) {
    var str = 'Hmm, the day doesn\'t look right';
    self.next().children('.day').addClass('redBorder');
    notRightFunc(str, self);
    return;
  }

}

$('.month').change(checkMonth);