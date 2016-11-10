function selectPlayers(){
  toastr.info(`Only select players and goalies who are playing by ticking the
    box next to their jersey number.`,
    'Use the score card in "Safe mode" after you have configured it.');
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

function selectOpponent(){
  toastr.error('Select the opposing team');
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
                  and/or doesn\'t store browsing history you can\'t
                  save games to your local drive`);
}

export var toasts = {
  selectPlayers: selectPlayers,
  resetScorecard: resetScorecard,
  notStoredInDb: notStoredInDb,
  storedInDb: storedInDb,
  selectOpponent: selectOpponent,
  fillOutBlank: fillOutBlank,
  setDateTime: setDateTime,
  opponentName: opponentName,
  shotsAgainst: shotsAgainst,
  tickBoxes: tickBoxes,
  privateBrowserMode: privateBrowserMode,
};
