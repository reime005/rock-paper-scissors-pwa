(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TEST_ACTION = exports.TEST_ACTION = 'TEST_ACTION';

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testAction = testAction;

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function testAction(test) {
  return {
    type: types.TEST_ACTION,
    test: test
  };
}

},{"./actionTypes":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _testObject = require("./testObject");

var _store = require("./store");

var _initialState = require("./initialState");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
  function App() {
    _classCallCheck(this, App);

    this.store = new _store.Store(_initialState.initialState);
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var parent = document.getElementById("container");
      new _testObject.TestObject({ store: this.store, parent: parent, id: 'testId' });
    }
  }]);

  return App;
}();

var app = new App();

window.addEventListener('load', function () {
  return app.init();
});

},{"./initialState":4,"./store":5,"./testObject":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = exports.initialState = {
  test: "initialState_test"
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actionTypes = require('./actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function () {
  function Store(initialState) {
    _classCallCheck(this, Store);

    this.state = initialState;
    this.subscribers = [];
  }

  _createClass(Store, [{
    key: 'dispatch',
    value: function dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.notifySubscribers();
      return action;
    }
  }, {
    key: 'reducer',
    value: function reducer(state, action) {
      var nextState = state || this.state;

      switch (action.type) {
        case types.TEST_ACTION:
          nextState = _extends({}, state, {
            test: action.test
          });
          break;
        default:
      }

      return nextState;
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

},{"./actions/actionTypes":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require("./actions/actions");

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

      div.innerHTML = innerText(this.store.getState().test);

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

},{"./actions/actions":2}]},{},[3]);
