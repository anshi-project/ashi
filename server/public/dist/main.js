(function(){
    var teamData;
    
    var templ = `<table>
                      <tr>
                        <th class='remove-player'></th>
                        <th class='player-number'><bold>#</bold></th>
                        <th class='name'><bold>Name</bold></th>
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
                      <% _.each(players, function(player) { %>
                          <tr>
                            <td class='remove-player'>X</td>
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
                </table>`
                
   
    
    function displayTeam(location, team, playersArr){
        var teamHtml = _.template(templ)({'players': playersArr})
        $("." + location).html(teamHtml);
        
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
        
        $('.remove-player').on('click', function (){
            $(this).closest('tr').hide();
        })
    }
    
    $("#road-dropdown, #home-dropdown").on("change", function(){
        var value = this.value;
        if (value === "") return;
        if ($('#road-dropdown').val() === $('#home-dropdown').val()) {
            alert('Select the opposing team');
            return;
        }
        var team = teamData[value].name;
        var location = $(this).attr("id").replace("-dropdown","");//home or road
        $('.' + location + '-team-name').html(location + ' team: ' + team );
        playersArr = teamData[value].players;
        displayTeam(location, team, playersArr);
        
    });
    
    $(".lock-unlock-scorecard").on('click', function(){
        if ($(this).text() === "Lock controls"){
            $('.remove-player').hide();
            $(this).text('Unlock controls');
            $('.dropdown-boxes').hide();
            $(this).css('background-color', 'green');
            $('.show-all-players').hide();
        } else {
            $('.remove-player').show();
            $(this).text('Lock controls');
            $('.dropdown-boxes').show();
            $(this).css('background-color', 'red');
            $('.show-all-players').show();
        }
    })
    
    $(".show-all-players").on('click', function(){
        $('tr').show();
    });
    
    function teamFun (data){
        teamData = data;
    }
    
    $.get('/players', teamFun)


}());

//populate home or road team 
        // var html="<hr><div class='container'><h2>"+location +" : "+team +"</h2><ul class='list-group'>";
        
        // playersArr.forEach(function(player){
        //     html+="<li class='list-group-item'>"+player.firstname+" "+player.lastname+"</li>"
        // })
        // html+="</ul></div>";
        // $("."+location).html(html);