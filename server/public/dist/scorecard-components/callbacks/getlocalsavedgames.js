import {displaySavedGames} from '../displaysavedgames';

export function getLocalSavedGames(err, savedGames){
  if (savedGames !== null){
    displaySavedGames(savedGames);
  }
}
