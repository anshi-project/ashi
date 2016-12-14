import {toasts} from '../toasts/toasts';
import {displaySavedGames} from '../displaysavedgames';

export function getLocalSavedGames(err, savedGames){
  if (err){
    toasts.privateBrowserMode();
    return;
  }
  if (savedGames !== null){
    displaySavedGames(savedGames);
  }
}
