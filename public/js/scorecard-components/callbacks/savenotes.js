export function saveNotes (){
  localforage.removeItem('ashi-game-notes');
  localforage.setItem('ashi-game-notes', $('textarea').val(), function(err){console.log(err)});
};
