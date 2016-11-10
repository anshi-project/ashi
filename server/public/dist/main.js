/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return toasts; });
function selectPlayers(){
  toastr.info(`Only select players and goalies who are playing by ticking the
    box next to their jersey number.`,
    'Use the score card in "Safe mode" after you have configured it.');
}

function resetScorecard(){
  toastr.warning(`Wipe the scorecard clean?<br /><br /><button type='button'
  class='reset-card btn btn-danger'>Yes</button>`);
}

function notStoredInDb(){
  toastr.error('Game not stored in database, please try again');
}

function storedInDb(){
  toastr.success('Game stored in database')
}

function selectOpponent(){
  toastr.error('Select the opposing team');
}

var toasts = {
  selectPlayers: selectPlayers,
  resetScorecard: resetScorecard,
  notStoredInDb: notStoredInDb,
  storedInDb: storedInDb,
  selectOpponent: selectOpponent
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__callbacks_sendtoserver__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__callbacks_deletegame__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__callbacks_editscorecard__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_savedgamestemplate__ = __webpack_require__(13);
/* harmony export (immutable) */ exports["a"] = displaySavedGames;





function displaySavedGames (savedGames){
  $('.send-to-server, .delete-game, .edit-scorcard').off();
  $('.saved-games').empty();
  var savedGamesHtml = _.template(__WEBPACK_IMPORTED_MODULE_3__templates_savedgamestemplate__["a" /* savedGamesTemplate */])({'savedgames': savedGames})
  $(".saved-games").html(savedGamesHtml);

  $('.send-to-server').on('click', __WEBPACK_IMPORTED_MODULE_0__callbacks_sendtoserver__["a" /* sendToServer */]);

  $('.delete-game').on('click', __WEBPACK_IMPORTED_MODULE_1__callbacks_deletegame__["a" /* deleteGame */]);

  $('.edit-scorecard').on('click', __WEBPACK_IMPORTED_MODULE_2__callbacks_editscorecard__["a" /* editScorecard */]);
}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = checkbox;
function checkbox(){
  $(this).parents('tr').toggleClass('playing').toggleClass('not-playing');
  $(this).parent('td').siblings('td').children('.minus, .plus').toggleClass('active');
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = minus;
function minus(){
          if ($(this).attr('class') === 'minus active'){
            var num = Number( $(this).next().text() ) -1;
            if (num >= 0){
              $(this).next().text(num);
            }
          }
}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = plus;
function plus(){
  if ($(this).attr('class') === 'plus active'){
    var num = Number( $(this).prev().text() ) + 1;
    $(this).prev().text(num);
  }
}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__displaysavedgames__ = __webpack_require__(1);
/* harmony export (immutable) */ exports["a"] = deleteSavedGame;


function deleteSavedGame(arr) {
    localforage.getItem('ashi-data-store', function(err, v){
      for (var i = 0; i < v.length; i++){
        if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
          && v[i].date === arr[2] && v[i].time === arr[3]){
          v.splice(i, 1);
          localforage.removeItem('ashi-data-store', function(err){
              if (v.length !== 0){
                localforage.setItem('ashi-data-store', v, function(err){
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__displaysavedgames__["a" /* displaySavedGames */])(v);
                });
              } else {
                $('.saved-games').empty();
              }
          });
        }
      }
    });
}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deletesavedgame__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__teamselect__ = __webpack_require__(7);
/* harmony export (immutable) */ exports["a"] = editScorecard;



function editScorecard (){
  var edit = true;
  var arr = ($(this).siblings('.game-details')).text().split(',');
  localforage.getItem('ashi-data-store', function(err, v){

      for (var i = 0; i < v.length; i++){
        if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
          && v[i].date === arr[2] && v[i].time === arr[3]){
            var stats = v[i];
            var homeGame = stats.home_game === 'true'? true: false;
            var ashiLocation = homeGame? 'home': 'road';
            var opponentLocation = homeGame? 'road': 'home';
            $('#flatpickr').val(stats.date + ' ' + stats.time);
            var selAshi = homeGame? '#home-dropdown': '#road-dropdown';
            var selOpponent = homeGame? '#road-dropdown': '#home-dropdown';
            $("select" + selAshi + " option")
              .filter(function() {
                return $(this).text() === stats.team_name;
              })
              .prop('selected', true);
            $("select" + selOpponent + " option")
              .filter(function() {
                return $(this).text() === 'blank scorecard';
              })
              .prop('selected', true);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__teamselect__["a" /* teamSelect */])(opponentLocation, stats.opponent, edit, stats, true);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__teamselect__["a" /* teamSelect */])(ashiLocation, stats.team_name, edit, stats, false);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__deletesavedgame__["a" /* deleteSavedGame */])(arr);
        }
      }
  });
}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__displayblankteam__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__displayashiteam__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toasts_toasts__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = teamSelect;




var homeDropDownVal = "Select Home team";
var roadDropDownVal = "Select Road team";

function teamSelect (loc, teamName, edit, stats, blank){
  var self = this;
  var prevHomeDropDownVal;
  var prevRoadDropDownVal ;
  var dropDownVal;
  var location;
  var ashiLoc;
  var opponentLoc;

  if (edit){
    $('textarea').text();
    $('textarea').text(stats.gameNotes);
    prevHomeDropDownVal = $('#home-dropdown').val();
    prevRoadDropDownVal = $('#road-dropdown').val();
    dropDownVal = blank? 'blank scorecard': teamName;
    location = loc;
    if (location === 'home') {
     prevHomeDropDownVal = homeDropDownVal;
     homeDropDownVal = dropDownVal;
    } else {
     prevRoadDropDownVal = roadDropDownVal;
     roadDropDownVal = dropDownVal;
    }
    if (!blank){
      ashiLoc = loc;
      opponentLoc = ashiLoc === 'home'? 'road': 'home';
    }
  } else {
      dropDownVal = this.value;
      if (dropDownVal === "") return;
      if ($('#road-dropdown').val() === $('#home-dropdown').val()) {
        __WEBPACK_IMPORTED_MODULE_3__toasts_toasts__["a" /* toasts */].selectOpponent();
        return;
      }
      location = $(this).attr("id").replace("-dropdown","");
      if (location === 'home') {
       prevHomeDropDownVal = homeDropDownVal;
       homeDropDownVal = dropDownVal;
      } else {
       prevRoadDropDownVal = roadDropDownVal;
       roadDropDownVal = dropDownVal;
      }
  }

  if (dropDownVal === 'blank scorecard') {
   $('.' + location + '-team-name').text(location + ' team:')
   $('.' + location + '-name-input').html('<input type="text" maxlength="30" class="team-name-input">');
   $('.' + location + '-name-input').children().val(teamName);
   $('.' + location + '-team-name').css({'display':'inline-block', 'margin-left' : '4em'});
   __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__displayblankteam__["a" /* displayBlankTeam */])(location);
   $('#' + location + '-dropdown').css('margin-bottom', '-1.15em');
   return;
  }
  $('.' + location + '-name-input').empty();
  var home_game = location === 'home'? true: false;
  $('.home-game').text(home_game);
  if ( (location === 'home' && prevHomeDropDownVal === 'blank scorecard') ||
      (location === 'road' && prevRoadDropDownVal === 'blank scorecard') )  {
       $('.' + location).css('margin-top', '1.6em');
  }
  $('.' + location + '-name-input').children().hide();
  localforage.getItem('teamData', function(err, teamData){
    if (edit){
      var team = teamData.filter(v => {return v.name === teamName})[0];
    } else {
      var team = teamData.filter(v => {return v.key === $(self).val()})[0];
    }
    $('.' + location + '-team-name').html(location + ' team: ' + team.name );
    $('.ashi-team-name').text(team.name);
   var playersArr = team.players
   var goaliesArr = team.goalies;
   __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__displayashiteam__["a" /* displayAshiTeam */])(location, team, playersArr, goaliesArr);
   if (edit) {
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__["a" /* fillOutScorecard */])('.' + ashiLoc + '-playersTable', stats.ashi_players);
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__["a" /* fillOutScorecard */])('.' + ashiLoc + '-goaliesTable', stats.ashi_goalies);
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__["a" /* fillOutScorecard */])('.' + ashiLoc + '-team-stats', stats.ashi_team);
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__["a" /* fillOutScorecard */])('.' + opponentLoc + '-playersTable', stats.opponent_players);
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__["a" /* fillOutScorecard */])('.' + opponentLoc + '-goaliesTable', stats.opponent_goalies);
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fillOutScorecard__["a" /* fillOutScorecard */])('.' + opponentLoc + '-team-stats', stats.opponent_team);
   }
  });
};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__callbacks_plus__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__callbacks_minus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__callbacks_checkbox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_playerstemplate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__templates_goaliestemplate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__templates_teamtemplate__ = __webpack_require__(14);
/* harmony export (immutable) */ exports["a"] = displayAshiTeam;







function displayAshiTeam(location, team, playersArr, goaliesArr){
  var i;
  var playersHtml = _.template(__WEBPACK_IMPORTED_MODULE_3__templates_playerstemplate__["a" /* playersTemplate */])({'players': playersArr, 'location': location})
  $("." + location).html(playersHtml);

  var goaliesHtml = _.template(__WEBPACK_IMPORTED_MODULE_4__templates_goaliestemplate__["a" /* goaliesTemplate */])({'goalies': goaliesArr, 'location': location});
  $("." + location).append(goaliesHtml);
  for (i = 0; i <= 60; i++){
    $('.goalie-min-dropdown').append($('<option></option>').val(i).html(i));
  }

  var teamHtml = _.template(__WEBPACK_IMPORTED_MODULE_5__templates_teamtemplate__["a" /* teamTemplate */])({'location': location});
  $("." + location).append(teamHtml);

  $('.minus, .plus, :checkbox').off();
  $('.plus').on('click', __WEBPACK_IMPORTED_MODULE_0__callbacks_plus__["a" /* plus */]);
  $('.minus').on('click', __WEBPACK_IMPORTED_MODULE_1__callbacks_minus__["a" /* minus */]);
  $(':checkbox').change(__WEBPACK_IMPORTED_MODULE_2__callbacks_checkbox__["a" /* checkbox */]);
}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_blanktemplate__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__callbacks_plus__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__callbacks_minus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__callbacks_checkbox__ = __webpack_require__(2);
/* harmony export (immutable) */ exports["a"] = displayBlankTeam;





function displayBlankTeam(location){
  var i;
  var blankHtml = _.template(__WEBPACK_IMPORTED_MODULE_0__templates_blanktemplate__["a" /* blankTemplate */])({'location': location});
  $("." + location).html(blankHtml);
  for (i = 0; i <= 60; i++){
    $('.goalie-opp-min-dropdown').append($('<option></option>').val(i).html(i));
  }
  $('.minus, .plus, :checkbox').off();
  $('.plus').on('click', __WEBPACK_IMPORTED_MODULE_1__callbacks_plus__["a" /* plus */]);
  $('.minus').on('click', __WEBPACK_IMPORTED_MODULE_2__callbacks_minus__["a" /* minus */]);
  $(':checkbox').change(__WEBPACK_IMPORTED_MODULE_3__callbacks_checkbox__["a" /* checkbox */]);
}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return blankTemplate; });
var blankTemplate = `<table class='<%=location%>-playersTable blank-table'>
                              <thead>
                              <tr>
                                <th class='select-player'></th>
                                <th class='player-number-blank'><bold>#</bold></th>
                                <th class='name'><bold>Player</bold></th>
                                <th><bold>G</bold></th>
                                <th><bold>A</bold></th>
                                <th><bold>P</bold></th>
                                <th><bold>+-</bold></th>
                                <th><bold>PIM</bold></th>
                                <th><bold>PPG</bold></th>
                                <th><bold>SHG</bold></th>
                                <th><bold>GWG</bold></th>
                                <th><bold>OTG</bold></th>
                                <th><bold>SOG</bold></th>
                                <th><bold>SOM</bold></th>
                              </tr>
                              </thead>
                              <tbody>
                              <% _.each([0,0,0,0,0,0,0,0,0,0,0], function(player) { %>
                                  <tr class='not-playing'>
                                    <td class="select-player"><input type="checkbox" class='blank-scorecard'></td>
                                    <td class='player-number-blank'><input type='text' class='blank-scorecard blank-number-input' maxlength="2" size="2"></td>
                                    <td class='player-name-blank'><input type='text' class='blank-scorecard blank-name-input' maxlength='30'></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  </tr>
                              <% }) %>
                              </tbody>
                          </table>
                          <table class='<%=location%>-goaliesTable blank-table'>
                            <thead>
                              <tr>
                                <th class='select-player'></th>
                                <th class='goalie-number'><bold>#</bold></th>
                                <th class='name goalie-name-blank'><bold>Goal tender</bold></th>
                                <th><bold>MIN</bold></th>
                                <th><bold>SA</bold></th>
                                <th><bold>SV</bold></th>
                                <th><bold>GA</bold></th>
                                <th><bold>SO</bold></th>
                                <th><bold>G</bold></th>
                                <th><bold>A</bold></th>
                                <th><bold>P</bold></th>
                                <th><bold>PIM</bold></th>
                                <th><bold>SOSh</bold></th>
                                <th><bold>SOSa</bold></th>
                              </tr>
                            </thead>
                            <tbody>
                            <% _.each([0,0,0], function(goalie) { %>
                                <tr class='not-playing'>
                                  <td class ="select-player"><input type="checkbox" class='blank-scorecard'></td>
                                  <td class ='player-number-blank'><input type='text' class='blank-scorecard blank-number-input' maxlength="2" size = "2"></td>
                                  <td><input class='blank-scorecard blank-name-input' type='text' maxlength='30'></td>
                                  <td><select class='goalie-opp-min-dropdown minutes'></select></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                  <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                </tr>
                            <% }) %>
                            </tbody>
                          </table>
                          <div class="row">
                        			<div class="col-sm-6">
                        				<table class="<%=location%>-team-stats">
                                  <thead>
                          					<tr>
                          						<th ><div class='team-stats-header-blank'><bold>Team Stats</bold></div></th>
                                      <th><bold>1st</bold></th>
                                      <th><bold>2nd</bold></th>
                                      <th><bold>3rd</bold></th>
                          						<th><bold>OT</bold></th>
                          						<th><bold>OT2</bold></th>
                  				            <th><bold>OT3</bold></th>
                                      <th><bold>GF</bold></th>
                                      <th><bold>PPG</bold></th>
                                      <th><bold>PPO</bold></th>
                          					</tr>
                                  </thead>
                                  <tbody>
                          					<tr class='playing'>
                                      <td ><div class='team-stats-header-blank'></div></td>
                          						<td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                          						<td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                          						<td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                                      <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                          					</tr>
                                  </tbody>
                        				</table>
                        			</div>
                        			<div class="col-sm-6"></div>
                        		</div>`


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return goaliesTemplate; });
var goaliesTemplate = `<table class='<%=location%>-goaliesTable'>
                              <thead>
                                <tr>
                                  <th class='select-player'></th>
                                  <th class='goalie-number'><bold>#</bold></th>
                                  <th class='name'><bold>Goal tender</bold></th>
                                  <th><bold>MIN</bold></th>
                                  <th><bold>SA</bold></th>
                                  <th><bold>SV</bold></th>
                                  <th><bold>GA</bold></th>
                                  <th><bold>SO</bold></th>
                                  <th><bold>G</bold></th>
                                  <th><bold>A</bold></th>
                                  <th><bold>P</bold></th>
                                  <th><bold>PIM</bold></th>
                                  <th><bold>SOSh</bold></th>
                                  <th><bold>SOSa</bold></th>
                                </tr>
                              </thead>
                              <tbody>
                              <% _.each(goalies, function(goalie) { %>
                                  <tr class="not-playing">
                                    <td class="select-player"><input type="checkbox"></td>
                                    <td class='goalie-number'><%=goalie.team.jersey_number%></td>
                                    <td class='name'><%=goalie.lastname%></td>
                                    <td><select class='goalie-min-dropdown minutes'></select></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                                    <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>

                                  </tr>
                              <% }) %>
                              </tbody>
                            </table>`


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return playersTemplate; });
var playersTemplate = `<table class='<%=location%>-playersTable' id='ashi-team'>
                      <thead>
                      <tr>
                        <th class='select-player'></th>
                        <th class='player-number'><bold>#</bold></th>
                        <th class='name'><bold>Player</bold></th>
                        <th><bold>G</bold></th>
                        <th><bold>A</bold></th>
                        <th><bold>P</bold></th>
                        <th><bold>+-</bold></th>
                        <th><bold>PIM</bold></th>
                        <th><bold>PPG</bold></th>
                        <th><bold>SHG</bold></th>
                        <th><bold>GWG</bold></th>
                        <th><bold>OTG</bold></th>
                        <th><bold>SOG</bold></th>
                        <th><bold>SOM</bold></th>
                      </tr>
                      </thead>
                      <tbody>
                      <% _.each(players, function(player) { %>
                          <tr class="not-playing">
                            <td class="select-player"><input type="checkbox"></td>
                            <td class='player-number'><%=player.team.jersey_number%></td>
                            <td class='name'><%=player.lastname%></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                            <td><span class='minus'>-</span><span class='num'>0</span><span class='plus'>+</span></td>
                          </tr>
                      <% }) %>
                      </tbody>
                </table>`


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return savedGamesTemplate; });
var homeTeam;
var roadTeam;

var savedGamesTemplate = `
    <h2 class='saved-games-header'>Games saved on local drive</h2>
    <% _.each(savedgames, function(g) { %>
      <% if (g.home_game === 'true'){ %>
        <% homeTeam = g.team_name; %>
        <% roadTeam = g.opponent;%>
      <% } else { %>
        <% homeTeam = g.opponent; %>
        <% roadTeam = g.team_name; %>
      <% } %>
        <div class='row saved-game'>
            <div class='col-sm-3'>
                <p class='game'><%=homeTeam%> - <%=roadTeam%>&nbsp; &nbsp; <%=g.date%>&nbsp; &nbsp; <%=g.time%></p>
            </div>
            <div class='col-sm-9'>
                <button type='submit' class='edit-scorecard btn btn-sm btn-primary'>Edit</button>
                <button type='submit' class='send-to-server btn btn-sm btn-primary'>Send to ASHI server</button>
                <button type='submit' class='delete-game btn btn-sm btn-danger'>Delete from local drive</button>
                <span class='game-details'><%=g.team_name%>,<%=g.opponent%>,<%=g.date%>,<%=g.time%></span>
            </div>
        </div>
    <% }) %>`


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return teamTemplate; });
var teamTemplate = `<div class="row">
                			<div class="col-sm-6">
                				<table class="<%=location%>-team-stats">
                          <thead>
                  			<tr>
                  			    <th ><div class='team-stats-header'><bold>Team Stats</bold></div></th>
                                <th><bold>1st</bold></th>
                                <th><bold>2nd</bold></th>
                                <th><bold>3rd</bold></th>
                  				<th><bold>OT</bold></th>
                  				<th><bold>OT2</bold></th>
                  				<th><bold>OT3</bold></th>
                                <th><bold>GF</bold></th>
                                <th><bold>PPG</bold></th>
                                <th><bold>PPO</bold></th>
                  			</tr>
                          </thead>
                          <tbody>
                  			<tr class='playing'>
                              <td ><div class='team-stats-header'></div></td>
                              <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                  			  <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                  			  <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                  			  <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                              <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                              <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                              <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                              <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                              <td><span class='minus active'>-</span><span class='num'>0</span><span class='plus active'>+</span></td>
                  			</tr>
                          </tbody>
                				</table>
                			</div>
                			<div class="col-sm-6"></div>
                		</div>`


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getstats__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getplayerstats__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getgoaliestats__ = __webpack_require__(27);
/* harmony export (immutable) */ exports["a"] = collectGameStats;




function collectGameStats() {
    var ashiTeamName = $('.ashi-team-name').text();
    var home_game = $('.home-game').text();
    var incompleteScorecard = false;
    var date;
    var season;
    var arr;
    var a;
    var o;
    var ap;
    var ag;
    var at;
    var op;
    var og;
    var ot;
    var opponent = $('.team-name-input').val();
    var gameNotes;
    var ashiResult;
    var opponentResult;
    if ($('#flatpickr').val() === '') {
        toastr.error('Set game date and time before submitting scorecard');
        return 'error';
    } else {
        date = $('#flatpickr').val().split(' ')[0];
        season = date.substr(0, 4);
        var time = $('#flatpickr').val().split(' ')[1];
    }

    if ($('.team-name-input').val() === "") {
        toastr.error('Fill out opponent team name');
        return 'error';
    }

    var homeTeamStats = ['.home-playersTable', '.home-goaliesTable', '.home-team-stats'].map(__WEBPACK_IMPORTED_MODULE_0__getstats__["a" /* getStats */]);
    var roadTeamStats = ['.road-playersTable', '.road-goaliesTable', '.road-team-stats'].map(__WEBPACK_IMPORTED_MODULE_0__getstats__["a" /* getStats */]);
    homeTeamStats.map(function(array) {
        if (array[0] === 'incomplete') {
            incompleteScorecard = true;
        }
    });
    roadTeamStats.map(function(array) {
        if (array[0] === 'incomplete') {
            incompleteScorecard = true;
        }
    });

    if (incompleteScorecard) {
        toastr.error('Fill in jersey number and name for all opponent players and goalies');
        return 'error';
    }

    if (home_game === 'true') {
        ap = homeTeamStats[0];
        ag = homeTeamStats[1];
        at = homeTeamStats[2];
        op = roadTeamStats[0];
        og = roadTeamStats[1];
        ot = roadTeamStats[2];
    } else {
        op = homeTeamStats[0];
        og = homeTeamStats[1];
        ot = homeTeamStats[2];
        ap = roadTeamStats[0];
        ag = roadTeamStats[1];
        at = roadTeamStats[2];
    }

    if (at[7] > ot[7]) {
        ashiResult = 'win';
        opponentResult = 'loss'
    }
    if (at[7] === ot[7]) ashiResult = opponentResult = 'tie';
    if (at[7] < ot[7]) {
        ashiResult = 'loss';
        opponentResult = 'win'
    }

    if (ag[4] === 0 || og[4] === 0) {
        toastr.error("Shots Against stat can't be 0");
        return 'error';
    }

    var pkPercAshi = ot[9] > 0 ? (ot[9] - ot[8]) / ot[9] : -999; // -999 means that there where no power play opportunities against.
    var pkPercOpp = at[9] > 0 ? (at[9] - at[8]) / at[9] : -999;
    var ppPercAshi = at[9] > 0 ? (at[8] / at[9]) : -999;
    var ppPercOpponent = ot[9] > 0 ? (ot[8] / ot[9]) : -999;
    var ashi_player_stats = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getplayerstats__["a" /* getPlayerStats */])(ap, opponent, home_game, ashiResult, date, season, ashiTeamName);
    var ashi_goalie_stats = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__getgoaliestats__["a" /* getGoalieStats */])(ag, opponent, home_game, ashiResult, date, season, ashiTeamName);
    var ashi_team_stats = {
        P1_goals: at[1],
        P2_goals: at[2],
        P3_goals: at[3],
        OT: at[4],
        OT2: ot[5],
        OT3: ot[6],
        GF: at[7],
        PPG: at[8],
        PPO: at[9],
        PKP: pkPercAshi,
        result: ashiResult,
        date: date,
        home_game: home_game,
        opponent: opponent,
        season: season,
        team_name: ashiTeamName,
        PPP: ppPercAshi,
        stats_for_editing: [at[1], at[2], at[3], at[4], at[5],
            at[6], at[7], at[8], at[9]]
    };
    var opponent_player_stats = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getplayerstats__["a" /* getPlayerStats */])(op, ashiTeamName, !home_game, opponentResult, date, season, ashiTeamName);
    var opponent_goalie_stats = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__getgoaliestats__["a" /* getGoalieStats */])(og, ashiTeamName, !home_game, opponentResult, date, season, ashiTeamName);
    var opponent_team_stats = {
        P1_goals: ot[1],
        P2_goals: ot[2],
        P3_goals: ot[3],
        OT: ot[4],
        OT2: ot[5],
        OT3: ot[6],
        GF: ot[7],
        GA: at[7],
        PPG: ot[8],
        PPO: ot[9],
        PKP: pkPercOpp,
        PPP: ppPercOpponent,
        result: opponentResult,
        date: date,
        home_game: !home_game,
        opponent: ashiTeamName,
        season: season,
        stats_for_editing: [ot[1], ot[2], ot[3], ot[4], ot[5],
            ot[6], ot[7], ot[8], ot[9]]
    };
    var ashiStats = [ashi_player_stats, ashi_goalie_stats, ashi_team_stats];
    var opponentStats = [opponent_player_stats, opponent_goalie_stats, opponent_team_stats];

    var gameStats = {
        team_name: ashiTeamName,
        home_game: home_game,
        opponent: opponent,
        date: date,
        time: time,
        ashi_players: ashi_player_stats,
        ashi_goalies: ashi_goalie_stats,
        ashi_team: ashi_team_stats,
        opponent_players: opponent_player_stats,
        opponent_goalies: opponent_goalie_stats,
        opponent_team: opponent_team_stats,
        season: season
    }

    localforage.getItem('ashi-game-notes', function(err, value) {
        gameStats.gameNotes = value;
    });
    localforage.removeItem('ashi-game-notes', function(err) {console.log(err)});

    if (ashi_player_stats.length === 0 || ashi_goalie_stats.length === 0 ||
        opponent_player_stats.length === 0 || opponent_goalie_stats.length === 0) {
        toastr.error('select all players and goalies who played');
        return 'error';
    }
    return gameStats;
}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__displaysavedgames__ = __webpack_require__(1);
/* harmony export (immutable) */ exports["a"] = getLocalSavedGames;


function getLocalSavedGames(err, savedGames){
  if (savedGames !== null){
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__displaysavedgames__["a" /* displaySavedGames */])(savedGames);
  }
}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = getPlayers;
function getPlayers (data){
  localforage.removeItem('teamData');
  localforage.setItem('teamData', data, function(err){console.log(err)});
};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = lockUnlockCard;
function lockUnlockCard(){
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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toasts_toasts__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = resetScorecard;


function resetScorecard(){
  $('.reset-card').off();
  __WEBPACK_IMPORTED_MODULE_0__toasts_toasts__["a" /* toasts */].resetScorecard();
  $('.reset-card').on('click', function(){
    toastr.remove();
    $('#flatpickr').val('').attr('placeholder', 'Set game date and time');
    $('#home-dropdown').val('').attr('placeholder', 'Select Home team');
    $('#road-dropdown').val('').attr('placeholder', 'Select Road team');
    $('.home-team-name, .road-team-name, .home-name-input, .road-name-input, .home, .road').empty();
  });
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = saveNotes;
function saveNotes (){
  localforage.removeItem('ashi-game-notes');
  localforage.setItem('ashi-game-notes', $('textarea').val(), function(err){console.log(err)});
};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__displaysavedgames__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collectgamestats__ = __webpack_require__(15);
/* harmony export (immutable) */ exports["a"] = saveToLocalDisk;



function saveToLocalDisk (){
  var val;
  var gameStats = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__collectgamestats__["a" /* collectGameStats */])();
  if (gameStats === 'error') {
    return;
  }
  localforage.getItem('ashi-data-store', function(err, value) {
    if(err){};
    val = value;
    if (value === null) {
      localforage.setItem('ashi-data-store', [gameStats], function(err){console.log(err)});
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__displaysavedgames__["a" /* displaySavedGames */])([gameStats]);
      return;
    }
    for (var i = 0; i < value.length; i++){
      if (_.isEqual(value[i], gameStats)) {
        return;
      }
    }
    val.push(gameStats);
    localforage.removeItem('ashi-data-store', function(err){console.log(err)});
    localforage.setItem('ashi-data-store', val, function(err){console.log(err)});
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__displaysavedgames__["a" /* displaySavedGames */])(val);
  });
}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toasts_toasts__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collectgamestats__ = __webpack_require__(15);
/* harmony export (immutable) */ exports["a"] = submitScorecard;



function submitScorecard (){
    var gameStats = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__collectgamestats__["a" /* collectGameStats */])();
    if (gameStats === 'error') {
      return;
    }
    $.post('http://127.0.0.1:3000/scorecard', {stats: gameStats}, function(result){
      if (result === 'Game not stored') __WEBPACK_IMPORTED_MODULE_0__toasts_toasts__["a" /* toasts */].notStoredInDb();
      if (result === 'Game stored') __WEBPACK_IMPORTED_MODULE_0__toasts_toasts__["a" /* toasts */].storedInDb();
    });
}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = toastrSetOptions;
function toastrSetOptions () {
  toastr.options = {
    "preventDuplicates": true,
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "9999999999",
    "extendedTimeOut": "9999999999",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toasts_deletegame__ = __webpack_require__(31);
/* harmony export (immutable) */ exports["a"] = deleteGame;


function deleteGame (){
  $('.confirm-delete-game').off();
  var savedGameArr = ($(this).siblings('.game-details')).text().split(',');
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__toasts_deletegame__["a" /* toastDeleteGame */])(savedGameArr);
}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sendsavedgame__ = __webpack_require__(30);
/* harmony export (immutable) */ exports["a"] = sendToServer;


function sendToServer (){
    var savedGameArr = ($(this).next().text()).split(',');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sendsavedgame__["a" /* sendSavedGame */])(savedGameArr);
}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = fillOutScorecard;
function fillOutScorecard(tableClass, stats) {
  $(tableClass).find('> tbody tr').each(function() {
    var players;
    var tds;
    var index;
    var statistics = [];
    var jerseyNumber;
    if (stats.length === 0) return;
    if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats') {
        statistics = stats.stats_for_editing;
    }
    tds = $(this).find('td');
    $.each(tds, function(index) {
        var self = this;
        if (index === 1 && tableClass !== '.home-team-stats' &&
            tableClass !== '.road-team-stats' && !$(tableClass).hasClass('blank-table')) {
            jerseyNumber = $(this).text();
            stats.map(function(player) {
                if (player.jersey_number === jerseyNumber) {
                    statistics = player.stats_for_editing;
                    $(self).prev().children().prop('checked', true);
                    $(self).parents('tr').toggleClass('playing').toggleClass('not-playing');
                    $(self).siblings('td').children('.minus, .plus').toggleClass('active');
                }
            });
            return;
        }

        if (index === 1 && $(tableClass).hasClass('blank-table')) {
            $(this).children().val(stats[0].jersey_number);
            $(this).prev().children().prop('checked', true)
            $(this).parents('tr').toggleClass('playing').toggleClass('not-playing');
            $(this).siblings('td').children('.minus, .plus').toggleClass('active');
            return;
        }

        if (index === 2 && $(tableClass).hasClass('blank-table')) {
            $(this).children().val(stats[0].name);
            statistics = stats[0].stats_for_editing;
            stats.shift();
            return;
        }

        if ((index === 1 || index === 2) && (tableClass === '.home-team-stats' ||
                tableClass === '.road-team-stats')) {
            $(this).children('.num').text(statistics[0]);
            statistics.shift();
            return;
        }

        if (index === 3 && statistics.length > 0 &&
            (tableClass === '.home-goaliesTable' ||
                tableClass === '.road-goaliesTable')) {
            $(this).children().val(statistics[0]);
            statistics.shift();
            return;
        }

        if (index > 2 && statistics.length > 0) {
            $(this).children('.num').text(statistics[0]);
            statistics.shift();
            return;
        }
    });
  });
}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = getGoalieStats;
function getGoalieStats(g, opponent, home_game, result, date, season, ashiTeamName){
	var goaliesStatsArr = [];
	while (g.length > 0){
		var goalie = {jersey_number: String(g[1]), name: g[2], MIN: g[3], SA: g[4],
		              SV: g[5], GA: g[6], SO: g[7], G: g[8], A: g[9], P: g[10],
		              PIM: g[11], SOSh: g[12], SOSa: g[13],
		              result: result, opponent: opponent, date: date, season: season,
		              home_game: home_game, team_name: ashiTeamName,
                  stats_for_editing: [g[3], g[4], g[5], g[6], g[7],
                  g[8], g[9], g[10], g[11], g[12], g[13]]};
		goaliesStatsArr.push(goalie);
		g = g.slice(14);
	}
	return goaliesStatsArr;
}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = getPlayerStats;
function getPlayerStats(p, opponent, home_game, result, date, season, ashiTeamName){
	var playersStatsArr = [];
	while (p.length > 0){
		var player = {jersey_number: String(p[1]), name: p[2], G: p[3], A: p[4],
		              P: p[5], PM: p[6], PIM: p[7], PPG: p[8], SHG: p[9],
		              GWG: p[10], OTG: p[11], SOG: p[12], SOM: p[13], result: result, opponent: opponent,
		              date: date, season: season, home_game: home_game, team_name: ashiTeamName,
									stats_for_editing: [p[3], p[4], p[5], p[6], p[7],
									p[8], p[9], p[10], p[11], p[12], p[13]]};
		playersStatsArr.push(player);
		p = p.slice(14);
	}
	return playersStatsArr;
}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = getStats;
function getStats(tableClass) {
  var incomplete = false;
  var arr = [];
  var tds;
  $(tableClass).find('> tbody tr.playing').each(function() {
      var stat;
      tds = $(this).find('td');
      $.each(tds, function(index) {
          if (index === 3 && (tableClass === '.home-goaliesTable' || tableClass === '.road-goaliesTable')) {
              stat = $(this).children().val();
              arr.push(parseInt(stat, 10));
              return;
          }
          if ((index === 1 || index === 2) && ($(tableClass).hasClass('blank-table'))) {
              stat = $(this).children().val();
              arr.push(stat);
              if (stat === '') incomplete = true;
              return;
          }
          stat = $(this).text();
          if ((index === 1 || index === 2) && (tableClass !== '.home-team-stats') &&
              (tableClass !== '.road-team-stats')) {
              arr.push(stat);
              return;
          }
          if (tableClass === '.home-team-stats' || tableClass === '.road-team-stats') {
              stat = index > 0 ? +stat.replace(/[-+]/g, '') : stat;
              arr.push(stat);
              return;
          } else {
              stat = index > 2 ? +stat.replace(/[-+]/g, '') : stat;
              arr.push(stat);
              return;
          }
      });
  });
  if (incomplete) {
      return ['incomplete'];
  } else {
      return arr;
  }
}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deletesavedgame__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toasts_toasts__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = sendSavedGame;



function sendSavedGame(arr){
  localforage.getItem('ashi-data-store', function(err, v){
      for (var i = 0; i < v.length; i++){
        if (v[i].team_name === arr[0] && v[i].opponent === arr[1]
          && v[i].date === arr[2] && v[i].time === arr[3]){
          $.post('http://127.0.0.1:3000/scorecard', {stats: v[i]}, function(result){
              if (result === 'Game not stored') __WEBPACK_IMPORTED_MODULE_1__toasts_toasts__["a" /* toasts */].notStoredInDb();
              if (result === 'Game stored') {
                __WEBPACK_IMPORTED_MODULE_1__toasts_toasts__["a" /* toasts */].storedInDb();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__deletesavedgame__["a" /* deleteSavedGame */])(arr);
              }
          });
        }
      }
    });
}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deletesavedgame_js__ = __webpack_require__(5);
/* harmony export (immutable) */ exports["a"] = toastDeleteGame;

function toastDeleteGame (savedGameArr){
  toastr.warning("Delete game on local drive?<br /><br /><button type='button' class='confirm-delete-game btn btn-danger'>Yes</button>")
  $('.confirm-delete-game').on('click', function(){
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__deletesavedgame_js__["a" /* deleteSavedGame */])(savedGameArr);
  });
}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scorecard_components_templates_blanktemplate__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scorecard_components_templates_goaliestemplate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scorecard_components_templates_playerstemplate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scorecard_components_templates_teamtemplate__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scorecard_components_displayashiteam__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scorecard_components_templates_savedgamestemplate__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scorecard_components_callbacks_plus__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scorecard_components_callbacks_minus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scorecard_components_callbacks_checkbox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scorecard_components_displayblankteam__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__scorecard_components_displaysavedgames__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__scorecard_components_callbacks_savetolocaldisk__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__scorecard_components_callbacks_getlocalsavedgames__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__scorecard_components_toasts_toastrsetoptions__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__scorecard_components_callbacks_getplayers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__scorecard_components_callbacks_resetScorecard__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__scorecard_components_callbacks_submitScorecard__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__scorecard_components_callbacks_savenotes__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__scorecard_components_callbacks_lockunlockcard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__scorecard_components_callbacks_teamselect__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__scorecard_components_toasts_toasts__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__scorecard_components_callbacks_editscorecard__ = __webpack_require__(6);























flatpickr('#flatpickr', {enableTime: true, allowInput: true});

$("#road-dropdown, #home-dropdown").on("change", __WEBPACK_IMPORTED_MODULE_19__scorecard_components_callbacks_teamselect__["a" /* teamSelect */]);

$('.save-notes').on('click', __WEBPACK_IMPORTED_MODULE_17__scorecard_components_callbacks_savenotes__["a" /* saveNotes */]);

$(".submit-scorecard").on('click', __WEBPACK_IMPORTED_MODULE_16__scorecard_components_callbacks_submitScorecard__["a" /* submitScorecard */]);

$('.save-to-local-disk').on('click', __WEBPACK_IMPORTED_MODULE_11__scorecard_components_callbacks_savetolocaldisk__["a" /* saveToLocalDisk */]);

$(".lock-unlock-scorecard").on('click', __WEBPACK_IMPORTED_MODULE_18__scorecard_components_callbacks_lockunlockcard__["a" /* lockUnlockCard */]);

$('.reset-scorecard').on('click', __WEBPACK_IMPORTED_MODULE_15__scorecard_components_callbacks_resetScorecard__["a" /* resetScorecard */]);

$('.edit-scorecard').on('click', __WEBPACK_IMPORTED_MODULE_21__scorecard_components_callbacks_editscorecard__["a" /* editScorecard */]);

$.get('/players', __WEBPACK_IMPORTED_MODULE_14__scorecard_components_callbacks_getplayers__["a" /* getPlayers */]);

localforage.getItem('ashi-data-store', __WEBPACK_IMPORTED_MODULE_12__scorecard_components_callbacks_getlocalsavedgames__["a" /* getLocalSavedGames */]);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__scorecard_components_toasts_toastrsetoptions__["a" /* toastrSetOptions */])();

__WEBPACK_IMPORTED_MODULE_20__scorecard_components_toasts_toasts__["a" /* toasts */].selectPlayers();

toastr.options.positionClass = "toast-top-center";


/***/ }
/******/ ]);