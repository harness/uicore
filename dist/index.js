// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"+9S6":[function(require,module,exports) {
module.exports = {};
},{}],"tqPW":[function(require,module,exports) {
module.exports = {
  "button": "_button_f283c"
};
},{}],"UvYq":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importDefault(require("react"));

const core_1 = require("@blueprintjs/core");

const Button_css_1 = __importDefault(require("./Button.css"));

function default_1(props) {
  let {
    icon,
    href
  } = props;
  const Component = href ? core_1.AnchorButton : core_1.Button;

  if (typeof icon === 'function') {
    const Icon = icon;
    icon = react_1.default.createElement("span", {
      className: core_1.Classes.ICON
    }, react_1.default.createElement(Icon, null));
  }

  return react_1.default.createElement(Component, Object.assign({}, props, {
    icon: icon,
    className: Button_css_1.default.button
  }));
}

exports.default = default_1;
},{"./Button.css":"tqPW"}],"Q8ge":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var _ref =
/*#__PURE__*/
_react.default.createElement("path", {
  d: "M2.8.1v1.4h-2V14h12.5V1.4h-2.1V.1H9.8v1.4H4.2V.1zm-.7 4.8h9.7v7.6H2.1z",
  fill: "#b6b8ba"
});

var SvgCalendar = function SvgCalendar(props) {
  return _react.default.createElement("svg", _extends({
    viewBox: "0 0 14 14"
  }, props), _ref);
};

var _default = SvgCalendar;
exports.default = _default;
},{}],"i4TH":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const Calendar_svg_1 = __importDefault(require("./Calendar.svg"));

exports.default = {
  Calendar: Calendar_svg_1.default
};
},{"./Calendar.svg":"Q8ge"}],"7QCb":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./styles/colors.css"); //
// Note: Consumers of this lib needs to add Blueprint CSS themselves
//
// import '@blueprintjs/core/lib/css/blueprint.css'
//


const Button_1 = __importDefault(require("./components/button/Button"));

exports.Button = Button_1.default;

const icons_1 = __importDefault(require("./icons"));

exports.Icons = icons_1.default;
},{"./styles/colors.css":"+9S6","./components/button/Button":"UvYq","./icons":"i4TH"}]},{},["7QCb"], null)
//# sourceMappingURL=/index.js.map