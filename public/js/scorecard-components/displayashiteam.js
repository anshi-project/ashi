import {plus} from './callbacks/plus';
import {minus} from './callbacks/minus';
import {checkbox} from './callbacks/checkbox';
import {updatePlayerPoints} from './callbacks/updateplayerpoints';
import {playersTemplate} from './templates/playerstemplate';
import {goaliesTemplate} from './templates/goaliestemplate';
import {teamTemplate} from './templates/teamtemplate';


export function displayAshiTeam(location, team, playersArr){
  var i;
  var player;
  var position;
  var default_players = [];
  var goalies = [];

  for(i = 0; i < playersArr.length; i++){
    player = playersArr[i];
    position = player.team.position;
    if(position.indexOf("Goalie") !=-1) goalies.push(player);
    if(position.indexOf("Goalie") == -1 || position.length > 1) default_players.push(player)
  }

  var playersHtml = _.template(playersTemplate)({'default_players': default_players, 'location': location})
  $("." + location).html(playersHtml);

  var goaliesHtml = _.template(goaliesTemplate)({'goalies': goalies, 'location': location});

  $("." + location).append(goaliesHtml);
  for (i = 0; i <= 60; i++){
    $('.goalie-min-dropdown').append($('<option></option>').val(i).html(i));
  }

  var teamHtml = _.template(teamTemplate)({'location': location});
  $("." + location).append(teamHtml);

  $('.minus, .plus, :checkbox, .goals, .assists').off();
  $('.goals, .assists').change(updatePlayerPoints);
  $('.plus').on('click', plus);
  $('.minus').on('click', minus);
  $(':checkbox').change(checkbox);
}
