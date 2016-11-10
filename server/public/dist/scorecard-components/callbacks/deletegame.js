import { toastDeleteGame } from '../toasts/deletegame';

export function deleteGame() {
  $('.confirm-delete-game').off();
  var savedGameArr = ($(this).siblings('.game-details')).text().split(',');
  toastDeleteGame(savedGameArr);
}
