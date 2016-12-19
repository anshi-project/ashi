import {displayBlankTeam} from '../displayblankteam';
import {displayAshiTeam} from '../displayashiteam';
import {fillOutScorecard} from '../fillOutScorecard';
import {toasts} from '../toasts/toasts';
var homeDropDownVal = "Select Home team";
var roadDropDownVal = "Select Road team";

export function teamSelect (loc, teamName, edit, stats, blank){
  var self = this;
  var prevHomeDropDownVal;
  var prevRoadDropDownVal ;
  var dropDownVal;
  var location;
  var ashiLoc;
  var opponentLoc;

  if (edit){
    $('textarea').val('');
    $('textarea').val(stats.gameNotes);
    prevHomeDropDownVal = $('#home-dropdown').val();
    prevRoadDropDownVal = $('#road-dropdown').val();
    dropDownVal = blank? 'blank scorecard': teamName;
    location = loc;
    if (location === 'home') {
     prevHomeDropDownVal = homeDropDownVal;
     homeDropDownVal = dropDownVal;
    } else {
     prevRoadDropDownVal = roadDropDownVal;
     roadDropDownVal = dropDownVal;
    }
    if (!blank){
      ashiLoc = loc;
      opponentLoc = ashiLoc === 'home'? 'road': 'home';
    }
  } else {
      dropDownVal = this.value;
      if (dropDownVal === "") return;
      // if ($('#road-dropdown').val() === $('#home-dropdown').val()) {
      //   toasts.selectOpponent();
      //   return;
      // }
      location = $(this).attr("id").replace("-dropdown","");
      if (location === 'home') {
       prevHomeDropDownVal = homeDropDownVal;
       homeDropDownVal = dropDownVal;
      } else {
       prevRoadDropDownVal = roadDropDownVal;
       roadDropDownVal = dropDownVal;
      }
  }

  if (dropDownVal === 'blank scorecard') {
   $('.' + location + '-team-name').text(location + ' team:')
   $('.' + location + '-name-input').html('<input type="text" maxlength="30" class="team-name-input">');
   $('.' + location + '-name-input').children().val(teamName);
   $('.' + location + '-team-name').css({'display':'inline-block', 'margin-left' : '13.5em'});
   displayBlankTeam(location);
   $('#' + location + '-dropdown').css('margin-bottom', '-1.15em');
   return;
  }
  $('.' + location + '-name-input').empty();
  var home_game = location === 'home'? true: false;
  $('.home-game').text(home_game);
  if ( (location === 'home' && prevHomeDropDownVal === 'blank scorecard') ||
      (location === 'road' && prevRoadDropDownVal === 'blank scorecard') )  {
       $('.' + location).css('margin-top', '1.5em');
  }
  $('.' + location + '-name-input').children().hide();
  localforage.getItem('teamData', function(err, teamData){
    if (edit){
      var team = teamData.filter(v => {return v.name === teamName})[0];
    } else {
      var team = teamData.filter(v => {return v.key === $(self).val()})[0];
    }
    $('.' + location + '-team-name').html(location + ' team: ' + team.name );
    $('.ashi-team-name').text(team.name);
   var playersArr = team.players

   
   displayAshiTeam(location, team, playersArr);

   if (edit) {
     fillOutScorecard('.' + ashiLoc + '-playersTable', stats.ashi_players);
     fillOutScorecard('.' + ashiLoc + '-goaliesTable', stats.ashi_goalies);
     fillOutScorecard('.' + ashiLoc + '-team-stats', stats.ashi_team);
     fillOutScorecard('.' + opponentLoc + '-playersTable', stats.opponent_players);
     fillOutScorecard('.' + opponentLoc + '-goaliesTable', stats.opponent_goalies);
     fillOutScorecard('.' + opponentLoc + '-team-stats', stats.opponent_team);
   }
  });
};
