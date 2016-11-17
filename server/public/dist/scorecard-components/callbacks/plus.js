export function plus(){
  var num;
  if ($(this).attr('class') === 'plus active'){
    num = Number( $(this).prev().text() ) + 1;
    $(this).prev().text(num);
  } else {
    return;
  }

  if ($(this).parent().hasClass('goals') || $(this).parent().hasClass('assists')){
    num = Number($(this).parent().siblings('.points').text()) + 1;
    $(this).parent().siblings('.points').text(num);
    return;
  }
  if ($(this).parent().hasClass('shots-against')){
    console.log('effe')
    num = Number($(this).parent().siblings('.goals-against').text()) + 1;
    $(this).parent().siblings('.goals-against').text(num);
    return;
  }
  if ($(this).parent().hasClass('saves')){
    num = Number($(this).parent().siblings('.goals-against').text()) - 1;
    $(this).parent().siblings('.goals-against').text(num);
    return;
  }
}
