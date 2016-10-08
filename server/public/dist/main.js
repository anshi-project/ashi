(function(){
  var ashiTeamName;
    var teamData;
    var formData;
    var home_game;
    var homeDropDownVal = "";
    var roadDropDownVal = "";
    var prevHomeDropDownVal;
    var prevRoadDropDownVal;

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
                            <td class='player-number'>0</td>
                            <td class='name'><%=player.firstname + ' ' + player.lastname%></td>
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
                                    <td class='goalie-number'>0</td>
                                    <td class='name'><%=goalie.firstname + ' ' + goalie.lastname%></td>
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
                                    <td class="select-player"><input type="checkbox"></td>
                                    <td class='player-number-blank'><input type='text' maxlength="2" size="2"></td>
                                    <td class='player-name-blank'><input type='text' maxlength='30'></td>
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
                          <table class='<%=location%>-goaliesTable'>
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
                                                        <td class="select-player"><input type="checkbox"></td>
                                                        <td class='player-number-blank'><input type='text' maxlength="2" size="2"></td>
                                                        <td><input class='goalie-name-blank' type='text' maxlength='30'></td>
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
          stat = $(this).text();
          if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats'){
            stat = index > 0 ? +stat.replace(/[-+]/g, '') : stat;
          } else {
            stat = index > 2 ? +stat.replace(/[-+]/g, '') : stat;
          }
          arr.push(stat);
        });
      });
      return arr;
    }

    $(".submit-scorecard").on('click', function () {
      formData = {};
      var arr;
      var a;
      var o;
      var opponent = $('.team-name-input').val();
      var date = $('.date').children().first().val();
      var time = $('.time').children().first().val();
      // if (date === 'Select game date' || time === 'Select game start time'){
      //   alert('select game date and time before submitting scorecard');
      //   return;
      // }
      // else {
      var homeTeamStats = ['.home-playersTable', '.home-goaliesTable', '.home-team-stats'].map(getStats);
      var roadTeamStats = ['.road-playersTable', '.road-goaliesTable', '.road-team-stats'].map(getStats);
      if (home_game) {
        a = homeTeamStats[2];
        o = roadTeamStats[2];
      } else {
        a = roadTeamStats[2];
        o = homeTeamStats[2];
      }
      var ashi_team_stats = {Q1_goals: a[1], Q2_goals: a[2], Q3_goals: a[3], OT: a[4], FS: a[5], PA: a[6], SO: a[7]};
      var opponent_stats = {Q1_goals: o[1], Q2_goals: o[2], Q3_goals: o[3], OT: o[4], FS: o[5], PA: o[6], SO: o[7]};
      var gameStats = {home_game: home_game, opponent: opponent, date: date, time: time,
                       ashi_team_stats: ashi_team_stats, opponent_stats: opponent_stats};
      console.log({teamName: ashiTeamName, stats: gameStats});
      $.post('https://ashi-ahstein3521.c9users.io:8081/scorecard', {data: {teamName: ashiTeamName, stats: gameStats}});
    //  } close else
  });


    function teamFun (data){
        teamData = data;
    }

    $('.show-all-players').hide();
    $('.datepicker').datepicker();
    $('.clockpicker').clockpicker(({donetext: 'Done'})).children().first().val('Select game start time');

    $.get('/players', teamFun)


}());



// (function(){
//     var teamData;
//     var formData;
//     var homeDropDownVal = "";
//     var roadDropDownVal = "";
//     var prevHomeDropDownVal;
//     var prevRoadDropDownVal;
//     var playersTemplate = `<table class='<%=location%>-playersTable'>
//                       <thead>
//                       <tr>
//                         <th class='select-player'></th>
//                         <th class='player-number'><bold>#</bold></th>
//                         <th class='name'><bold>Player</bold></th>
//                         <th><bold>G</bold></th>
//                         <th><bold>A</bold></th>
//                         <th><bold>P</bold></th>
//                         <th><bold>+-</bold></th>
//                         <th><bold>PIM</bold></th>
//                         <th><bold>SOG</bold></th>
//                         <th><bold>GWG</bold></th>
//                         <th><bold>PP</bold></th>
//                         <th><bold>SH</bold></th>
//                       </tr>
//                       </thead>
//                       <tbody>
//                       <% _.each(players, function(player) { %>
//                           <tr>
//                             <td class="select-player"><input type="checkbox"></td>
//                             <td class='player-number'>0</td>
//                             <td class='name'><%=player.registration.public_data.firstname + ' ' + player.registration.public_data.lastname%></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                           </tr>
//                       <% }) %>
//                       </tbody>
//                 </table>`

//       var goaliesTemplate = `<table class='<%=location%>-goaliesTable'>
//                               <thead>
//                                 <tr>
//                                   <th class='select-player'></th>
//                                   <th class='goalie-number'><bold>#</bold></th>
//                                   <th class='name'><bold>Goal tender</bold></th>
//                                   <th><bold>MIN</bold></th>
//                                   <th><bold>SA</bold></th>
//                                   <th><bold>SV</bold></th>
//                                   <th><bold>GA</bold></th>
//                                   <th><bold>SO</bold></th>
//                                   <th><bold>G</bold></th>
//                                   <th><bold>A</bold></th>
//                                   <th><bold>PIM</bold></th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                               <% _.each(goalies, function(goalie) { %>
//                                   <tr>
//                                     <td class="select-player"><input type="checkbox"></td>
//                                     <td class='goalie-number'>0</td>
//                                     <td class='name'><%=goalie.registration.public_data.firstname + ' ' + goalie.registration.public_data.lastname%></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                   </tr>
//                               <% }) %>
//                               </tbody>
//                             </table>`

//   var teamTemplate = `      <div class="row">
//                         			<div class="col-sm-6">
//                         				<table class="<%=location%>-team-stats">
//                                   <thead>
//                           					<tr>
//                           						<th ><div class='team-stats-header'><bold>Team Stats</bold></div></th>
//                                       <th><bold>Q1</bold></th>
//                                       <th><bold>Q2</bold></th>
//                                       <th><bold>Q3</bold></th>
//                           						<th><bold>OT</bold></th>
//                                       <th><bold>FS</bold></th>
//                                       <th><bold>PA</bold></th>
//                           						<th><bold>SO</bold></th>
//                           					</tr>
//                                   </thead>
//                                   <tbody>
//                           					<tr class='playing'>
//                                       <td ><div class='team-stats-header'></div></td>
//                                       <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                           						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                           						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                           						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                       <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                       <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                       <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                           					</tr>
//                                   </tbody>
//                         				</table>
//                         			</div>
//                         			<div class="col-sm-6"></div>
//                         		</div>`

//   var blankTemplate = `<table class='<%=location%>-playersTable blank-table'>
//                               <thead>
//                               <tr>
//                                 <th class='select-player'></th>
//                                 <th class='player-number-blank'><bold>#</bold></th>
//                                 <th class='name'><bold>Player</bold></th>
//                                 <th><bold>G</bold></th>
//                                 <th><bold>A</bold></th>
//                                 <th><bold>P</bold></th>
//                                 <th><bold>+-</bold></th>
//                                 <th><bold>PIM</bold></th>
//                                 <th><bold>SOG</bold></th>
//                                 <th><bold>GWG</bold></th>
//                                 <th><bold>PP</bold></th>
//                                 <th><bold>SH</bold></th>
//                               </tr>
//                               </thead>
//                               <tbody>
//                               <% _.each([0,0,0,0,0,0,0,0,0,0,0], function(player) { %>
//                                   <tr>
//                                     <td class="select-player"><input type="checkbox"></td>
//                                     <td class='player-number-blank'><input type='text' maxlength="2" size="2"></td>
//                                     <td class='player-name-blank'><input type='text' maxlength='30'></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                     <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                   </tr>
//                               <% }) %>
//                               </tbody>
//                           </table>
//                           <table class='<%=location%>-goaliesTable'>
//                                                   <thead>
//                                                     <tr>
//                                                       <th class='select-player'></th>
//                                                       <th class='goalie-number'><bold>#</bold></th>
//                                                       <th class='name goalie-name-blank'><bold>Goal tender</bold></th>
//                                                       <th><bold>MIN</bold></th>
//                                                       <th><bold>SA</bold></th>
//                                                       <th><bold>SV</bold></th>
//                                                       <th><bold>GA</bold></th>
//                                                       <th><bold>SO</bold></th>
//                                                       <th><bold>G</bold></th>
//                                                       <th><bold>A</bold></th>
//                                                       <th><bold>PIM</bold></th>
//                                                     </tr>
//                                                   </thead>
//                                                   <tbody>
//                                                   <% _.each([0,0,0], function(goalie) { %>
//                                                       <tr>
//                                                         <td class="select-player"><input type="checkbox"></td>
//                                                         <td class='player-number-blank'><input type='text' maxlength="2" size="2"></td>
//                                                         <td><input class='goalie-name-blank' type='text' maxlength='30'></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                         <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                       </tr>
//                                                   <% }) %>
//                                                   </tbody>
//                                                 </table>
//                                                 <div class="row">
//                                               			<div class="col-sm-6">
//                                               				<table class="<%=location%>-team-stats">
//                                                         <thead>
//                                                 					<tr>
//                                                 						<th ><div class='team-stats-header-blank'><bold>Team Stats</bold></div></th>
//                                                             <th><bold>Q1</bold></th>
//                                                             <th><bold>Q2</bold></th>
//                                                             <th><bold>Q3</bold></th>
//                                                 						<th><bold>OT</bold></th>
//                                                             <th><bold>FS</bold></th>
//                                                             <th><bold>PA</bold></th>
//                                                 						<th><bold>SO</bold></th>
//                                                 					</tr>
//                                                         </thead>
//                                                         <tbody>
//                                                 					<tr class='playing'>
//                                                             <td ><div class='team-stats-header-blank'></div></td>
//                                                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                 						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                 						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                 						<td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                             <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
//                                                 					</tr>
//                                                         </tbody>
//                                               				</table>
//                                               			</div>
//                                               			<div class="col-sm-6"></div>
//                                               		</div>`

//     function displayTeam(blankCard, location, team, playersArr, goaliesArr){
//         if (blankCard) {
//           var blankHtml = _.template(blankTemplate)({'location': location});
//           $("." + location).html(blankHtml);
//           return;
//         }

//         var playersHtml = _.template(playersTemplate)({'players': playersArr, 'location': location})
//         $("." + location).html(playersHtml);

//         var goaliesHtml = _.template(goaliesTemplate)({'goalies': goaliesArr, 'location': location});
//         $("." + location).append(goaliesHtml);

//         var teamHtml = _.template(teamTemplate)({'location': location});
//         $("." + location).append(teamHtml);

//         $('.minus, .plus, .remove-player').off();

//         $('.plus').on('click', function(){
//             var num = Number( $(this).prev().text() ) + 1;
//             $(this).prev().text(num);
//         });

//         $('.minus').on('click', function(){
//             var num = Number( $(this).next().text() ) -1;
//             if (num >= 0){
//               $(this).next().text(num);
//             }
//         });

//         $(':checkbox').change(function(){
//           $(this).closest('tr').toggleClass('playing');
//         });
//     }

//     $("#road-dropdown, #home-dropdown").on("change", function() {
//         var dropDownVal = this.value;
//         if (dropDownVal === "") return;
//         if ($('#road-dropdown').val() === $('#home-dropdown').val()) {
//             alert('Select the opposing team');
//             return;
//         }
//         var location = $(this).attr("id").replace("-dropdown","");
//         if (location === 'home') {
//           prevHomeDropDownVal = homeDropDownVal;
//           homeDropDownVal = dropDownVal;
//         } else {
//           prevRoadDropDownVal = roadDropDownVal;
//           roadDropDownVal = dropDownVal;
//         }
//         if (dropDownVal === 'blank score card') {
//           $('.' + location + '-team-name').text(location + ' team:')
//           $('.' + location + '-name-input').html('<input type="text" maxlength="30" class="team-name-input">');
//           $('.' + location + '-team-name').css({'display':'inline-block', 'margin-left' : '4em'});
//           displayTeam(true, location);
//           $('#' + location + '-dropdown').css('margin-bottom', '-1.15em');
//           return;
//         }
//         if ( (location === 'home' && prevHomeDropDownVal === 'blank score card') ||
//             (location === 'road' && prevRoadDropDownVal === 'blank score card') )  {
//               $('.' + location).css('margin-top', '1.6em');
//         }
//         $('.' + location + '-name-input').children().hide();
//         var team = teamData[dropDownVal].name;
//         $('.' + location + '-team-name').html(location + ' team: ' + team );
//         var playersArr = teamData[dropDownVal].players;
//         var goaliesArr = teamData[dropDownVal].goalies;
//         displayTeam(false, location, team, playersArr, goaliesArr);
//     });

//     $(".lock-unlock-scorecard").on('click', function(){
//         if ($(this).text() === "Lock controls"){
//             $('.controls').hide();
//             $(this).text('Unlock controls');
//             $(this).css('background-color', 'green');
//         } else {
//             $('.controls').show();
//             $(this).text('Lock controls');
//             $(this).css('background-color', 'red');
//         }
//     });

//     function getStats(tableClass) {
//       var arr = [];
//       $(tableClass).find('> tbody tr.playing').each(function(){
//         var stat;
//         $tds = $(this).find('td');
//         $.each($tds, function(index){
//           stat = $(this).text();
//           stat = index > 2 ? +stat.replace(/[-+]/g, '') : stat;
//           arr.push(stat);
//         });
//       });
//       return arr;
//     }

//     $(".submit-scorecard").on('click', function () {
//       formData = {};
//       var arr;
//       var gameDate = $('input').val();
//       if (gameDate === 'Select game date'){
//         alert('select game date before submitting scorecard');
//         return;
//       }
//       else {
//         var homeStats = ['.home-playersTable', '.home-goaliesTable', '.home-team-stats'].map(getStats);
//         console.log('homeStats: ', homeStats);
//         //TODO collect and post score data
//         // $.post('scorecard', {scores: scores});
//       }
//   });


//     function teamFun (data){
//         teamData = data;
//         console.log('teamData', teamData);
//     }

//     $('.show-all-players').hide();
//     $('.datepicker').datepicker();
//     $('.clockpicker').clockpicker(({donetext: 'Done'})).children().first().val('Select game start time');

//     $.get('/players', teamFun)
    
//     $('body').css('font-size', '1.4em');


// }());




