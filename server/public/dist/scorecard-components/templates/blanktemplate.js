export var blankTemplate = `<table class='<%=location%>-playersTable blank-table'>
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
                                <th><bold>PPG</bold></th>
                                <th><bold>SHG</bold></th>
                                <th><bold>GWG</bold></th>
                                <th><bold>OTG</bold></th>
                                <th><bold>SOG</bold></th>
                                <th><bold>SOM</bold></th>
                              </tr>
                              </thead>
                              <tbody>
                              <% _.each([0,0,0,0,0,0,0,0,0,0,0], function(player) { %>
                                  <tr class='not-playing'>
                                    <td class="select-player"><input type="checkbox" class='blank-scorecard'></td>
                                    <td class='player-number-blank'><input type='text' class='blank-scorecard blank-number-input' maxlength="2" size="2"></td>
                                    <td class='player-name-blank'><input type='text' class='blank-scorecard blank-name-input' maxlength='30'></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
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
                                <th><bold>P</bold></th>
                                <th><bold>PIM</bold></th>
                                <th><bold>SOSh</bold></th>
                                <th><bold>SOSa</bold></th>
                              </tr>
                            </thead>
                            <tbody>
                            <% _.each([0,0,0], function(goalie) { %>
                                <tr class='not-playing'>
                                  <td class ="select-player"><input type="checkbox" class='blank-scorecard'></td>
                                  <td class ='player-number-blank'><input type='text' class='blank-scorecard blank-number-input' maxlength="2" size = "2"></td>
                                  <td><input class='blank-scorecard blank-name-input' type='text' maxlength='30'></td>
                                  <td><select class='goalie-opp-min-dropdown minutes'></select></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
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
                          <div class="row">
                        			<div class="col-sm-6">
                        				<table class="<%=location%>-team-stats">
                                  <thead>
                          					<tr>
                          						<th ><div class='team-stats-header-blank'><bold>Team Stats</bold></div></th>
                                      <th><bold>1st</bold></th>
                                      <th><bold>2nd</bold></th>
                                      <th><bold>3rd</bold></th>
                          						<th><bold>OT</bold></th>
                          						<th><bold>OT2</bold></th>
                  				            <th><bold>OT3</bold></th>
                                      <th><bold>GF</bold></th>
                                      <th><bold>PPG</bold></th>
                                      <th><bold>PPO</bold></th>
                          					</tr>
                                  </thead>
                                  <tbody>
                          					<tr class='playing'>
                                      <td ><div class='team-stats-header-blank'></div></td>
                          						<td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                          						<td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                          						<td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                          					</tr>
                                  </tbody>
                        				</table>
                        			</div>
                        			<div class="col-sm-6"></div>
                        		</div>`
