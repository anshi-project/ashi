import {displayAshiTeam} from '../displayashiteam';

export function getTeamData (err, teamData){
  var team = teamData.filter(v => {return v.key === $(self).val()})[0];
  $('.ashi-team-name').text(team.name);
  $('.' + location + '-team-name').html(location + ' team: ' + team.name );
  var playersArr = team.players

  
  displayAshiTeam(location, team, playersArr);

};
