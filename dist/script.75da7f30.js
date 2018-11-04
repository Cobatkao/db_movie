// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"script.js":[function(require,module,exports) {
var paging = {
  init: function init() {
    this.$tab = $('footer > .bt-tab');
    this.$panel = $('main > section');
    this.bind();
  },
  bind: function bind() {
    var _this = this; //or arrow function


    this.$tab.on('click', function () {
      var index = $(this).index();
      $(this).addClass('fired').siblings().removeClass('fired');

      _this.$panel.eq(index).addClass('fired').siblings().removeClass('fired');
    });
  } //模板部分

};
var tpl = {
  isToBottom: function isToBottom($Viewport, $Content) {
    return $Viewport.height() + $Viewport.scrollTop() + 30 > $Content.height();
  },
  insertTpl: function insertTpl(ele) {
    var $node = $("\n      <div class=\"item\">\n        <a href=\"#\">\n          <div class=\"cover\">\n            <img src=\"\" alt=\"\">\n          </div>\n          <div class=\"detail\">\n            <h2></h2>\n            <div class=\"extra\">\n              <span class=\"score\"></span>  / <span class=\"collect\"></span>\u6536\u85CF\n            </div>\n            <div class=\"extra\">\n              <span class=\"year\"> / <span class=\"genres\"></span> \n            </div>\n            <div class=\"extra\">\n              <span class=\"director\"></span>\n            </div>\n            <div class=\"extra\">\n              <span class=\"casting\"></span>\n            </div>\n          </div>\n        </a>\n      </div>\n    ");
    $node.find('.cover img').attr("src", ele.images.small);
    $node.find('.detail h2').text(ele.title);
    $node.find('.extra .score').text(ele.rating.average);
    $node.find('.extra .collect').text(ele.collect_count);
    $node.find('.extra .year').text(ele.year);
    $node.find('.extra .genres').text(ele.genres.join(' / '));
    $node.find('.extra .director').text("\u5BFC\u6F14\uFF1A".concat(ele.directors.map(function (i) {
      return i.name;
    }).join('、')));
    $node.find('.extra .casting').text("\u6F14\u5458\uFF1A".concat(ele.casts.map(function (m) {
      return m.name;
    }).join('、')));
    return $node;
  } //top250页面

};
var top250Page = {
  init: function init() {
    var _this = this;

    this.$element = $('main');
    this.$content = this.$element.find('.container');
    this.isLoading = false;
    this.isFinishe = false;
    this.page = 0;
    this.count = 20;
    this.bind(); //data参数即数据到达后的ret

    this.getData(function (data) {
      _this.render(data);

      _this.page++;
    });
  },
  bind: function bind() {
    var _this = this;

    if (_this.clock) {
      clearTimeout(_this.clock);
    } else {
      _this.clock = setTimeout(function () {
        this.$element.on('scroll', function () {
          console.log(_this.isLoading);

          if (tpl.isToBottom(_this.$element, _this.$content) && !_this.isLoading && !_this.isFinishe) {
            console.log('reach bottom and ready to send data!');

            _this.getData(function (data) {
              _this.render(data);

              _this.page++;

              if (_this.count * _this.page >= data.total) {
                _this.isFinishe = true;
              }
            });
          }
        });
      }, 300);
    }
  },
  getData: function getData(callback) {
    var _this = this;

    console.log(_this.page);
    console.log(_this.count);
    if (_this.isLoading) return; //数据已发出，未到达

    _this.isLoading = true;

    _this.$element.find('.loader').addClass('fired');

    $.ajax({
      url: 'https://douban.uieee.com/v2/movie/top250',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        start: this.count * this.page,
        count: this.count //20

      }
    }).done(function (ret) {
      console.log(ret);
      _this.isLoading = false;

      _this.$element.find('.loader').removeClass('fired'); //执行回调


      callback(ret);
    }).fail(function (err) {
      console.log('数据异常:' + err);
    });
  },
  render: function render(data) {
    var _this = this;

    data.subjects.forEach(function (item) {
      var $node = tpl.insertTpl(item);

      _this.$content.append($node);
    });
  }
};
var usBoxPage = {
  init: function init() {
    this.$element = $('#beimei');
  },
  start: function start() {}
};
var searchPage = {
  init: function init() {},
  bind: function bind() {},
  start: function start() {}
};
var app = {
  init: function init() {
    //初始化页面
    paging.init();
    top250Page.init();
    usBoxPage.init();
    searchPage.init();
  } //初始化

};
app.init();
},{}],"../../.npm/_npx/4379/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55950" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../.npm/_npx/4379/lib/node_modules/parcel/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.map