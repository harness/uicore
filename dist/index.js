(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Button/Button.css":
/*!******************************************!*\
  !*** ./src/components/Button/Button.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"button":"Button---button--4ZD5v"};

/***/ }),

/***/ "./src/components/Button/Button.tsx":
/*!******************************************!*\
  !*** ./src/components/Button/Button.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const react_1 = tslib_1.__importDefault(__webpack_require__(/*! react */ "react"));
const core_1 = __webpack_require__(/*! @blueprintjs/core */ "@blueprintjs/core");
const Button_css_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Button.css */ "./src/components/Button/Button.css"));
function default_1(props) {
    let { icon, href } = props;
    const Component = (href ? core_1.AnchorButton : core_1.Button);
    if (typeof icon === 'function') {
        const Icon = icon;
        icon = (react_1.default.createElement("span", { className: core_1.Classes.ICON },
            react_1.default.createElement(Icon, null)));
    }
    return react_1.default.createElement(Component, Object.assign({}, props, { icon: icon, className: Button_css_1.default.button }));
}
exports.default = default_1;


/***/ }),

/***/ "./src/components/Heading/Heading.css":
/*!********************************************!*\
  !*** ./src/components/Heading/Heading.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"h":"Heading---h--2pztZ"};

/***/ }),

/***/ "./src/components/Heading/Heading.tsx":
/*!********************************************!*\
  !*** ./src/components/Heading/Heading.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const react_1 = tslib_1.__importDefault(__webpack_require__(/*! react */ "react"));
const Heading_css_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Heading.css */ "./src/components/Heading/Heading.css"));
function Heading({ level = '1', id, children }) {
    const Tag = `h${level}`;
    return (react_1.default.createElement(Tag, { id: id, className: Heading_css_1.default.h }, children));
}
exports.default = Heading;


/***/ }),

/***/ "./src/components/Text/Text.css":
/*!**************************************!*\
  !*** ./src/components/Text/Text.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"t":"Text---t--3w3zm"};

/***/ }),

/***/ "./src/components/Text/Text.tsx":
/*!**************************************!*\
  !*** ./src/components/Text/Text.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const react_1 = tslib_1.__importDefault(__webpack_require__(/*! react */ "react"));
const Text_css_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Text.css */ "./src/components/Text/Text.css"));
function Text({ inline = true, children }) {
    const Tag = `${inline ? 'span' : 'p'}`;
    return react_1.default.createElement(Tag, { className: Text_css_1.default.t }, children);
}
exports.default = Text;
function test() {
    return react_1.default.createElement(Text, null, "Hello World");
}
exports.test = test;


/***/ }),

/***/ "./src/icons/Calendar.svg":
/*!********************************!*\
  !*** ./src/icons/Calendar.svg ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M2.8.1v1.4h-2V14h12.5V1.4h-2.1V.1H9.8v1.4H4.2V.1zm-.7 4.8h9.7v7.6H2.1z",
  fill: "#b6b8ba"
});

var SvgCalendar = function SvgCalendar(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgCalendar);

/***/ }),

/***/ "./src/icons/Clone.svg":
/*!*****************************!*\
  !*** ./src/icons/Clone.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M2.6.2c-.8 0-1.4.6-1.4 1.4v8.9h1.4v-9h6.8V.2zm2.7 2.7c-.8 0-1.4.6-1.4 1.4v8.2c0 .8.6 1.4 1.4 1.4h6.1c.8 0 1.4-.6 1.4-1.4V4.3c0-.8-.6-1.4-1.4-1.4zm0 1.4h6.1v8.2H5.3z",
  fill: "#b6b8ba"
});

var SvgClone = function SvgClone(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgClone);

/***/ }),

/***/ "./src/icons/Code.svg":
/*!****************************!*\
  !*** ./src/icons/Code.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M29.1 7.3l-12 34 3.8 1.3 12-34zM9.9 13.4L1.2 23.7.2 25l1.1 1.3L10 36.7l3.1-2.6L5.4 25l7.6-9.1zm30.2 0L37 15.9l7.6 9.1-7.6 9.1 3.1 2.6 8.6-10.3 1.1-1.3-1.1-1.3z",
  fill: "#fc6602"
});

var SvgCode = function SvgCode(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 50 50"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgCode);

/***/ }),

/***/ "./src/icons/Edit.svg":
/*!****************************!*\
  !*** ./src/icons/Edit.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M10.2 0c-.1 0-.1 0-.2.1L2.2 8l-.1.1L0 13.6c0 .1 0 .2.1.3s.2.1.3.1l5.5-2.1s.1 0 .1-.1l.4-.4c.1 0 .1-.1.2-.2l7.3-7.4c.1.1.1-.1.1-.2s-.1-.2-.2-.2-.2 0-.3.1l-7.3 7.3c-.2-.1-.6-.2-1-.2 0-.1.1-.2.2-.4 0-.4 0-.9-.4-1.2-.3-.4-.8-.4-1.2-.4-.1 0-.2.1-.3.1v-.1c0-.3-.1-.6-.3-.9L10.5.4c.1-.1.1-.2.1-.3-.1 0-.2-.1-.4-.1zM2.8 8.3c.1.1.1.3.1.4 0 .2-.1.4-.1.5s0 .3.1.4.3.1.4 0 .4-.2.7-.3.5 0 .7.1c.2.2.2.4.2.7s-.2.6-.3.7-.1.3 0 .4.2.2.4.1c.4-.1.7-.1.9 0l-.1.1-3.4 1.3-.9-.9 1.3-3.4z",
  fill: "#77787b"
});

var SvgEdit = function SvgEdit(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgEdit);

/***/ }),

/***/ "./src/icons/Filter.svg":
/*!******************************!*\
  !*** ./src/icons/Filter.svg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M51.039 7c0-4.596-12.577-7-25-7s-25 2.404-25 7c0 1.042.651 1.969 1.796 2.783l17.204 23.54v17.528c0 .43.256.813.652.979l.686.246 10.662-10.663v-8.087L49.224 9.809l-.001-.012c1.156-.817 1.816-1.75 1.816-2.797zm-25-5c14.04 0 23 2.961 23 5 0 .422-.404.883-1.135 1.349l-.051-.006.017.027C45.033 10.151 37.133 12 26.039 12 14.934 12 7.029 10.148 4.2 8.365l.017-.027-.412-.245c-.491-.378-.766-.749-.766-1.093 0-2.039 8.96-5 23-5zm4 38.586l-8 8V34h8zM30.533 32h-8.987L6.615 11.567C11.438 13.174 18.763 14 26.039 14s14.6-.826 19.424-2.432z"
});

var SvgFilter = function SvgFilter(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 52.077 52.077"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgFilter);

/***/ }),

/***/ "./src/icons/Help.svg":
/*!****************************!*\
  !*** ./src/icons/Help.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7 .1C3.2.1.1 3.2.1 7s3.1 6.9 6.9 6.9 6.9-3.1 6.9-6.9S10.8.1 7 .1zm0 1.2c3.2 0 5.7 2.6 5.7 5.7s-2.6 5.7-5.7 5.7S1.3 10.2 1.3 7 3.8 1.3 7 1.3zm0 2.3c-1.3 0-2.3 1-2.3 2.3h1.1c0-.6.5-1.1 1.1-1.1S8 5.3 8 5.9c0 .4-.3.8-.7 1h-.1c-.4.2-.8.6-.8 1.1v.7h1.1V8l.2-.1c.9-.3 1.5-1.1 1.5-2.1.1-1.2-.9-2.2-2.2-2.2zm-.6 5.7v1.1h1.1V9.3z",
  fill: "#b6b8ba"
});

var SvgHelp = function SvgHelp(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgHelp);

/***/ }),

/***/ "./src/icons/Ignored.svg":
/*!*******************************!*\
  !*** ./src/icons/Ignored.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7 0c-.6 0-1.1.5-1.1 1.1v.1c-1.8.5-3.2 2.2-3.2 4.2v4.8c0 .3-.2.5-.5.5h-.6v1.1h3.8c-.1.2-.1.3-.1.5.1.9.8 1.7 1.7 1.7s1.6-.7 1.6-1.6c0-.2 0-.4-.1-.5h3.8v-1.1h-.5c-.3 0-.5-.2-.5-.5V5.5c0-2-1.3-3.8-3.2-4.3v-.1C8.1.5 7.6 0 7 0zm-.2 2.2H7.1c1.7.1 3.1 1.6 3.1 3.4v4.7c0 .2 0 .4.1.5H3.7c.1-.2.1-.3.1-.5V5.4c0-1.7 1.3-3.1 3-3.2zm.2 9.6c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5c0-.2.2-.5.5-.5z",
  fill: "#b6b8ba"
});

var _ref2 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M13.222.07l.708.707L.848 13.86l-.707-.707z",
  fill: "#77787b"
});

var SvgIgnored = function SvgIgnored(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref, _ref2);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgIgnored);

/***/ }),

/***/ "./src/icons/List.svg":
/*!****************************!*\
  !*** ./src/icons/List.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M1.3.7C.7.7.2 1.2.2 1.8S.7 3 1.3 3s1.1-.5 1.1-1.1S1.9.7 1.3.7zm2.8.6v1.1h9.7V1.3zM1.3 5.9C.7 5.9.2 6.4.2 7s.5 1.1 1.1 1.1S2.4 7.6 2.4 7s-.5-1.1-1.1-1.1zm2.8.5v1.1h9.7V6.4zM1.3 11c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1S1.9 11 1.3 11zm2.8.6v1.1h9.7v-1.1z",
  fill: "#b6b8ba"
});

var SvgList = function SvgList(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgList);

/***/ }),

/***/ "./src/icons/Maximize.svg":
/*!********************************!*\
  !*** ./src/icons/Maximize.svg ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M.1 0v4.6h1.2V2l3.6 3.7.8-.8L2 1.2h2.7V0zm9.3 0v1.2H12L8.4 4.8l.8.8L12.8 2v2.7H14V0zM4.9 8.3L1.2 12V9.3H.1v4.6h4.6v-1.2H2l3.7-3.6zm4.3 0l-.8.8 3.7 3.6H9.4v1.2H14V9.3h-1.2V12z",
  fill: "#b6b8ba"
});

var SvgMaximize = function SvgMaximize(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgMaximize);

/***/ }),

/***/ "./src/icons/More.svg":
/*!****************************!*\
  !*** ./src/icons/More.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7 0c-.9 0-1.6.7-1.6 1.6S6.1 3.1 7 3.1s1.6-.7 1.6-1.6S7.9 0 7 0zm0 5.4c-.9 0-1.6.7-1.6 1.6S6.1 8.5 7 8.5 8.6 7.8 8.6 7 7.9 5.4 7 5.4zm0 5.5c-.9 0-1.6.7-1.6 1.6 0 .8.7 1.5 1.6 1.5s1.6-.7 1.6-1.6-.7-1.5-1.6-1.5z",
  fill: "#b6b8ba"
});

var SvgMore = function SvgMore(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgMore);

/***/ }),

/***/ "./src/icons/Note.svg":
/*!****************************!*\
  !*** ./src/icons/Note.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M1.6 0C.7 0 0 .7 0 1.6v8.3c0 .9.7 1.6 1.6 1.6h5l3.8 2.5v-2.5H12c.9 0 1.6-.7 1.6-1.6V1.6C13.6.7 12.9 0 12 0zm0 1H12c.3 0 .5.2.5.5v8.3c0 .3-.2.5-.5.5H9.3V12l-2.4-1.6H1.6c-.3 0-.6-.2-.6-.5V1.6c0-.3.3-.6.6-.6zm1.5 2.1v1h7.3v-1zm0 2.1v1h7.3v-1zm0 2.1v1h4.2v-1z",
  fill: "#b6b8ba"
});

var SvgNote = function SvgNote(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgNote);

/***/ }),

/***/ "./src/icons/Notification.svg":
/*!************************************!*\
  !*** ./src/icons/Notification.svg ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7 0c-.6 0-1.1.5-1.1 1.1v.1c-1.8.5-3.2 2.2-3.2 4.2v4.8c0 .3-.2.5-.5.5h-.6v1.1h3.8c-.1.2-.1.3-.1.5.1.9.8 1.7 1.7 1.7s1.6-.7 1.6-1.6c0-.2 0-.4-.1-.5h3.8v-1.1h-.5c-.3 0-.5-.2-.5-.5V5.5c0-2-1.3-3.8-3.2-4.3v-.1C8.1.5 7.6 0 7 0zm-.2 2.2H7.1c1.7.1 3.1 1.6 3.1 3.4v4.7c0 .2 0 .4.1.5H3.7c.1-.2.1-.3.1-.5V5.4c0-1.7 1.3-3.1 3-3.2zm.2 9.6c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5c0-.2.2-.5.5-.5z"
});

var SvgNotification = function SvgNotification(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgNotification);

/***/ }),

/***/ "./src/icons/Pause.svg":
/*!*****************************!*\
  !*** ./src/icons/Pause.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M3.1 3.1v7.8h3.1V3.1zm4.7 0v7.8h3.1V3.1z",
  fill: "#b6b8ba"
});

var SvgPause = function SvgPause(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgPause);

/***/ }),

/***/ "./src/icons/Play.svg":
/*!****************************!*\
  !*** ./src/icons/Play.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M3.1 2.5v9l7.7-4.4z",
  fill: "#b6b8ba"
});

var SvgPlay = function SvgPlay(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgPlay);

/***/ }),

/***/ "./src/icons/Plus.svg":
/*!****************************!*\
  !*** ./src/icons/Plus.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M6.4 0v6.4H0v1.3h6.4V14h1.3V7.7H14V6.4H7.6V0z",
  fill: "#77787b"
});

var SvgPlus = function SvgPlus(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgPlus);

/***/ }),

/***/ "./src/icons/Refresh.svg":
/*!*******************************!*\
  !*** ./src/icons/Refresh.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M8.9 2.6c-1-.4-2.2-.5-3.3-.2-2.1.7-3.5 2.7-3.4 4.9l-1.4.1C.6 4.5 2.4 1.9 5.1 1.1c1.6-.5 3.3-.3 4.8.5L11.3.1l.4 4.1-4.3.1zm0 10.3c-.6.2-1.2.3-1.9.3-1 0-2-.3-2.9-.8l-1.4 1.5-.4-4.1 4.3-.1L5 11.4c1.1.5 2.2.5 3.4.2 2.1-.7 3.5-2.7 3.3-4.9l1.4-.1c.3 2.9-1.5 5.5-4.2 6.3z",
  fill: "#b6b8ba"
});

var SvgRefresh = function SvgRefresh(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgRefresh);

/***/ }),

/***/ "./src/icons/Rerun.svg":
/*!*****************************!*\
  !*** ./src/icons/Rerun.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M10.5 0v2.1H2.8C1.6 2.1.7 3 .7 4.2V9l1.4-1.1V4.2c0-.4.3-.7.7-.7h7.7v2.1L14 2.8zm2.8 5.1l-1.4 1.1v3.6c0 .4-.3.7-.7.7H3.5V8.4L0 11.2 3.5 14v-2.1h7.7c1.2 0 2.1-.9 2.1-2.1z",
  fill: "#b6b8ba"
});

var SvgRerun = function SvgRerun(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgRerun);

/***/ }),

/***/ "./src/icons/Rollback.svg":
/*!********************************!*\
  !*** ./src/icons/Rollback.svg ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M4.1.6L0 3.5l4.1 3V4.7h4.7c1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9H0v2.3h8.8c2.9 0 5.2-2.4 5.2-5.3s-2.4-5.2-5.2-5.2H4.1z",
  fill: "#b6b8ba"
});

var SvgRollback = function SvgRollback(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgRollback);

/***/ }),

/***/ "./src/icons/Rotate.svg":
/*!******************************!*\
  !*** ./src/icons/Rotate.svg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7 0v1.4c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6S1.4 10.1 1.4 7c0-1.2.4-2.3 1-3.2l1.5 1.5 1-4.9-4.9 1 1.4 1.4C.6 4 0 5.5 0 7c0 3.9 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7z",
  fill: "#b6b8ba"
});

var SvgRotate = function SvgRotate(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgRotate);

/***/ }),

/***/ "./src/icons/Scope.svg":
/*!*****************************!*\
  !*** ./src/icons/Scope.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M1.1.5L0 1.6l1.1 2.2 1.6.5 1.9 1.9 1.1-1.1-1.9-1.9-.6-1.6zm9.7 0c-.9 0-1.8.3-2.5 1-.9.9-1 1.9-.5 2.9l-6.3 6.3c-.6.6-.6 1.7 0 2.3s1.7.6 2.3 0l6.3-6.3c1 .4 2.1.4 2.9-.5.9-.9 1.2-2.2.8-3.4l-2 2-1.7-.4-.4-1.7 2-2c-.3-.1-.6-.1-.9-.2zM10 8.4l-2 2 2.6 2.6c.6.6 1.5.6 2 0 .6-.6.6-1.5 0-2zm-7.3 2.9c.3 0 .5.2.5.5s-.2.6-.5.6-.5-.2-.5-.5.2-.6.5-.6z",
  fill: "#b6b8ba"
});

var SvgScope = function SvgScope(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgScope);

/***/ }),

/***/ "./src/icons/Search.svg":
/*!******************************!*\
  !*** ./src/icons/Search.svg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M5.6.1C2.6.1.2 2.5.2 5.5s2.4 5.4 5.4 5.4c1.1 0 2-.3 2.9-.8l3.9 3.9 1.3-1.3-3.8-4c.7-.9 1.1-2 1.1-3.2C11 2.5 8.6.1 5.6.1zm0 1.3c2.3 0 4.1 1.8 4.1 4.1S7.9 9.6 5.6 9.6 1.5 7.8 1.5 5.5s1.8-4.1 4.1-4.1z",
  fill: "#b6b8ba"
});

var SvgSearch = function SvgSearch(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgSearch);

/***/ }),

/***/ "./src/icons/Setup.svg":
/*!*****************************!*\
  !*** ./src/icons/Setup.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M21.7 13.6c0-.5.2-.9.2-1.4s0-.9-.2-1.1l2.7-1.8c.2-.2.5-.5.2-.9l-2.7-4.3c-.2-.2-.5-.5-.7-.2L18 5.3c-.5-.7-1.4-1.1-2.3-1.4L15.5.7c0-.5-.2-.7-.7-.7h-5c-.3 0-.6.2-.6.7L9 3.9c-.9.2-1.6.6-2.3 1.1L3.8 3.9c-.2-.2-.7 0-.7.2L.4 8.4c-.2.4-.2.7.2.9l2.5 2c0 .5-.2.9-.2 1.1 0 .5 0 .9.2 1.4L.6 15.6c-.2 0-.5.5-.2.9l2.5 4.3c.2.5.5.5.7.5l3.2-1.6c.7.7 1.4 1.1 2.3 1.4l.5 3.2c0 .5.2.7.7.7h5c.5 0 .7-.2.7-.7v-3.2c.9-.5 1.8-.7 2.3-1.4l2.9 1.4c.2.2.7 0 .7-.2l2.5-4.3c.2-.2.2-.7-.2-.9zm-9.3 3.9c-2.7 0-5-2.3-5-5s2.3-5 5-5 5 2.3 5 5-2.3 5-5 5",
  fill: "#00ade4"
});

var SvgSetup = function SvgSetup(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 25 25"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgSetup);

/***/ }),

/***/ "./src/icons/Star.svg":
/*!****************************!*\
  !*** ./src/icons/Star.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7.4.6L8.9 5l4.7.1c.4 0 .6.5.2.8L10 8.7l1.4 4.5c.1.4-.3.7-.6.5L7 10.9l-3.8 2.7c-.3.2-.8-.1-.6-.5L4 8.6.2 5.9c-.4-.3-.2-.8.2-.8L5.1 5 6.6.6c.1-.4.7-.4.8 0z",
  fill: "#b6b8ba"
});

var SvgStar = function SvgStar(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgStar);

/***/ }),

/***/ "./src/icons/Team.svg":
/*!****************************!*\
  !*** ./src/icons/Team.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M8.6 4.5C7.2 4.5 6 5.7 6 7.1s1.2 2.6 2.6 2.6 2.6-1.2 2.6-2.6-1.1-2.6-2.6-2.6zm6.8 0c-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6S18 8.6 18 7.1s-1.2-2.6-2.6-2.6zM8.6 6c.6 0 1.1.5 1.1 1.1s-.4 1.1-1.1 1.1-1.1-.4-1.1-1.1S8 6 8.6 6zm6.8 0c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.4-1.1 1.1-1.1zM5.2 9c-1.6 0-3 1.4-3 3 0 .8.4 1.6.9 2.1-1 .7-1.7 1.8-1.7 3.1H3C3 16 4 15 5.2 15s2.2 1 2.2 2.2H9c0-1.3-.7-2.4-1.7-3.1.6-.5.9-1.3.9-2.1 0-1.6-1.3-3-3-3zM9 17.2c-.5.6-.8 1.4-.8 2.2h1.5c0-1.3 1-2.2 2.2-2.2s2.2 1 2.2 2.2h1.5c0-.8-.3-1.6-.8-2.2l-.9-.9c.6-.5.9-1.3.9-2.1 0-1.6-1.4-3-3-3s-3 1.4-3 3c0 .8.4 1.6.9 2.1-.1.3-.4.6-.7.9zm6 0h1.5c0-1.3 1-2.2 2.2-2.2s2.2 1 2.2 2.2h1.5c0-1.3-.7-2.4-1.7-3.1.6-.5.9-1.3.9-2.1 0-1.6-1.4-3-3-3s-3 1.4-3 3c0 .8.4 1.6.9 2.1-.8.7-1.5 1.9-1.5 3.1zm-9.8-6.7c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5c.1-.8.7-1.5 1.5-1.5zm13.6 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5c-.1-.8.6-1.5 1.5-1.5zM12 12.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z"
});

var SvgTeam = function SvgTeam(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgTeam);

/***/ }),

/***/ "./src/icons/Trash.svg":
/*!*****************************!*\
  !*** ./src/icons/Trash.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M5.8 0c-.3 0-.6.1-.8.3s-.3.6-.3.9v.6H1.2V3h.6v9.3c0 1 .8 1.7 1.7 1.7h7c1 0 1.7-.8 1.7-1.7V2.9h.6V1.8H9.3v-.6c0-.3-.1-.6-.3-.8-.2-.3-.5-.4-.8-.4zm0 1.2h2.3v.6H5.8zM2.9 2.9H11v9.3c0 .3-.3.6-.6.6h-7c-.3 0-.6-.3-.6-.6V2.9zm1.2 1.8v6.4h1.2V4.7zm2.3 0v6.4h1.2V4.7zm2.3 0v6.4h1.2V4.7z",
  fill: "#77787b"
});

var SvgTrash = function SvgTrash(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgTrash);

/***/ }),

/***/ "./src/icons/User.svg":
/*!****************************!*\
  !*** ./src/icons/User.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M32 10c-7.7 0-14 6.3-14 14 0 4.8 2.5 9.1 6.2 11.6C17.1 38.7 12 45.8 12 54h4c0-8.9 7.1-16 16-16s16 7.1 16 16h4c0-8.2-5.1-15.3-12.2-18.4C43.5 33.1 46 28.8 46 24c0-7.7-6.3-14-14-14zm0 4c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z",
  fill: "#b6b8ba"
});

var SvgUser = function SvgUser(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 64 64"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgUser);

/***/ }),

/***/ "./src/icons/View.svg":
/*!****************************!*\
  !*** ./src/icons/View.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7 2C2.2 2 .4 6.8.4 6.8s1.8 4.8 6.7 4.8 6.7-4.8 6.7-4.8S11.9 2 7 2zm0 1.2c3.2 0 4.8 2.6 5.3 3.6-.5 1-2.2 3.6-5.3 3.6-3.2 0-4.8-2.6-5.3-3.6.5-1 2.2-3.6 5.3-3.6zm0 1.2c-1.3 0-2.4 1.1-2.4 2.4S5.7 9.3 7 9.3s2.4-1.1 2.4-2.4-1-2.5-2.4-2.5zm0 1.2c.7 0 1.2.5 1.2 1.2S7.7 8.1 7 8.1s-1.2-.6-1.2-1.3.6-1.2 1.2-1.2z",
  fill: "#b6b8ba"
});

var SvgView = function SvgView(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgView);

/***/ }),

/***/ "./src/icons/Yaml.svg":
/*!****************************!*\
  !*** ./src/icons/Yaml.svg ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M8.2 2l-3.4 9.5 1 .5 3.4-9.5zM2.8 3.8L.3 6.6 0 7l.3.4 2.4 2.9.9-.7L1.5 7l2.1-2.6zm8.4 0l-.9.7L12.5 7l-2.1 2.6.9.7 2.4-2.9.3-.4-.3-.4z",
  fill: "#fb5b07"
});

var SvgYaml = function SvgYaml(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgYaml);

/***/ }),

/***/ "./src/icons/index.ts":
/*!****************************!*\
  !*** ./src/icons/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const Calendar_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Calendar.svg */ "./src/icons/Calendar.svg"));
const Clone_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Clone.svg */ "./src/icons/Clone.svg"));
const Code_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Code.svg */ "./src/icons/Code.svg"));
const Edit_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Edit.svg */ "./src/icons/Edit.svg"));
const Filter_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Filter.svg */ "./src/icons/Filter.svg"));
const Help_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Help.svg */ "./src/icons/Help.svg"));
const Ignored_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Ignored.svg */ "./src/icons/Ignored.svg"));
const List_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./List.svg */ "./src/icons/List.svg"));
const Maximize_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Maximize.svg */ "./src/icons/Maximize.svg"));
const More_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./More.svg */ "./src/icons/More.svg"));
const Note_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Note.svg */ "./src/icons/Note.svg"));
const Notification_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Notification.svg */ "./src/icons/Notification.svg"));
const Pause_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Pause.svg */ "./src/icons/Pause.svg"));
const Play_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Play.svg */ "./src/icons/Play.svg"));
const Plus_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Plus.svg */ "./src/icons/Plus.svg"));
const Refresh_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Refresh.svg */ "./src/icons/Refresh.svg"));
const Rerun_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Rerun.svg */ "./src/icons/Rerun.svg"));
const Rollback_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Rollback.svg */ "./src/icons/Rollback.svg"));
const Rotate_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Rotate.svg */ "./src/icons/Rotate.svg"));
const Scope_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Scope.svg */ "./src/icons/Scope.svg"));
const Search_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Search.svg */ "./src/icons/Search.svg"));
const Setup_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Setup.svg */ "./src/icons/Setup.svg"));
const Star_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Star.svg */ "./src/icons/Star.svg"));
const Team_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Team.svg */ "./src/icons/Team.svg"));
const Trash_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Trash.svg */ "./src/icons/Trash.svg"));
const User_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./User.svg */ "./src/icons/User.svg"));
const View_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./View.svg */ "./src/icons/View.svg"));
const Yaml_svg_1 = tslib_1.__importDefault(__webpack_require__(/*! ./Yaml.svg */ "./src/icons/Yaml.svg"));
exports.default = {
    Calendar: Calendar_svg_1.default,
    Clone: Clone_svg_1.default,
    Code: Code_svg_1.default,
    Edit: Edit_svg_1.default,
    Filter: Filter_svg_1.default,
    Help: Help_svg_1.default,
    Ignored: Ignored_svg_1.default,
    List: List_svg_1.default,
    Maximize: Maximize_svg_1.default,
    More: More_svg_1.default,
    Note: Note_svg_1.default,
    Notification: Notification_svg_1.default,
    Pause: Pause_svg_1.default,
    Play: Play_svg_1.default,
    Plus: Plus_svg_1.default,
    Refresh: Refresh_svg_1.default,
    Rerun: Rerun_svg_1.default,
    Rollback: Rollback_svg_1.default,
    Rotate: Rotate_svg_1.default,
    Scope: Scope_svg_1.default,
    Search: Search_svg_1.default,
    Setup: Setup_svg_1.default,
    Star: Star_svg_1.default,
    Team: Team_svg_1.default,
    Trash: Trash_svg_1.default,
    User: User_svg_1.default,
    View: View_svg_1.default,
    Yaml: Yaml_svg_1.default
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./styles/colors.css */ "./src/styles/colors.css");
var Button_1 = __webpack_require__(/*! ./components/Button/Button */ "./src/components/Button/Button.tsx");
exports.Button = Button_1.default;
var Heading_1 = __webpack_require__(/*! ./components/Heading/Heading */ "./src/components/Heading/Heading.tsx");
exports.Heading = Heading_1.default;
var Text_1 = __webpack_require__(/*! ./components/Text/Text */ "./src/components/Text/Text.tsx");
exports.Text = Text_1.default;
var icons_1 = __webpack_require__(/*! ./icons */ "./src/icons/index.ts");
exports.Icons = icons_1.default;


/***/ }),

/***/ "./src/styles/colors.css":
/*!*******************************!*\
  !*** ./src/styles/colors.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "@blueprintjs/core":
/*!************************************!*\
  !*** external "@blueprintjs/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@blueprintjs/core");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map