import {sendSavedGame} from '../sendsavedgame';

export function sendToServer (){
  console.log('effe')
    var savedGameArr = ($(this).siblings('span').text()).split(',');
    console.log(savedGameArr)
    sendSavedGame(savedGameArr);
}
