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
    var season = 2016;

$('#ashi-team').attr('class');

    var playersTemplate = `<table class='<%=location%>-playersTable' id='ashi-team'>
                      <thead>
                      <tr>
                        <th class='select-player'></th>
                        <th class='player-number'><bold>#</bold></th>
                        <th class='name'><bold>Player</bold></th>
                        <th><bold>G</bold></th>
                        <th><bold>A</bold></th>
                        <th><bold>P</bold></th>
                        <th><bold>+-</bold></th>
                        <th><bold>PIM</bold></th>
                        <th><bold>SOG</bold></th>
                        <th><bold>GWG</bold></th>
                        <th><bold>PP</bold></th>
                        <th><bold>SH</bold></th>
                      </tr>
                      </thead>
                      <tbody>
                      <% _.each(players, function(player) { %>
                          <tr>
                            <td class="select-player"><input type="checkbox"></td>
                            <td class='player-number'><%=player.team.jersey_number%></td>
                            <td class='name'><%=player.registration.public_data.firstname + ' ' + player.registration.public_data.lastname%></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          </tr>
                      <% }) %>
                      </tbody>
                </table>`

      var goaliesTemplate = `<table class='<%=location%>-goaliesTable'>
                              <thead>
                                <tr>
                                  <th class='select-player'></th>
                                  <th class='goalie-number'><bold>#</bold></th>
                                  <th class='name'><bold>Goal tender</bold></th>
                                  <th><bold>MIN</bold></th>
                                  <th><bold>SA</bold></th>
                                  <th><bold>SV</bold></th>
                                  <th><bold>GA</bold></th>
                                  <th><bold>SO</bold></th>
                                  <th><bold>G</bold></th>
                                  <th><bold>A</bold></th>
                                  <th><bold>PIM</bold></th>
                                </tr>
                              </thead>
                              <tbody>
                              <% _.each(goalies, function(goalie) { %>
                                  <tr>
                                    <td class="select-player"><input type="checkbox"></td>
                                    <td class='goalie-number'><%=goalie.team.jersey_number%></td>
                                    <td class='name'><%=goalie.registration.public_data.firstname + ' ' + goalie.registration.public_data.lastname%></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  </tr>
                              <% }) %>
                              </tbody>
                            </table>`

  var teamTemplate = `      <div class="row">
                        			<div class="col-sm-6">
                        				<table class="<%=location%>-team-stats">
                                  <thead>
                          					<tr>
                          						<th ><div class='team-stats-header'><bold>Team Stats</bold></div></th>
                                      <th><bold>Q1</bold></th>
                                      <th><bold>Q2</bold></th>
                                      <th><bold>Q3</bold></th>
                          						<th><bold>OT</bold></th>
                                      <th><bold>FS</bold></th>
                                      <th><bold>PA</bold></th>
                          						<th><bold>SO</bold></th>
                          					</tr>
                                  </thead>
                                  <tbody>
                          					<tr class='playing'>
                                      <td ><div class='team-stats-header'></div></td>
                                      <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                      <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                      <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                      <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          					</tr>
                                  </tbody>
                        				</table>
                        			</div>
                        			<div class="col-sm-6"></div>
                        		</div>`

  var blankTemplate = `<table class='<%=location%>-playersTable blank-table'>
                              <thead>
                              <tr>
                                <th class='select-player'></th>
                                <th class='player-number-blank'><bold>#</bold></th>
                                <th class='name'><bold>Player</bold></th>
                                <th><bold>G</bold></th>
                                <th><bold>A</bold></th>
                                <th><bold>P</bold></th>
                                <th><bold>+-</bold></th>
                                <th><bold>PIM</bold></th>
                                <th><bold>SOG</bold></th>
                                <th><bold>GWG</bold></th>
                                <th><bold>PP</bold></th>
                                <th><bold>SH</bold></th>
                              </tr>
                              </thead>
                              <tbody>
                              <% _.each([0,0,0,0,0,0,0,0,0,0,0], function(player) { %>
                                  <tr>
                                    <td class="select-player"><input type="checkbox" class='blank-scorecard'></td>
                                    <td class='player-number-blank'><input type='text' class='blank-scorecard' maxlength="2" size="2"></td>
                                    <td class='player-name-blank'><input type='text' class='blank-scorecard' maxlength='30'></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  </tr>
                              <% }) %>
                              </tbody>
                          </table>
                          <table class='<%=location%>-goaliesTable blank-table'>
                                                  <thead>
                                                    <tr>
                                                      <th class='select-player'></th>
                                                      <th class='goalie-number'><bold>#</bold></th>
                                                      <th class='name goalie-name-blank'><bold>Goal tender</bold></th>
                                                      <th><bold>MIN</bold></th>
                                                      <th><bold>SA</bold></th>
                                                      <th><bold>SV</bold></th>
                                                      <th><bold>GA</bold></th>
                                                      <th><bold>SO</bold></th>
                                                      <th><bold>G</bold></th>
                                                      <th><bold>A</bold></th>
                                                      <th><bold>PIM</bold></th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                  <% _.each([0,0,0], function(goalie) { %>
                                                      <tr>
                                                        <td class ="select-player"><input type="checkbox" class='blank-scorecard'></td>
                                                        <td class ='player-number-blank'><input type='text' class='blank-scorecard' maxlength="2" size = "2"></td>
                                                        <td><input class='goalie-name-blank blank-scorecard type='text' maxlength='30'></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                        <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                      </tr>
                                                  <% }) %>
                                                  </tbody>
                                                </table>
                                                <div class="row">
                                              			<div class="col-sm-6">
                                              				<table class="<%=location%>-team-stats">
                                                        <thead>
                                                					<tr>
                                                						<th ><div class='team-stats-header-blank'><bold>Team Stats</bold></div></th>
                                                            <th><bold>Q1</bold></th>
                                                            <th><bold>Q2</bold></th>
                                                            <th><bold>Q3</bold></th>
                                                						<th><bold>OT</bold></th>
                                                            <th><bold>FS</bold></th>
                                                            <th><bold>PA</bold></th>
                                                						<th><bold>SO</bold></th>
                                                					</tr>
                                                        </thead>
                                                        <tbody>
                                                					<tr class='playing'>
                                                            <td ><div class='team-stats-header-blank'></div></td>
                                                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                                					</tr>
                                                        </tbody>
                                              				</table>
                                              			</div>
                                              			<div class="col-sm-6"></div>
                                              		</div>`

    function displayTeam(blankCard, location, team, playersArr, goaliesArr){
        if (blankCard) {
          var blankHtml = _.template(blankTemplate)({'location': location});
          $("." + location).html(blankHtml);

          $('.minus, .plus, .remove-player').off();

          $('.plus').on('click', function(){
              var num = Number( $(this).prev().text() ) + 1;
              $(this).prev().text(num);
          });
          
          $('.minus').on('click', function(){
            var num = Number( $(this).next().text() ) -1;
            if (num >= 0){
              $(this).next().text(num);
            }
          });
          
          $(':checkbox').change(function(){
          $(this).closest('tr').toggleClass('playing');
          });
          return;
        }

        var playersHtml = _.template(playersTemplate)({'players': playersArr, 'location': location})
        $("." + location).html(playersHtml);

        var goaliesHtml = _.template(goaliesTemplate)({'goalies': goaliesArr, 'location': location});
        $("." + location).append(goaliesHtml);

        var teamHtml = _.template(teamTemplate)({'location': location});
        $("." + location).append(teamHtml);

        $('.minus, .plus, .remove-player').off();

        $('.plus').on('click', function(){
            var num = Number( $(this).prev().text() ) + 1;
            $(this).prev().text(num);
        });

        $('.minus').on('click', function(){
            var num = Number( $(this).next().text() ) -1;
            if (num >= 0){
              $(this).next().text(num);
            }
        });

        $(':checkbox').change(function(){
          $(this).closest('tr').toggleClass('playing');
        });
    }

    $("#road-dropdown, #home-dropdown").on("change", function() {
        var dropDownVal = this.value;
        if (dropDownVal === "") return;
        if ($('#road-dropdown').val() === $('#home-dropdown').val()) {
            alert('Select the opposing team');
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
          displayTeam(true, location);
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
        var team = ashiTeamName = teamData[dropDownVal].name;
        $('.' + location + '-team-name').html(location + ' team: ' + team );
        var playersArr = teamData[dropDownVal].players;
        var goaliesArr = teamData[dropDownVal].goalies;
        displayTeam(false, location, team, playersArr, goaliesArr);
    });

    $(".lock-unlock-scorecard").on('click', function(){
        if ($(this).text() === "Lock controls"){
            $('.controls').hide();
            $(this).text('Unlock controls');
            $(this).css('background-color', 'green');
        } else {
            $('.controls').show();
            $(this).text('Lock controls');
            $(this).css('background-color', 'red');
        }
    });

    function getStats(tableClass) {
      var arr = [];
      $(tableClass).find('> tbody tr.playing').each(function(){
        var stat;
        $tds = $(this).find('td');
        $.each($tds, function(index){
          if ((index === 1 || index === 2 ) && ($(tableClass).hasClass('blank-table'))){
            stat = $(this).children().val();
          } else {
            stat = $(this).text();
          }
          if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats'){
            stat = index > 0 ? +stat.replace(/[-+]/g, '') : stat;
          } else {
            stat = index === 1 || index > 2 ? +stat.replace(/[-+]/g, '') : stat;
          }
          arr.push(stat);
        });
      });
      return arr;
    }
    
    function getPlayerStats(p, opponent, home_game){
    	var playersStatsArr = [];
    	while (p.length > 0){
    		var player = {jersey_number: String(p[1]), full_name: p[2], G: p[3], A: p[4],
    		              P: p[5], PM: p[6], PIM: p[7], SOG: p[8], GWG: p[9],
    		              PP: p[10], SH: p[11], win: true, opponent: opponent,
    		              date: date, season: season, home_game: home_game, team_name: ashiTeamName};
    		playersStatsArr.push(player);
    		p = p.slice(12);
    	}
    	return playersStatsArr;
    }
    
    function getGoalieStats(g, opponent, home_game){
    	var goaliesStatsArr = [];
    	while (g.length > 0){
    		var goalie = {jersey_number: String(g[1]), full_name: g[2], MIN: g[3], SA: g[4],
    		              SV: g[5], GA: g[6], SO: g[7], G: g[8], A: g[9], PIM: g[10],
    		              win: true, opponent: opponent, date: date, season: season,
    		              home_game: home_game}; 
    		goaliesStatsArr.push(goalie);
    		g = g.slice(11);
    	}
    	return goaliesStatsArr;
    }

    $(".submit-scorecard").on('click', function () {
      formData = {};
      var arr;
      var a;
      var o;
      var opponent = $('.team-name-input').val();
      date = $('.date').children().first().val();
      var time = $('.time').children().first().val();
      // if (date === 'Select game date' || time === 'Select game start time'){
      //   alert('select game date and time before submitting scorecard');
      //   return;
      // }
      // else {
        var homeTeamStats = ['.home-playersTable', '.home-goaliesTable', '.home-team-stats'].map(getStats);
        var roadTeamStats = ['.road-playersTable', '.road-goaliesTable', '.road-team-stats'].map(getStats);
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
        
        var ashi_player_stats = getPlayerStats(ap, opponent, home_game);
        var ashi_goalie_stats = getGoalieStats(ag, opponent, home_game);
        var ashi_team_stats = {Q1_goals: at[1], Q2_goals: at[2], Q3_goals: at[3],
                               OT: at[4], FS: at[5], PA: at[6], SO: at[7], 
                               win: true, date: date, home_game: home_game, 
                               opponent: opponent, season: season};
        var opponent_player_stats = getPlayerStats(op, ashiTeamName, !home_game);
        var opponent_goalie_stats = getGoalieStats(og, ashiTeamName, !home_game);
        var opponent_team_stats = {Q1_goals: ot[1], Q2_goals: ot[2], Q3_goals: ot[3],
                                   OT: ot[4], FS: ot[5], PA: ot[6], SO: ot[7], 
                                   win: true, date: date, home_game: !home_game,
                                   opponent: ashiTeamName, season: season};
        var ashiStats = [ashi_player_stats, ashi_goalie_stats, ashi_team_stats];
        var opponentStats = [opponent_player_stats, opponent_goalie_stats, opponent_team_stats];
        
        
        var gameStats = {team_name: ashiTeamName, home_game: home_game, opponent: opponent, date: date, time: time,
                        ashi_players: ashi_player_stats, ashi_goalies: ashi_goalie_stats, ashi_team: ashi_team_stats,
                        opponent_players: opponent_player_stats, opponent_goalies: opponent_goalie_stats,
                        opponent_team: opponent_team_stats, season: season}
        
        console.log(gameStats);
        $.post('https://ashi-ahstein3521.c9users.io:8081/scorecard', {stats: gameStats});
      // } 
  });

    function teamFun (data){
        teamData = data;
        console.log(teamData)
    }

    $('.show-all-players').hide();
    $('.datepicker').datepicker();
    $('.clockpicker').clockpicker(({donetext: 'Done'})).children().first().val('Select game start time');

    $.get('/players', teamFun)
    
    $.get('/effe', function(data){ console.log(data)});

}());


