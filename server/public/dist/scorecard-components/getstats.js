export function getStats(tableClass) {
  var incomplete = false;
  var arr = [];
  var tds;
  $(tableClass).find('> tbody tr.playing').each(function() {
      var stat;
      tds = $(this).find('td');
      $.each(tds, function(index) {
          if (index === 3 && (tableClass === '.home-goaliesTable' || tableClass === '.road-goaliesTable')) {
              stat = $(this).children().val();
              arr.push(parseInt(stat, 10));
              return;
          }
          if ((index === 1 || index === 2) && ($(tableClass).hasClass('blank-table'))) {
              stat = $(this).children().val();
              arr.push(stat);
              if (stat === '') incomplete = true;
              return;
          }
          stat = $(this).text();
          if ((index === 1 || index === 2) && (tableClass !== '.home-team-stats') &&
              (tableClass !== '.road-team-stats')) {
              arr.push(stat);
              return;
          }
          if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats') {
              stat = index > 0 ? +stat.replace(/[-+]/g, '') : stat;
              arr.push(stat);
              return;
          } else {
              stat = index > 2 ? +stat.replace(/[-+]/g, '') : stat;
              arr.push(stat);
              return;
          }
      });
  });
  if (incomplete) {
      return ['incomplete'];
  } else {
      return arr;
  }
}
