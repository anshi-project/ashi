import {toasts} from '../toasts/toasts';

export function deleteGame() {
  $('.confirm-delete-game').off();
  var savedGameArr = ($(this).siblings('.game-details')).text().split(',');
  toasts.confirmDeleteGame(savedGameArr);
}
