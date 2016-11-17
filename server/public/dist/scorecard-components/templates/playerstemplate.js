export var playersTemplate = `
  <table class='<%=location%>-playersTable' id='ashi-team'>
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
      <th><bold>SOG</bold></th>
      <th><bold>SOM</bold></th>
    </tr>
    </thead>
    <tbody>
    <% _.each(players, function(player) { %>
        <tr class="playing">
          <td class="select-player"><input type="checkbox" checked></td>
          <td class='player-number'><%=player.team.jersey_number%></td>
          <td class='name'><%=player.lastname%></td>
          <td class='goals'><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td class='assists'><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td class='points'>0</td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
          <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
        </tr>
    <% }) %>
    </tbody>
  </table>`
