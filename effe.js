function toggleFormField(expMonth, expDay, expYear, condition) {
  if (condition) {
    expMonth.attr("required", false).attr("disabled", true).parent().css("opacity", ".8");
    expDay.attr("required", false).attr("disabled", true).parent().css("opacity", ".8");
    expYear.attr("required", false).attr("disabled", true).parent().css("opacity", ".8");
  } else {
    expMonth.attr("required", true).attr("disabled", false).parent().css("opacity", "1");
    expDay.attr("required", true).attr("disabled", false).parent().css("opacity", "1");
    expYear.attr("required", true).attr("disabled", false).parent().css("opacity", "1");
  }
}
