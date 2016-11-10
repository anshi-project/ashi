import {deleteSavedGame} from '../deletesavedgame.js';
export function toastDeleteGame (savedGameArr){
  toastr.warning("Delete game on local drive?<br /><br /><button type='button' class='confirm-delete-game btn btn-danger'>Yes</button>")
  $('.confirm-delete-game').on('click', function(){
    deleteSavedGame(savedGameArr);
  });
}
