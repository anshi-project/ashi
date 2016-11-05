(function(){
  var ashiTeamName;
  var teamData;
  var formData;
  var home_game;
  var homeDropDownVal = "";
  var roadDropDownVal = "";
  var prevHomeDropDownVal;
  var prevRoadDropDownVal;
  var date;
  var season;
  var ashiResult;
  var opponentResult;

  toastr.options = {
    "preventDuplicates": true,
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "9999999999",
    "extendedTimeOut": "9999999999",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  require(['playerstemplate', 'goaliestemplate', 'teamtemplate', 'blanktemplate', 'savedgamestemplate'],
    function(playersTemplate, goaliesTemplate, teamTemplate, blankTemplate, savedGamesTemplate){

      function plus(){
        if ($(this).attr('class') === 'plus active'){
          var num = Number( $(this).prev().text() ) + 1;
          $(this).prev().text(num);
        }
      }

      function minus(){
        if ($(this).attr('class') === 'minus active'){
          var num = Number( $(this).next().text() ) -1;
          if (num >= 0){
            $(this).next().text(num);
          }
        }
      }

      function checkbox(){
        $(this).parents('tr').toggleClass('playing').toggleClass('not-playing');
        $(this).parent('td').siblings('td').children('.minus, .plus').toggleClass('active');
      }

      function displayBlankTeam(location){
        var blankHtml = _.template(blankTemplate)({'location': location});
        $("." + location).html(blankHtml);
        for (i = 0; i <= 60; i++){
          $('.goalie-opp-min-dropdown').append($('<option></option>').val(i).html(i));
        }
        $('.minus, .plus, :checkbox').off();
        $('.plus').on('click', plus);
        $('.minus').on('click', minus);
        $(':checkbox').change(checkbox);
      }

      function displayTeam(location, team, playersArr, goaliesArr){
        var playersHtml = _.template(playersTemplate)({'players': playersArr, 'location': location})
        $("." + location).html(playersHtml);

        var goaliesHtml = _.template(goaliesTemplate)({'goalies': goaliesArr, 'location': location});
        $("." + location).append(goaliesHtml);
        for (i = 0; i <= 60; i++){
          $('.goalie-min-dropdown').append($('<option></option>').val(i).html(i));
        }

        var teamHtml = _.template(teamTemplate)({'location': location});
        $("." + location).append(teamHtml);

        $('.minus, .plus, :checkbox').off();
        $('.plus').on('click', plus);
        $('.minus').on('click', minus);
        $(':checkbox').change(checkbox);
      }

      function displaySavedGames (savedGames){
        $('.send-to-server, .delete-game').off();
        $('.saved-games').empty();
        var savedGamesHtml = _.template(savedGamesTemplate)({'savedgames': savedGames})
        $(".saved-games").html(savedGamesHtml);

        $('.send-to-server').on('click', function(){
            var savedGameArr = ($(this).next().text()).split(',');
            sendSavedGame(savedGameArr);
        })

        $('.delete-game').on('click', function(){
          $('.confirm-delete-game').off();
          var savedGameArr = ($(this).next().text()).split(',');
          toastr.warning("Delete game on local drive?<br /><br /><button type='button' class='confirm-delete-game btn btn-danger'>Yes</button>")
          $('.confirm-delete-game').on('click', function(){
            deleteSavedGame(savedGameArr);
          });
        });
      }

     $("#road-dropdown, #home-dropdown").on("change", function() {
        var dropDownVal = this.value;
        if (dropDownVal === "") return;
        if ($('#road-dropdown').val() === $('#home-dropdown').val()) {
            toastr.error('Select the opposing team');
            return;
        }
        var location = $(this).attr("id").replace("-dropdown","");
        if (location === 'home') {
          prevHomeDropDownVal = homeDropDownVal;
          homeDropDownVal = dropDownVal;
        } else {
          prevRoadDropDownVal = roadDropDownVal;
          roadDropDownVal = dropDownVal;
        }
        if (dropDownVal === 'blank score card') {
          $('.' + location + '-team-name').text(location + ' team:')
          $('.' + location + '-name-input').html('<input type="text" maxlength="30" class="team-name-input">');
          $('.' + location + '-team-name').css({'display':'inline-block', 'margin-left' : '4em'});
          displayBlankTeam(location);
          $('#' + location + '-dropdown').css('margin-bottom', '-1.15em');
          return;
        }
        $('.' + location + '-name-input').empty();
        home_game = location === 'home'? true: false;
        if ( (location === 'home' && prevHomeDropDownVal === 'blank score card') ||
             (location === 'road' && prevRoadDropDownVal === 'blank score card') )  {
              $('.' + location).css('margin-top', '1.6em');
        }
        $('.' + location + '-name-input').children().hide();
        var team = teamData.filter(v => {return v.key === $(this).val()})[0];
        ashiTeamName = team.name
        $('.' + location + '-team-name').html(location + ' team: ' + team.name );
        var playersArr = team.players
        var goaliesArr = team.goalies;
        displayTeam(location, team, playersArr, goaliesArr);
     });

     $(".lock-unlock-scorecard").on('click', function(){
        if ($(this).text() === "Safe mode"){
            $('.controls').hide();
            $(this).text('Leave safe mode');
            $(this).css('background-color', 'red');
        } else {
            $('.controls').show();
            $(this).text('Safe mode');
            $(this).css('background-color', 'green');
        }
      });

     function getStats(tableClass) {
      var arr = [];
      $(tableClass).find('> tbody tr.playing').each(function(){
        var stat;
        $tds = $(this).find('td');
        $.each($tds, function(index){
          if (index === 3 && (tableClass === '.home-goaliesTable' || tableClass === '.road-goaliesTable')){
            stat = $(this).children().val();
            arr.push(parseInt(stat, 10));
            return;
          }
          if ((index === 1 || index === 2 ) && ($(tableClass).hasClass('blank-table'))){
            stat = $(this).children().val();
            arr.push(stat);
            if (stat === '') {
              incompleteScorecard = true;
            }
            return;
          }
          stat = $(this).text();
          if ((index === 1 || index === 2 ) && (tableClass !== '.home-team-stats') &&
              (tableClass !== '.road-team-stats')){
            arr.push(stat);
            return;
          }
          if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats'){
            stat = index > 0 ? +stat.replace(/[-+]/g, '') : stat;
            arr.push(stat);
            return;
          } else {
            stat = index > 2 ? +stat.replace(/[-+]/g, '') : stat;
            arr.push(stat);
            return;
          }
        });
      });
      return arr;
     }

     function getPlayerStats(p, opponent, home_game, result){
    	var playersStatsArr = [];
    	while (p.length > 0){
    		var player = {jersey_number: String(p[1]), name: p[2], G: p[3], A: p[4],
    		              P: p[5], PM: p[6], PIM: p[7], PPG: p[8], SHG: p[9],
    		              GWG: p[10], OTG: p[11], SOG: p[12], SOM: p[13], result: result, opponent: opponent,
    		              date: date, season: season, home_game: home_game, team_name: ashiTeamName};
    		playersStatsArr.push(player);
    		p = p.slice(14);
    	}
    	return playersStatsArr;
     }

     function getGoalieStats(g, opponent, home_game, result){
    	var goaliesStatsArr = [];
    	while (g.length > 0){
    		var goalie = {jersey_number: String(g[1]), name: g[2], MIN: g[3], SA: g[4],
    		              SV: g[5], GA: g[6], SO: g[7], G: g[8], A: g[9], P: g[10],
    		              PIM: g[11], SOSh: g[12], SOSa: g[13],
    		              result: result, opponent: opponent, date: date, season: season,
    		              home_game: home_game, team_name: ashiTeamName};
    		goaliesStatsArr.push(goalie);
    		g = g.slice(14);
    	}
    	return goaliesStatsArr;
    }

    function collectGameStats (){
      incompleteScorecard = false;
      formData = {};
      var arr;
      var a;
      var o;
      var opponent = $('.team-name-input').val();
      var gameNotes;
      if ($('#flatpickr').val() === ''){
        toastr.error('Set game date and time before submitting scorecard');
        return 'error';
      } else {
        date = $('#flatpickr').val().split(' ')[0];
        season = date.substr(0, 4);
        var time = $('#flatpickr').val().split(' ')[1];
      }

      if($('.team-name-input').val() === "") {
        toastr.error('Fill out opponent team name');
        return 'error';
      }

      var homeTeamStats = ['.home-playersTable', '.home-goaliesTable', '.home-team-stats'].map(getStats);
      var roadTeamStats = ['.road-playersTable', '.road-goaliesTable', '.road-team-stats'].map(getStats);
      if (incompleteScorecard === true) {
        toastr.error('Fill in jersey number and name for all opponent players and goalies');
        return 'error';
      }
      if (home_game) {
        ap = homeTeamStats[0];
        ag = homeTeamStats[1];
        at = homeTeamStats[2];
        op = roadTeamStats[0];
        og = roadTeamStats[1];
        ot = roadTeamStats[2];
      } else {
        op = homeTeamStats[0];
        og = homeTeamStats[1];
        ot = homeTeamStats[2];
        ap = roadTeamStats[0];
        ag = roadTeamStats[1];
        at = roadTeamStats[2];
      }

      if (at[7] > ot[7]) {
          ashiResult = 'win';
          opponentResult = 'loss'
      }
      if (at[7] === ot[7]) ashiResult = opponentResult = 'tie';
      if (at[7] < ot[7]) {
        ashiResult = 'loss';
        opponentResult = 'win'
      }

      if (ag[4] === 0 || og[4] === 0) {
        toastr.error("Shots Against stat can't be 0");
        return 'error';
      }

      var pkPercAshi = ot[9] > 0 ? (ot[9] - ot[8]) / ot[9] : -999; // -999 means that there where no power play opportunities against.
      var pkPercOpp = at[9] > 0 ? (at[9] - at[8]) / at[9] : -999;
      var ppPercAshi = at[9] > 0? (at[8] / at[9]) : -999;
      var ppPercOpponent = ot[9] > 0 ? (ot[8] / ot[9]) : -999;
      var ashi_player_stats = getPlayerStats(ap, opponent, home_game, ashiResult);
      var ashi_goalie_stats = getGoalieStats(ag, opponent, home_game, ashiResult);
      var ashi_team_stats = {P1_goals: at[1], P2_goals: at[2], P3_goals: at[3],
                             OT: at[4], OT2: ot[5], OT3: ot[6], GF: at[7], GA: ot[7], PPG: at[8], PPO: at[9],
                             PKP: pkPercAshi, result: ashiResult, date: date,
                             home_game: home_game, opponent: opponent, season: season,
                             team_name: ashiTeamName, PPP: ppPercAshi};
      var opponent_player_stats = getPlayerStats(op, ashiTeamName, !home_game, opponentResult);
      var opponent_goalie_stats = getGoalieStats(og, ashiTeamName, !home_game, opponentResult);
      var opponent_team_stats = {P1_goals: ot[1], P2_goals: ot[2], P3_goals: ot[3],
                                 OT: ot[4], OT2: ot[5], OT3: ot[6], GF: ot[7], GA: at[7], PPG: ot[8], PPO: ot[9],
                                 PKP: pkPercOpp, PPP: ppPercOpponent, result: opponentResult,
                                 date: date, home_game: !home_game, opponent: ashiTeamName,
                                 season: season};
      var ashiStats = [ashi_player_stats, ashi_goalie_stats, ashi_team_stats];
      var opponentStats = [opponent_player_stats, opponent_goalie_stats, opponent_team_stats];

      var gameStats = {team_name: ashiTeamName, home_game: home_game, opponent: opponent, date: date, time: time,
                      ashi_players: ashi_player_stats, ashi_goalies: ashi_goalie_stats, ashi_team: ashi_team_stats,
                      opponent_players: opponent_player_stats, opponent_goalies: opponent_goalie_stats,
                      opponent_team: opponent_team_stats, season: season}

      localforage.getItem('ashi-game-notes', function(err, value){
        gameStats.gameNotes = value;
      });

       if (ashi_player_stats.length === 0 || ashi_goalie_stats.length === 0 ||
          opponent_player_stats.length === 0 || opponent_goalie_stats.length === 0){
          toastr.error('select all players and goalies who played');
          return 'error';
       }
       return gameStats;
    }

    $('.save-notes').on('click', function(){
      localforage.removeItem('ashi-game-notes');
      localforage.setItem('ashi-game-notes', $('textarea').val(), function(err){console.log(err)});
    })

    $(".submit-scorecard").on('click', function () {
      var gameStats = collectGameStats();
      if (gameStats === 'error') {
        return;
      }
      $.post('https://ashi-ahstein3521.c9users.io:8081/scorecard', {stats: gameStats}, function(result){
        if (result === 'Game not stored') toastr.error('Game not stored in database, please try again');
        if (result === 'Game stored') toastr.success('Game stored in database');
      });
    });

    $('.save-to-local-disk').on('click', function(){
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
    });

    function deleteSavedGame(arr) {
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

    function sendSavedGame(arr){
      localforage.getItem('ashi-data-store', function(err, v){
          for (var i = 0; i < v.length; i++){
            if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
              && v[i].date === arr[2] && v[i].time === arr[3]){
              $.post('https://ashi-ahstein3521.c9users.io:8081/scorecard', {stats: v[i]}, function(result){
                  if (result === 'Game not stored') toastr.error('Game not stored in database, please try again');
                  if (result === 'Game stored') {
                    toastr.success('Game stored in ASHI database');
                    deleteSavedGame(arr);
                  }
              });
            }
          }
        });
    }

    function displaySavedGames (savedGames){
      $('.send-to-server, .delete-game').off();
      $('.saved-games').empty();
       var savedGamesHtml = _.template(savedGamesTemplate)({'savedgames': savedGames})
      $(".saved-games").html(savedGamesHtml);

      $('.send-to-server').on('click', function(){
          var savedGameArr = ($(this).next().text()).split(',');
          sendSavedGame(savedGameArr);
      })

      $('.delete-game').on('click', function(){
        $('.confirm-delete-game').off();
        var savedGameArr = ($(this).next().text()).split(',');
        toastr.warning("Delete game on local drive?<br /><br /><button type='button' class='confirm-delete-game btn btn-danger'>Yes</button>")
        $('.confirm-delete-game').on('click', function(){
          deleteSavedGame(savedGameArr);
        });
        });
    }

    $('.reset-scorecard').on('click', function(){
      $('.reset-card').off();
      toastr.warning("Wipe the scorecard clean?<br /><br /><button type='button' class='reset-card btn btn-danger'>Yes</button>")
        $('.reset-card').on('click', function(){
          toastr.remove();
          $('#flatpickr').val('').attr('placeholder', 'Set game date and time');
          $('#home-dropdown').val('').attr('placeholder', 'Select Home team');
          $('#road-dropdown').val('').attr('placeholder', 'Select Road team');
          $('.home-team-name, .road-team-name, .home-name-input, .road-name-input, .home, .road').empty();
      });
    });

    function teamFun (data){
        teamData = data;
    }

    flatpickr('#flatpickr', {enableTime: true, allowInput: true});


    $.get('/players', teamFun);

    localforage.getItem('ashi-data-store', function(err, savedGames){
      if (savedGames !== null){
        displaySavedGames(savedGames);
      }
    });

    toastr.info('Only select players and goalies who are playing by ticking the box next to their jersey number.',
              'Use the score card in "Safe mode" after you have configured it.');
    toastr.options.positionClass = "toast-top-center";
  });
}());
