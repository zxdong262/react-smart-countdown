(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["SmartCountdown"] = factory(require("react"));
	else
		root["SmartCountdown"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SmartCountDown = function (_React$Component) {
	  _inherits(SmartCountDown, _React$Component);
	
	  function SmartCountDown(props) {
	    _classCallCheck(this, SmartCountDown);
	
	    var _this = _possibleConstructorReturn(this, (SmartCountDown.__proto__ || Object.getPrototypeOf(SmartCountDown)).call(this, props));
	
	    _initialiseProps.call(_this);
	
	    var count = _this.props.count;
	
	    _this.state = {
	      total: count + 0,
	      count: count,
	      state: 'init',
	      onCountdown: false,
	      pause: false
	    };
	    return _this;
	  }
	
	  _createClass(SmartCountDown, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var changer = nextProps.changer,
	          state = nextProps.state;
	
	      if (changer === this.props.changer) return;
	      this.setState({
	        state: state
	      });
	      this[state]();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.timer);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;
	
	      return children(this.state);
	    }
	  }]);
	
	  return SmartCountDown;
	}(_react2.default.Component);
	
	SmartCountDown.propTypes = {
	  changer: _react.PropTypes.number,
	  state: _react2.default.PropTypes.oneOf(['init', 'start', 'pause', 'resume', 'reset']), // 'init', 'start', 'pause', 'reset'
	  children: _react.PropTypes.func,
	  count: _react.PropTypes.number
	};
	SmartCountDown.defaultProps = {
	  count: 60, //60 seconds
	  state: 'init',
	  children: function children(_ref) {
	    var count = _ref.count,
	        onCountdown = _ref.onCountdown;
	
	    return _react2.default.createElement(
	      'button',
	      {
	        type: 'button',
	        disabled: onCountdown
	      },
	      count,
	      's'
	    );
	  }
	};
	
	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;
	
	  this.init = function () {
	    _this2.reset();
	  };
	
	  this.pause = function () {
	    _this2.setState({
	      pause: true
	    });
	  };
	
	  this.resume = function () {
	    _this2.setState({
	      pause: false
	    });
	  };
	
	  this.reset = function () {
	    clearTimeout(_this2.timer);
	    _this2.setState({
	      pause: false,
	      count: _this2.state.total,
	      onCountdown: false,
	      state: 'init'
	    });
	  };
	
	  this.count = function () {
	    var _state = _this2.state,
	        count = _state.count,
	        pause = _state.pause;
	
	    var nextCount = count - 1;
	    if (nextCount < 0) nextCount = 0;
	
	    var state = {
	      count: nextCount
	    };
	
	    if (!nextCount) {
	      return _this2.reset();
	    }
	
	    if (!pause) {
	      _this2.setState(state);
	    }
	
	    _this2.timer = setTimeout(_this2.count, 1000);
	  };
	
	  this.start = function () {
	    _this2.setState({
	      onCountdown: true
	    });
	    _this2.timer = setTimeout(_this2.count, 1000);
	  };
	};
	
	module.exports = exports.default = SmartCountDown;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;