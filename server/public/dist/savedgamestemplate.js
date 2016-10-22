var savedGamesTemplate = `
    <h2 class='saved-games-header'>Games saved on local drive</h2>
    <% _.each(savedgames, function(g) { %>
        <div class='row saved-game'>
            <div class='col-sm-3'>
                <p class='game'><%=g.team_name%> - <%=g.opponent%>&nbsp; &nbsp; <%=g.date%>&nbsp; &nbsp; <%=g.time%></p>
            </div>
            <div class='col-sm-2'>
                <button type='submit' class='send-to-server btn btn-sm btn-primary'>Send to ASHI server</button>
                <span class='game-details'><%=g.team_name%>,<%=g.opponent%>,<%=g.date%>,<%=g.time%></span>
            </div>
            <div class='col-sm-1'>
                <button type='submit' class='delete-game btn btn-sm btn-danger'>Delete game</button>
                <span class='game-details'><%=g.team_name%>,<%=g.opponent%>,<%=g.date%>,<%=g.time%></span>
            </div>
            <div class='col-sm-6'>
            </div>
        </div>
    <% }) %>`


define('savedgamestemplate', function(){
    return savedGamesTemplate;
})