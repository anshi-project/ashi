import {sendSavedGame} from '../sendsavedgame';

export function sendToServer() {
  var savedGameArr = ($(this).siblings('span').text()).split(',');
  sendSavedGame(savedGameArr);
}
