(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_GAME_MODE = exports.SET_GAME_MODE = 'SET_GAME_MODE';

var PLAYER1_CHOICE = exports.PLAYER1_CHOICE = 'PLAYER1_CHOICE';
var PLAYER2_CHOICE = exports.PLAYER2_CHOICE = 'PLAYER2_CHOICE';

var NEW_GAME = exports.NEW_GAME = 'NEW_GAME';

var ROUND_END = exports.ROUND_END = 'ROUND_END';
var ROUND_RESTART = exports.ROUND_RESTART = 'ROUND_RESTART';

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.player1ChoiceAction = player1ChoiceAction;
exports.player2ChoiceAction = player2ChoiceAction;
exports.roundEndAction = roundEndAction;
exports.roundRestartAction = roundRestartAction;
exports.newGameAction = newGameAction;
exports.setGameMode = setGameMode;

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function player1ChoiceAction(player1Choice) {
  return {
    type: types.PLAYER1_CHOICE,
    player1Choice: player1Choice
  };
}

function player2ChoiceAction(player2Choice) {
  return {
    type: types.PLAYER2_CHOICE,
    player2Choice: player2Choice
  };
}

function roundEndAction() {
  return {
    type: types.ROUND_END
  };
}

function roundRestartAction() {
  return {
    type: types.ROUND_RESTART
  };
}

function newGameAction() {
  return {
    type: types.NEW_GAME
  };
}

function setGameMode(gameMode) {
  return {
    type: types.SET_GAME_MODE,
    gameMode: gameMode
  };
}

},{"./actionTypes":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameModes = exports.gameModes = {
  PVC: 0,
  CVC: 1
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _gameModes = require("./gameModes");

var _players = require("./players");

var initialState = exports.initialState = {
  player1Choice: undefined,
  player2Choice: undefined,
  outcome: undefined,
  outcomeMessage: undefined,
  player1Count: 0,
  player2Count: 0,
  started: false,
  gameMode: _gameModes.gameModes.PVC,
  currentWinner: _players.players.NONE
};

},{"./gameModes":3,"./players":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var outcomes = exports.outcomes = {
  WON: 0,
  LOST: 1,
  TIE: 2
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var players = exports.players = {
  NONE: 0,
  ONE: 1,
  TWO: 2
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weapons;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var weaponTypes = exports.weaponTypes = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2
};

var weapons = exports.weapons = (_weapons = {}, _defineProperty(_weapons, weaponTypes.ROCK, {
  beats: [weaponTypes.SCISSORS]
}), _defineProperty(_weapons, weaponTypes.SCISSORS, {
  beats: [weaponTypes.PAPER]
}), _defineProperty(_weapons, weaponTypes.PAPER, {
  beats: [weaponTypes.ROCK]
}), _weapons);

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _testObject = require("./testObject");

var _store = require("./store");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
  function App() {
    _classCallCheck(this, App);

    this.store = new _store.Store();
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var parent = document.getElementById("container");
      //new TestObject({store: this.store, parent, id: 'testId'});
    }
  }]);

  return App;
}();

var app = new App();

window.addEventListener('load', function () {
  return app.init();
});

},{"./store":15,"./testObject":16}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareWeapons = compareWeapons;

var _outcomes = require("../config/outcomes");

var _weapons = require("../config/weapons");

var _exception = require("./exception");

function compareWeapons(weaponP1, weaponP2) {
  if (weaponP2 >= 0 && weaponP1 >= 0 && weaponP1 === weaponP2) {
    return _outcomes.outcomes.TIE;
  } else if (_weapons.weapons[weaponP1] && _weapons.weapons[weaponP1].beats.includes(weaponP2)) {
    return _outcomes.outcomes.WON;
  } else if (_weapons.weapons[weaponP2] && _weapons.weapons[weaponP2].beats.includes(weaponP1)) {
    return _outcomes.outcomes.LOST;
  }

  throw new _exception.Exception("Not a valid type: " + weaponP1 + ", " + weaponP2);
}

},{"../config/outcomes":5,"../config/weapons":7,"./exception":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exception = Exception;
function Exception(message) {
  this.message = message;
  this.name = 'Exception';
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getCurrentWinningPlayer = getCurrentWinningPlayer;

var _players = require("../config/players");

function getCurrentWinningPlayer(state) {
  var player1Count = state.player1Count,
      player2Count = state.player2Count;

  var nextState = state;

  if (player1Count < player2Count) {
    nextState = _extends({}, nextState, {
      currentWinner: _players.players.TWO
    });
  } else if (player1Count > player2Count) {
    nextState = _extends({}, nextState, {
      currentWinner: _players.players.ONE
    });
  } else if (player1Count === player2Count) {
    nextState = _extends({}, nextState, {
      currentWinner: _players.players.NONE
    });
  }

  return nextState;
}

},{"../config/players":6}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessageForOutcome = getMessageForOutcome;

var _outcomes = require("../config/outcomes");

var _exception = require("./exception");

function getMessageForOutcome(outcome) {
  switch (outcome) {
    case _outcomes.outcomes.LOST:
      return "Player 1 has lost!";
    case _outcomes.outcomes.WON:
      return "Player 1 has won!";
    case _outcomes.outcomes.TIE:
      return "It's a tie!";
    default:
      throw new _exception.Exception("Invalid outcome: " + outcome);
  }
}

},{"../config/outcomes":5,"./exception":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomChoice = getRandomChoice;

var _weapons = require("../config/weapons");

function getRandomChoice() {
  return Math.floor(Math.random() * _weapons.weaponTypes.SCISSORS + 1 + 0);
}

},{"../config/weapons":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('./actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _compareWeapons = require('./lib/compareWeapons');

var _getMessageForOutcome = require('./lib/getMessageForOutcome');

var _initialState = require('./config/initialState');

var _getRandomChoice = require('./lib/getRandomChoice');

var _outcomes = require('./config/outcomes');

var _players = require('./config/players');

var _getCurrentWinningPlayer = require('./lib/getCurrentWinningPlayer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (state, action) {
  var nextState = state;

  switch (action.type) {
    case types.PLAYER1_CHOICE:
      if (nextState.player1Choice !== _initialState.initialState.player1Choice) {
        break;
      }

      // "AI" player 1
      var player1Choice = action.player1Choice;
      if (player1Choice === _initialState.initialState.player1Choice) {
        player1Choice = (0, _getRandomChoice.getRandomChoice)();
      }

      nextState = _extends({}, nextState, {
        player1Choice: player1Choice
      });

      break;
    case types.PLAYER2_CHOICE:
      if (nextState.player2Choice !== _initialState.initialState.player2Choice) {
        break;
      }

      // "AI" player 2
      var player2Choice = action.player2Choice;
      if (player2Choice === _initialState.initialState.player2Choice) {
        player2Choice = (0, _getRandomChoice.getRandomChoice)();
      }

      nextState = _extends({}, nextState, {
        player2Choice: player2Choice
      });
    case types.ROUND_END:
      if (nextState.outcome !== _initialState.initialState.outcome) {
        break;
      }

      var outcome = (0, _compareWeapons.compareWeapons)(nextState.player1Choice, nextState.player2Choice);

      if (outcome === _outcomes.outcomes.WON) {
        nextState = _extends({}, nextState, {
          player1Count: nextState.player1Count + 1
        });
      } else if (outcome === _outcomes.outcomes.LOST) {
        nextState = _extends({}, nextState, {
          player2Count: nextState.player2Count + 1
        });
      }

      nextState = (0, _getCurrentWinningPlayer.getCurrentWinningPlayer)(nextState);

      nextState = _extends({}, nextState, {
        outcome: outcome,
        outcomeMessage: (0, _getMessageForOutcome.getMessageForOutcome)(outcome)
      });
      break;
    case types.SET_GAME_MODE:
      if (nextState.started === true) {
        break;
      }

      nextState = _extends({}, nextState, {
        gameMode: action.gameMode,
        started: true
      });
      break;
    case types.NEW_GAME:
      nextState = _extends({}, nextState, {
        player1Count: _initialState.initialState.player1Count,
        player2Count: _initialState.initialState.player2Count,
        started: _initialState.initialState.started,
        currentWinner: _initialState.initialState.currentWinner
      });
    case types.ROUND_RESTART:
      nextState = _extends({}, nextState, {
        outcome: _initialState.initialState.outcome,
        outcomeMessage: _initialState.initialState.outcomeMessage,
        player1Choice: _initialState.initialState.player1Choice,
        player2Choice: _initialState.initialState.player2Choice
      });
      break;
    default:
  }

  return nextState;
};

},{"./actions/actionTypes":1,"./config/initialState":4,"./config/outcomes":5,"./config/players":6,"./lib/compareWeapons":9,"./lib/getCurrentWinningPlayer":11,"./lib/getMessageForOutcome":12,"./lib/getRandomChoice":13}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _initialState = require('./config/initialState');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.state = _initialState.initialState;
    this.subscribers = [];
  }

  _createClass(Store, [{
    key: 'dispatch',
    value: function dispatch(action) {
      this.state = (0, _reducer2.default)(this.state, action);
      this.notifySubscribers();
      return action;
    }
  }, {
    key: 'notifySubscribers',
    value: function notifySubscribers() {
      var _this = this;

      this.subscribers.forEach(function (subscriber) {
        subscriber(_this.state);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(fn) {
      this.subscribers.push(fn);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }]);

  return Store;
}();

},{"./config/initialState":4,"./reducer":14}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require("./actions/actions");

var _weapons = require("./config/weapons");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestObject = exports.TestObject = function () {
  function TestObject(props) {
    _classCallCheck(this, TestObject);

    this.store = props.store;
    this.parent = props.parent;
    this.id = props.id;

    this._load();
  }

  _createClass(TestObject, [{
    key: "_load",
    value: function _load() {
      var _this = this;

      var div = document.getElementById(this.id);
      this.div = div;

      var innerText = function innerText(text) {
        return "<span>" + text + "</span>";
      };

      console.log(this.store.getState().weapons[_weapons.weaponTypes.SCISSORS]);

      div.innerHTML = innerText(this.store.getState().weapons[_weapons.weaponTypes.SCISSORS].beats);

      this.store.subscribe(function (state) {
        _this.div.innerHTML = innerText(state.test);
      });

      div.onclick = function () {
        _this.store.dispatch((0, _actions.testAction)('Clicked'));
      };
    }
  }]);

  return TestObject;
}();

},{"./actions/actions":2,"./config/weapons":7}]},{},[8]);
