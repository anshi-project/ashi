
$(function() {

  function toggleFormField(expMonth, expDay, expYear, condition) {
    if (condition) {
      expMonth.attr("disabled", true).removeClass('redBorder').parent().css("opacity", ".8");
      expDay.attr("disabled", true).removeClass('redBorder').parent().css("opacity", ".8");
      expYear.attr("disabled", true).removeClass('redBorder').parent().css("opacity", ".8");
      expMonth.closest('.form-group').find('.empty').remove();
    } else {
      expMonth.attr("disabled", false).parent().css("opacity", "1");
      expDay.attr("disabled", false).parent().css("opacity", "1");
      expYear.attr("disabled", false).parent().css("opacity", "1");
    }
  }

  $("input[name='contact[passport]']").on("change", function() {
    var passport = $(this).val();
    var expMonth = $("select[name='contact[passport_exp]']");
    var expDay = $("input[name='passport-day']");
    var expYear = $("input[name='passport-year']");
    var condition = (passport === "No");
    toggleFormField(expMonth, expDay, expYear, condition);
  });

  $("input[required='false']").attr("required",false);

  $(document).ready(function() {
    $('.optional').closest('.form-group').children('label').append('<i> (not required)</i>');
  });

  function notRightFunc(str, selector){
    selector.addClass('redBorder');
    selector.closest('.form-group').find('.empty').remove();
    selector.closest('.form-group').append("<p class='empty'>" + str + "</p>");
    return;
  }

  $("input[name='contact[phone1]'], input[name='contact[phone2]']")
    .on("change",function(){
      var phonenumber = $(this).val()
      var num = phonenumber.replace(/[^\d]/g, '');

      if(num.length == 10){
        $(this).val(num.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"))
      }
  })//format the phone number if valid


  $('.submit-registration').on("click",function(e){
    
    var birthdayMessage = 'Please fill out your birthday.';
    var birthdayMonthSel = $('select[name="public_data[dob]"]');
    var birthdayDaySel = $('input[name="birthday-day"]');
    var birthdayYearSel = $('input[name="birthday-year"]');
    var birthdayMonth = Number(birthdayMonthSel.val());
    var birthdayDay = Number(birthdayDaySel.val());
    var birthdayYear = Number(birthdayYearSel.val());
    var birthdayDate = birthdayYear + '-' + birthdayMonth + '-' + birthdayDay;
    


    $('input[name="public_data[date_of_birth]"]').val(birthdayDate);

    if (birthdayDay === 0) notRightFunc(birthdayMessage, birthdayDaySel);
    if (birthdayMonth === 0) notRightFunc(birthdayMessage, birthdayMonthSel);
    if (birthdayYear === 0) notRightFunc(birthdayMessage, birthdayYearSel);



    if ($('input[name="contact[passport]"]:checked').val() === 'Yes'){
      var passportMessage = "Please fill out your passport expiration date.";
      var passportMonthSel = $('select[name="contact[passport_exp]"]');
      var passportDaySel = $('input[name="passport-day"]');
      var passportYearSel = $('input[name="passport-year"]');
      var passportMonth = Number(passportMonthSel.val());
      var passportDay = Number(passportDaySel.val());
      var passportYear = Number(passportYearSel.val());
      if (passportDay === 0 ) notRightFunc(passportMessage, passportDaySel);
      if (passportMonth === 0) notRightFunc(passportMessage, passportMonthSel);
      if (passportYear === 0) notRightFunc(passportMessage, passportYearSel);
      
      var passportDate = (passportYear + '-' + passportMonth + '-' + passportDay);
      $('input[name="contact[passport_expiration]"]').val(passportDate);
    }
  });
});
