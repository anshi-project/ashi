app.get('/api/playerstats', function(req, res){
    var teamName = req.param('teamname');
    var jerseyNumber = req.param('jerseynumber');
    var season = req.param('season');
    console.log('teamName: ', teamName);
    console.log('jerseyNumber: ', jerseyNumber);
    console.log('season: ', season);
});