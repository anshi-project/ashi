import {displaySavedGames} from './displaysavedgames';

export function deleteSavedGame(arr) {
    localforage.getItem('ashi-data-store', function(err, v){
      for (var i = 0; i < v.length; i++){
        if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
          && v[i].date === arr[2] && v[i].time === arr[3]){
          v.splice(i, 1);
          localforage.removeItem('ashi-data-store', function(err){
              if (v.length !== 0){
                localforage.setItem('ashi-data-store', v, function(err){
                  displaySavedGames(v);
                });
              } else {
                $('.saved-games').empty();
              }
          });
        }
      }
    });
}
