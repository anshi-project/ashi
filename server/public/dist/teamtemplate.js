var teamTemplate = `<div class="row">
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
                              <th><bold>GA</bold></th>
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
                              <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                  					</tr>
                          </tbody>
                				</table>
                			</div>
                			<div class="col-sm-6"></div>
                		</div>`

define('teamtemplate', function(){
    return teamTemplate;
})