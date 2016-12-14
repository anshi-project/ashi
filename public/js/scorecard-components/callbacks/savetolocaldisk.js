import {displaySavedGames} from '../displaysavedgames';
import {collectGameStats} from '../collectgamestats';

export function saveToLocalDisk (){
  var val;
  var gameStats = collectGameStats();
  if (gameStats === 'error') {
    return;
  }
  localforage.getItem('ashi-data-store', function(err, value) {
    if(err){};
    val = value;
    if (value === null) {
      localforage.setItem('ashi-data-store', [gameStats], function(err){console.log(err)});
      displaySavedGames([gameStats]);
      return;
    }
    for (var i = 0; i < value.length; i++){
      if (_.isEqual(value[i], gameStats)) {
        return;
      }
    }
    val.push(gameStats);
    localforage.removeItem('ashi-data-store', function(err){console.log(err)});
    localforage.setItem('ashi-data-store', val, function(err){console.log(err)});
    displaySavedGames(val);
  });
}
