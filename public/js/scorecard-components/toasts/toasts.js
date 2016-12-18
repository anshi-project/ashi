import {deleteSavedGame} from '../deletesavedgame.js';

function selectPlayers(){
  toastr.info(`Make sure that only players and goalies who are playing have their checkbox
               (to the left of jersey number) checked`,
    'Use the score card in "Safe mode" (green button on right-hand side) after you have configured it.');
}

function resetScorecard(){
  toastr.warning(`Wipe the scorecard clean?<br /><br /><button type='button'
  class='reset-card btn btn-danger'>Yes</button>`);
}

function notStoredInDb(){
  toastr.error('Game not stored in database, please try again');
}

function storedInDb(){
  toastr.success('Game stored in database')
}

function setDateTime (){
  toastr.error('Set game date and time before submitting scorecard');
}

function fillOutBlank() {
  toastr.error('Fill out jersey number and name for all opponent players and goalies');
}

function opponentName (){
  toastr.error('Fill out opponent team name');
}

function shotsAgainst (){
  toastr.error("Shots Against stat can't be 0");
}

function tickBoxes (){
  toastr.error('select all players and goalies who played');
}

function privateBrowserMode (){
  toastr.warning(`If your browser is in 'private browser mode'
                  and/or doesn't store browsing history you can't
                  save games to your local drive`);
}

function confirmDeleteGame(savedGameArr){
  toastr.warning("Delete game on local drive?<br /><br /><button type='button' class='confirm-delete-game btn btn-danger'>Yes</button>")
  $('.confirm-delete-game')
    .on('click', function() {
      deleteSavedGame(savedGameArr);
    });
}

function goalieMinutes(){
  toastr.warning('the number of minutes a goalie has played should be greater than 0');
}

function noServerResponse(){
  toastr.warning('No response from the ASHI server. Please try to submit later again.');
}

export var toasts = {
  selectPlayers: selectPlayers,
  resetScorecard: resetScorecard,
  notStoredInDb: notStoredInDb,
  storedInDb: storedInDb,
  fillOutBlank: fillOutBlank,
  setDateTime: setDateTime,
  opponentName: opponentName,
  shotsAgainst: shotsAgainst,
  tickBoxes: tickBoxes,
  privateBrowserMode: privateBrowserMode,
  confirmDeleteGame: confirmDeleteGame,
  goalieMinutes: goalieMinutes,
  noServerResponse: noServerResponse,
};
