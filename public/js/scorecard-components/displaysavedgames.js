import {sendToServer} from './callbacks/sendtoserver';
import {deleteGame} from './callbacks/deletegame';
import {editScorecard} from './callbacks/editscorecard';
import {savedGamesTemplate} from './templates/savedgamestemplate';

export function displaySavedGames (savedGames){
  $('.send-to-server, .delete-game, .edit-scorcard').off();
  $('.saved-games').empty();
  var savedGamesHtml = _.template(savedGamesTemplate)({'savedgames': savedGames})
  $(".saved-games").html(savedGamesHtml);

  $('.send-to-server').on('click', sendToServer);

  $('.delete-game').on('click', deleteGame);

  $('.edit-scorecard').on('click', editScorecard);
}
