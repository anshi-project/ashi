import {blankTemplate} from './templates/blanktemplate';
import {plus} from './callbacks/plus';
import {minus} from './callbacks/minus';
import {checkbox} from './callbacks/checkbox';

export function displayBlankTeam(location){
  var i;
  var blankHtml = _.template(blankTemplate)({'location': location});
  $("." + location).html(blankHtml);
  for (i = 0; i <= 60; i++){
    $('.goalie-opp-min-dropdown').append($('<option></option>').val(i).html(i));
  }
  $('.minus, .plus, :checkbox').off();
  $('.plus').on('click', plus);
  $('.minus').on('click', minus);
  $(':checkbox').change(checkbox);
}
