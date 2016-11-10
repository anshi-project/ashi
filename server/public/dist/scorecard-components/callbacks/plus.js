export function plus(){
  if ($(this).attr('class') === 'plus active'){
    var num = Number( $(this).prev().text() ) + 1;
    $(this).prev().text(num);
  }
}
