import {sendSavedGame} from '../sendsavedgame';

export function sendToServer (){
    var savedGameArr = ($(this).next().text()).split(',');
    sendSavedGame(savedGameArr);
}
