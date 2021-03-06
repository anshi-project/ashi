var homeTeam;
var roadTeam;

export var savedGamesTemplate = `
    <h2 class='saved-games-header'>Games saved on local drive</h2>
    <% _.each(savedgames, function(g) { %>
      <% if (g.home_game === 'true'){ %>
        <% homeTeam = g.team_name; %>
        <% roadTeam = g.opponent;%>
      <% } else { %>
        <% homeTeam = g.opponent; %>
        <% roadTeam = g.team_name; %>
      <% } %>
        <div class='row saved-game'>
            <div class='col-sm-3'>
                <p class='game'><%=homeTeam%> - <%=roadTeam%>&nbsp; &nbsp; <%=g.date%>&nbsp; &nbsp; <%=g.time%></p>
            </div>
            <div class='col-sm-9'>
                <button type='submit' class='edit-scorecard btn btn-sm btn-primary'>Edit</button>
                <button type='submit' class='send-to-server btn btn-sm btn-primary'>Send to ASHI server</button>
                <button type='submit' class='delete-game btn btn-sm btn-danger'>Delete from local drive</button>
                <span class='game-details'><%=g.team_name%>,<%=g.opponent%>,<%=g.date%>,<%=g.time%></span>
            </div>
        </div>
    <% }) %>`
