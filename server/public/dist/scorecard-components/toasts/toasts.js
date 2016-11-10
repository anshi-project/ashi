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

export var toasts = {
  selectPlayers: selectPlayers,
  resetScorecard: resetScorecard,
  notStoredInDb: notStoredInDb,
  storedInDb: storedInDb,
  selectOpponent: selectOpponent
};
