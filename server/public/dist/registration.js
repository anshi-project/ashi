function today() {
  var d = new Date();
  var dd = d.getDate();
  var mm = d.getMonth() + 1;
  var yyyy = d.getFullYear();

  [dd, mm].forEach(v => {
    if (v < 10) return "0" + v
  });

  return yyyy + '-' + mm + '-' + dd;
};

function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
} //http://stackoverflow.com/questions/4060004/calculate-age-in-javascript

function toggleFormField(element, condition) {
  if (condition) {
    element.attr("required", false).attr("disabled", true).parent().css("opacity", ".8");
  } else {
    element.attr("required", true).attr("disabled", false).parent().css("opacity", "1");
  }
}

$(window).on("load", function() {
  $(".loader").fadeOut(1000);
})



$(function() {

  var $sections = $('.form-section');

  function navigateTo(index) {
    // Mark the current section with the class 'current'
    $sections
      .removeClass('current')
      .eq(index)
      .addClass('current');
    // Show only the navigation buttons that make sense for the current section:
    $('.form-navigation .previous').toggle(index > 0);
    var atTheEnd = index >= $sections.length - 1;
    $('.form-navigation .next').toggle(!atTheEnd);
    $('.form-navigation [type=submit]').toggle(atTheEnd);
  }

  function curIndex() {
    // Return the current index by looking at which section has the class 'current'
    return $sections.index($sections.filter('.current'));
  }

  $('.form-navigation .previous').click(function() {
    navigateTo(curIndex() - 1);
  });

  $('.form-navigation .next').click(function() {
    if ($('#registration-form').parsley().validate({
        group: 'block-' + curIndex()
      }))
      navigateTo(curIndex() + 1);
  });

  // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
  $sections.each(function(index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
  });
  navigateTo(0); // Start at the beginning

  $("input[name='contact[passport]']").on("change", function() {
    var passport = $(this).val();
    var expDate = $("input[name='contact[passport_expiration]']")
    var condition = (passport == "No");
    toggleFormField(expDate, condition);
  })

  $(".phone-field").on("input", function(e) {
    var number = $(this).val().replace(/[^\d]/g, '');

    if (number.length == 3) {
      number = number.replace(/(\d{3})/, "($1) ")
    } else if (number.length == 7) {
      number = number.replace(/(\d{3})(\d{4})/, "($1) $2");
    } else if (number.length == 10) {
      number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    $(this).val(number)
  });

$("input[required='false']").attr("required",false);

$("input[type='number'], select").css("width","100px")

  $("input[name='public_data[date_of_birth]']").on("change", function() {
    var bday = $(this).val().replace("02-29", "02-28");
    var age = calculateAge(new Date(bday));
    var guardian = $("input[name='contact[private_data][guardian_name]'],input[name='contact[private_data][guardian_number]']");
    guardian.text("N/A");
    var condition = (age >= 18 && age < 100);

    toggleFormField(guardian, condition);

  })

})