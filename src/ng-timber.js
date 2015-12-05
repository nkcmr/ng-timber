(function (global) {
  /* global sessionStorage */
  'use strict'

  var angular = typeof require === 'function' ? require('angular') : global.angular

  angular.module('ng-timber', [])

  // @deprecated
  // will be removed in v2
  angular.module('timber', [])

  function timberProvider () {
    var debugModules = (sessionStorage || {}).debug || '*'
    var levels = {}
    this.LEVEL_SILLY = levels.silly = 4
    this.LEVEL_DEBUG = levels.debug = 3
    this.LEVEL_INFO = levels.info = 2
    this.LEVEL_WARN = levels.warn = 1
    this.LEVEL_ERROR = levels.error = 0

    var logLevel = this.LEVEL_WARN

    // console doesn't actually have a silly level
    // so just make it an alias of `debug`
    console.silly = console.debug

    this.setLevel = function (newLevel) {
      logLevel = newLevel
    }

    function timberFactory () {
      function Timber (_mod) {
        if (!(this instanceof Timber)) return new Timber(_mod)

        this.module = _mod

        this.silly = doLog.bind(this, 'silly')
        this.debug = doLog.bind(this, 'debug')
        this.info = doLog.bind(this, 'info')
        this.warn = doLog.bind(this, 'warn')
        this.error = doLog.bind(this, 'error')
      }

      function pad (num, size) {
        var s = num + ''
        while (s.length < size) s = '0' + s
        return s
      }

      function doLog () {
        var args = [].slice.call(arguments)
        var level = args.shift()
        var allowed
        var now
        var ts

        if (levels[level] <= logLevel) {
          now = new Date()
          ts = '[' + pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2) + ':' + pad(now.getSeconds(), 2) + ']'

          if (debugModules !== '*') {
            allowed = debugModules.split(',')
            if (allowed.indexOf(this.module) < 0) {
              return
            }
          }

          if (typeof args[0] === 'string') {
            args[0] = ts + '[' + this.module + '] ' + args[0]
          } else {
            args.unshift(ts + '[' + this.module + '] ')
          }

          console[level].apply(console, args)
        }
      }

      return Timber
    }

    this.$get = timberFactory
  }

  angular.module('ng-timber').provider('timber', timberProvider)

  // @deprecated
  // will be removed in v2
  angular.module('timber').provider('timber', timberProvider)
})(this)
