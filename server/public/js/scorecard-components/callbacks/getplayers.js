export function getPlayers (data){
  localforage.removeItem('teamData');
  localforage.setItem('teamData', data, function(err){console.log(err)});
};
