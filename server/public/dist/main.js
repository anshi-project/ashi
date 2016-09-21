(function(){
    var teamData;
    
    var templ = `<table>
                      <tr>
                        <th></th>
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
            $(this).closest('tr').remove();
        })
    }
    
    $(".away-dropdown, .home-dropdown").on("change", function(){
        var value = this.value;
        var team = teamData[value].name;
        var location=$(this).attr("class").replace("-dropdown","");//home or away
        if (value !== ""){
            playersArr = teamData[value].players;
            displayTeam(location, team, playersArr);
        }
    });
    
    function teamFun (data){
        teamData = data;
    }
    
    $.get('/players', teamFun)


}());

//populate home or away team 
        // var html="<hr><div class='container'><h2>"+location +" : "+team +"</h2><ul class='list-group'>";
        
        // playersArr.forEach(function(player){
        //     html+="<li class='list-group-item'>"+player.firstname+" "+player.lastname+"</li>"
        // })
        // html+="</ul></div>";
        // $("."+location).html(html);