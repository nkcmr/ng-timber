(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/* global define */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    global.modlog = factory()
  }
})(this, function () {
  'use strict'

  var is_node = typeof module === 'object' && module.exports
  var levels = ['error', 'warn', 'info', 'debug', 'silly']

  function defaults (obj, source) {
    if (typeof obj === 'undefined') {
      obj = {}
    }
    for (var k in source) {
      if (!obj.hasOwnProperty(k)) {
        obj[k] = source[k]
      }
    }
    return obj
  }

  function pad (num, size) {
    var s = num + ''
    while (s.length < size) s = '0' + s
    return s
  }

  function do_log () {
    var args = [].slice.call(arguments)
    var _level = args.shift()
    var _module_name = args.shift()

    var now = new Date()
    var ts = '[' + pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2) + ':' + pad(now.getSeconds(), 2) + ']'
    if (typeof args[0] === 'string') {
      args[0] = ts + '[' + _module_name + '] ' + args[0]
    } else {
      args.unshift(ts + '[' + _module_name + '] ')
    }
    if (typeof this.options.logger[_level] === 'function') {
      this.options.logger[_level].apply(this.options.logger, args)
    }
  }

  /**
   * get a default thing to log to. this is so we don't mess with the global `console`
   *
   * @return {object}
   */
  function get_default_logger () {
    var _logger = {}
    for (var idx in levels) {
      var _level = levels[idx]
      if (_level === 'silly') {
        _level = 'debug'
      }
      if (is_node && _level === 'debug') {
        // node.js does not actuall have console.debug. TIL.
        _level = 'info'
      }
      _logger[_level] = console[_level].bind(console)
    }
    return _logger
  }

  return function modlog_factory (module_name, options) {
    var _log = {}
    _log.options = defaults(options, {
      logger: get_default_logger()
    })
    for (var idx in levels) {
      _log[levels[idx]] = do_log.bind(_log, levels[idx], module_name)
    }
    return _log
  }
})

},{}],3:[function(require,module,exports){
(function (global) {
  'use strict'
  var angular = typeof require === 'function' ? require('angular') : global.angular
  var modlog = typeof require === 'function' ? require('modlog') : global.modlog
  angular.module('ng-timber', [])
  function timber_provider () {
    var levels = ['error', 'warn', 'info', 'debug', 'silly']
    var log_level = 1

    this.set_level = function (_new_level) {
      if (typeof _new_level === 'string') {
        _new_level = Math.max(0, levels.indexOf(_new_level))
      }
      log_level = Math.max(0, Math.min(levels.length, _new_level))
    }

    function filter_log_level () {
      var args = [].slice.call(arguments)
      var _level = args.shift()
      if (levels.indexOf(_level) <= log_level) {
        if (_level === 'silly') {
          _level = 'debug'
        }
        console[_level].apply(console, args)
      }
    }

    var _timber_log = {}
    levels.forEach(function (_level) {
      _timber_log[_level] = filter_log_level.bind(_timber_log, _level)
    })

    this.$get = function timber_provider () {
      return function (module_name) {
        return modlog(module_name, {
          logger: _timber_log
        })
      }
    }
  }
  angular.module('ng-timber').provider('timber', timber_provider)
})(this)

},{"angular":1,"modlog":2}]},{},[3]);
