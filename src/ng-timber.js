(function(global) {
  'use strict';

  angular.module('timber', []);

  function timberProvider() {
    var debugModules = (sessionStorage || {}).debug || '*',
      logLevel = 1,
      levels = {
        silly: 4,
        debug: 3,
        info: 2,
        warn: 1,
        error: 0
      };

    // console doesn't actually have a silly level
    // so just make it an alias of `debug`
    console.silly = console.debug;

    this.setLevel = function(newLevel) {
      if (!_.isNumber(newLevel) || newLevel < 0 || newLevel > 4)
        throw new Error('timber: setLevel needs a number from 0 and 4');

      logLevel = newLevel;
    }

    function timberFactory() {

      function timber(module) {
        if (!(this instanceof timber)) return new timber(module);

        this.module = module;

        this.silly = doLog.bind(this, 'silly');
        this.debug = doLog.bind(this, 'debug');
        this.info = doLog.bind(this, 'info');
        this.warn = doLog.bind(this, 'warn');
        this.error = doLog.bind(this, 'error');
      }

      function pad(num, size) {
        var s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
      }

      function doLog() {
        var args = [].slice.call(arguments),
          level = args.shift(),
          allowed,
          now,
          ts;

        if (levels[level] <= logLevel) {

          now = new Date();
          ts = '[' + pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2) + ':' + pad(now.getSeconds(), 2) + ']';

          if (debugModules != '*') {
            allowed = debugModules.split(',');
            if (allowed.indexOf(this.module) < 0)
              return;
          }

          if (_.isString(args[0]))
            args[0] = ts + '[' + this.module + '] ' + args[0];
          else
            args.unshift(ts + '[' + this.module + '] ');

          console[level].apply(console, args);
        }
      }

      return timber;
    }

    this.$get = timberFactory;
  }

  angular.module('timber').provider('timber', timberProvider);

})(this);
