import {deleteSavedGame} from './deletesavedgame';
import {toasts} from './toasts/toasts';

export function sendSavedGame(arr){
  localforage.getItem('ashi-data-store', function(err, v){
    for (var i = 0; i < v.length; i++){
      if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
        && v[i].date === arr[2] && v[i].time === arr[3]){
          $.ajax({
              type: "POST",
              url: 'http://127.0.0.1:3000/scorecard',
              error: function(){toasts.noServerResponse()},
              success: function(result){
                    if (result === 'Game not stored') toasts.notStoredInDb();
                    if (result === 'Game stored') {
                      toasts.storedInDb();
                      deleteSavedGame(arr);
                    }
              },
              data: {stats: v[i]},
              timeout: 3000,
            });      
      }
    }
    });
}
