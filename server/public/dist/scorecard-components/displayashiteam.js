import {plus} from './callbacks/plus';
import {minus} from './callbacks/minus';
import {checkbox} from './callbacks/checkbox';
import {playersTemplate} from './templates/playerstemplate';
import {goaliesTemplate} from './templates/goaliestemplate';
import {teamTemplate} from './templates/teamtemplate';

export function displayAshiTeam(location, team, playersArr, goaliesArr){
  var i;
  var playersHtml = _.template(playersTemplate)({'players': playersArr, 'location': location})
  $("." + location).html(playersHtml);

  var goaliesHtml = _.template(goaliesTemplate)({'goalies': goaliesArr, 'location': location});
  $("." + location).append(goaliesHtml);
  for (i = 0; i <= 60; i++){
    $('.goalie-min-dropdown').append($('<option></option>').val(i).html(i));
  }

  var teamHtml = _.template(teamTemplate)({'location': location});
  $("." + location).append(teamHtml);

  $('.minus, .plus, :checkbox').off();
  $('.plus').on('click', plus);
  $('.minus').on('click', minus);
  $(':checkbox').change(checkbox);
}
