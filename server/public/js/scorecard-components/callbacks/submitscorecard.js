import {toasts} from '../toasts/toasts';
import {collectGameStats} from '../collectgamestats';

export function submitScorecard (){
    var gameStats = collectGameStats();
    if (gameStats === 'error') {
      return;
    }
    $.post('http://127.0.0.1:3000/scorecard', {stats: gameStats}, function(result){
      if (result === 'Game not stored') toasts.notStoredInDb();
      if (result === 'Game stored') toasts.storedInDb();
    });
}
