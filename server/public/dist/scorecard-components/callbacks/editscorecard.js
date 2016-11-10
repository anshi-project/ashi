import {deleteSavedGame} from '../deletesavedgame';
import {teamSelect} from './teamselect';

export function editScorecard (){
  var edit = true;
  var arr = ($(this).siblings('.game-details')).text().split(',');
  localforage.getItem('ashi-data-store', function(err, v){

      for (var i = 0; i < v.length; i++){
        if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
          && v[i].date === arr[2] && v[i].time === arr[3]){
            var stats = v[i];
            var homeGame = stats.home_game === 'true'? true: false;
            var ashiLocation = homeGame? 'home': 'road';
            var opponentLocation = homeGame? 'road': 'home';
            $('#flatpickr').val(stats.date + ' ' + stats.time);
            var selAshi = homeGame? '#home-dropdown': '#road-dropdown';
            var selOpponent = homeGame? '#road-dropdown': '#home-dropdown';
            $("select" + selAshi + " option")
              .filter(function() {
                return $(this).text() === stats.team_name;
              })
              .prop('selected', true);
            $("select" + selOpponent + " option")
              .filter(function() {
                return $(this).text() === 'blank scorecard';
              })
              .prop('selected', true);
            teamSelect(opponentLocation, stats.opponent, edit, stats, true);
            teamSelect(ashiLocation, stats.team_name, edit, stats, false);
            deleteSavedGame(arr);
        }
      }
  });
}
