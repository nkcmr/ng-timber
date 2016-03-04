(function (global) {
  'use strict'
  var angular = typeof require === 'function' ? require('angular') : global.angular
  var modlog = typeof require === 'function' ? require('modlog') : global.modlog
  angular.module('ng-timber', [])
  function timber_provider () {
    var levels = ['error', 'warn', 'info', 'debug', 'silly']
    var log_level = 1
    var timestamp_format

    this.set_level = function (_new_level) {
      if (typeof _new_level === 'string') {
        _new_level = Math.max(0, levels.indexOf(_new_level))
      }
      log_level = Math.max(0, Math.min(levels.length, _new_level))
    }

    this.set_timestamp_format = function (format) {
      timestamp_format = format
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
          logger: _timber_log,
          format: timestamp_format
        })
      }
    }
  }
  angular.module('ng-timber').provider('timber', timber_provider)
})(this)
