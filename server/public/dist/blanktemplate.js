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
                                      <th><bold>GA</bold></th>
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
                                      <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          					</tr>
                                  </tbody>
                        				</table>
                        			</div>
                        			<div class="col-sm-6"></div>
                        		</div>`

define('blanktemplate', function(){
    return blankTemplate;
})