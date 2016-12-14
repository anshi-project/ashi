export function fillOutScorecard(tableClass, stats) {
  $(tableClass).find('> tbody tr').each(function() {
    var players;
    var tds;
    var index;
    var statistics = [];
    var jerseyNumber;
    if (stats.length === 0) return;
    if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats') {
        statistics = stats.stats_for_editing;
    }
    tds = $(this).find('td');
    $.each(tds, function(index) {
        var self = this;
        if (index === 1 && tableClass !== '.home-team-stats' &&
            tableClass !== '.road-team-stats' && !$(tableClass).hasClass('blank-table')) {
            jerseyNumber = $(this).text();
            stats.map(function(player) {
                if (player.jersey_number === jerseyNumber) {
                    statistics = player.stats_for_editing;
                    $(self).prev().children().prop('checked', true);
                    $(self).parents('tr').toggleClass('playing').toggleClass('not-playing');
                    $(self).siblings('td').children('.minus, .plus').toggleClass('active');
                }
            });
            return;
        }

        if (index === 1 && $(tableClass).hasClass('blank-table')) {
            $(this).children().val(stats[0].jersey_number);
            $(this).prev().children().prop('checked', true)
            $(this).parents('tr').toggleClass('playing').toggleClass('not-playing');
            $(this).siblings('td').children('.minus, .plus').toggleClass('active');
            return;
        }

        if (index === 2 && $(tableClass).hasClass('blank-table')) {
            $(this).children().val(stats[0].name);
            statistics = stats[0].stats_for_editing;
            stats.shift();
            return;
        }

        if ((index === 1 || index === 2) && (tableClass === '.home-team-stats' ||
                tableClass === '.road-team-stats')) {
            $(this).children('.num').text(statistics[0]);
            statistics.shift();
            return;
        }

        if (index === 3 && statistics.length > 0 &&
            (tableClass === '.home-goaliesTable' ||
                tableClass === '.road-goaliesTable')) {
            $(this).children().val(statistics[0]);
            statistics.shift();
            return;
        }

        if (index > 2 && statistics.length > 0) {
            $(this).children('.num').text(statistics[0]);
            statistics.shift();
            return;
        }
    });
  });
}
