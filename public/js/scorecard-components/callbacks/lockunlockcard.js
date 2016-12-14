export function lockUnlockCard(){
   if ($(this).text() === "Safe mode"){
       $('.controls').hide();
       $(this).text('Leave safe mode');
       $(this).css('background-color', 'red');
   } else {
       $('.controls').show();
       $(this).text('Safe mode');
       $(this).css('background-color', 'green');
   }
 };
