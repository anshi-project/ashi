export function checkbox(){
  $(this).parents('tr').toggleClass('playing').toggleClass('not-playing');
  $(this).parent('td').siblings('td').children('.minus, .plus').toggleClass('active');
}
