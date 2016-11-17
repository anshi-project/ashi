export var goaliesTemplate = `
  <table class='<%=location%>-goaliesTable'>
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
        <th><bold>P</bold></th>
        <th><bold>PIM</bold></th>
        <th><bold>SOSh</bold></th>
        <th><bold>SOSa</bold></th>
      </tr>
    </thead>
    <tbody>
    <% _.each(goalies, function(goalie) { %>
      <tr class="playing">
        <td class="select-player"><input type="checkbox" checked></td>
        <td class='goalie-number'><%=goalie.team.jersey_number%></td>
        <td class='name'><%=goalie.lastname%></td>
        <td><select class='goalie-min-dropdown minutes'></select></td>
        <td class='shots-against'><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
        <td class='saves'><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
        <td class='goals-against'>0</td>
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
