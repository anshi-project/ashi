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
                        <th><bold>PPG</bold></th>
                        <th><bold>SHG</bold></th>
                        <th><bold>GWG</bold></th>
                        <th><bold>OTG</bold></th>
                      </tr>
                      </thead>
                      <tbody>
                      <% _.each(players, function(player) { %>
                          <tr class="not-playing">
                            <td class="select-player"><input type="checkbox"></td>
                            <td class='player-number'><%=player.team.jersey_number%></td>
                            <td class='name'><%=player.registration.public_data.lastname%></td>
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

define('playerstemplate', function(){
    return playersTemplate;
})