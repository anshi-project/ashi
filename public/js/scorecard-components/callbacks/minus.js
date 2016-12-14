export function minus(){
          if ($(this).attr('class') === 'minus active'){
            var num = Number( $(this).next().text() ) -1;
            if (num >= 0){
              $(this).next().text(num);
              num = Number($(this).siblings('.points').text()) - 1;
              $(this).siblings('.points').text(num);
              if ($(this).parent().hasClass('goals') || $(this).parent().hasClass('assists')){
                num = Number($(this).parent().siblings('.points').text()) - 1;
                $(this).parent().siblings('.points').text(num);
                return;
              }
              if ($(this).parent().hasClass('shots-against')){
                num = Number($(this).parent().siblings('.goals-against').text()) - 1;
                $(this).parent().siblings('.goals-against').text(num);
                return;
              }
              if ($(this).parent().hasClass('saves')){
                num = Number($(this).parent().siblings('.goals-against').text()) + 1;
                $(this).parent().siblings('.goals-against').text(num);
                return;
              }
            }
          }
}
