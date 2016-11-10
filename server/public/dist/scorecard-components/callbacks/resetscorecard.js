import {toasts} from '../toasts/toasts';

export function resetScorecard(){
  $('.reset-card').off();
  toasts.resetScorecard();
  $('.reset-card').on('click', function(){
    toastr.remove();
    $('#flatpickr').val('').attr('placeholder', 'Set game date and time');
    $('#home-dropdown').val('').attr('placeholder', 'Select Home team');
    $('#road-dropdown').val('').attr('placeholder', 'Select Road team');
    $('.home-team-name, .road-team-name, .home-name-input, .road-name-input, .home, .road').empty();
  });
};
