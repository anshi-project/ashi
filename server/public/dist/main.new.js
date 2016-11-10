import {blankTemplate} from './scorecard-components/templates/blanktemplate';
import {goaliesTemplate} from './scorecard-components/templates/goaliestemplate';
import {playersTemplate} from './scorecard-components/templates/playerstemplate';
import {teamTemplate} from './scorecard-components/templates/teamtemplate';
import {displayAshiTeam} from './scorecard-components/displayashiteam';
import {savedGamesTemplate} from './scorecard-components/templates/savedgamestemplate';
import {plus} from './scorecard-components/callbacks/plus';
import {minus} from './scorecard-components/callbacks/minus';
import {checkbox} from './scorecard-components/callbacks/checkbox';
import {displayBlankTeam} from './scorecard-components/displayblankteam';
import {displaySavedGames} from './scorecard-components/displaysavedgames';
import {saveToLocalDisk} from './scorecard-components/callbacks/savetolocaldisk';
import {getLocalSavedGames} from './scorecard-components/callbacks/getlocalsavedgames';
import {toastrSetOptions} from './scorecard-components/toasts/toastrsetoptions';
import {getPlayers} from './scorecard-components/callbacks/getplayers';
import {resetScorecard} from './scorecard-components/callbacks/resetScorecard';
import {submitScorecard} from './scorecard-components/callbacks/submitScorecard';
import {saveNotes} from './scorecard-components/callbacks/savenotes';
import {lockUnlockCard} from './scorecard-components/callbacks/lockunlockcard';
import {teamSelect} from './scorecard-components/callbacks/teamselect';
import {toasts} from './scorecard-components/toasts/toasts';
import {editScorecard} from './scorecard-components/callbacks/editscorecard';

flatpickr('#flatpickr', {enableTime: true, allowInput: true});

$("#road-dropdown, #home-dropdown").on("change", teamSelect);

$('.save-notes').on('click', saveNotes);

$(".submit-scorecard").on('click', submitScorecard);

$('.save-to-local-disk').on('click', saveToLocalDisk);

$(".lock-unlock-scorecard").on('click', lockUnlockCard);

$('.reset-scorecard').on('click', resetScorecard);

$('.edit-scorecard').on('click', editScorecard);

$.get('/players', getPlayers);

localforage.getItem('ashi-data-store', getLocalSavedGames);

toastrSetOptions();

toasts.selectPlayers();

toastr.options.positionClass = "toast-top-center";
