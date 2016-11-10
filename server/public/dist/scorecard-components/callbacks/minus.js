export function minus(){
          if ($(this).attr('class') === 'minus active'){
            var num = Number( $(this).next().text() ) -1;
            if (num >= 0){
              $(this).next().text(num);
            }
          }
}
