## timber
a sane logger for angular.js

### why?
because you depend on the console to be informative and concise, not a tangled mess of randomly formatted console messages.

### installation
drop the script tag in your DOM

```html
<script src="/path/to/ng-timber.js"></script>
```

don't forget to load it in your module definition

```js
angular.module('myApp', ['timber']);
```

now you're ready to use it

```
// @ngInject
function MyCoolCtrl(timber, $scope) {
  var log = timber('MyCoolCtrl');
  log.debug('yah, im cool');
}
```

### usage
using timber is pretty much what you'd expect.

first declare the module being logged
```js
var log = timber('AuthService');
```

then just log messages with their corresponding level

```js
// silly level is used for very, very detailed logs
log.silly('this is a very silly message');

// debug info, obviously
log.debug('this happened, did x not happen?');

log.info('pretty important info, but not critical');

log.warn('okay, something is not right');

log.error('you should check if something is on fire or something');
```

### configuration
configuring timber is pretty easy too. to set the allowed log levels, just do this:

```js
angular.config(['timberProvider', function(timberProvider){
  timberProvider.setLevel(x);
  
  // where x is a number between 0 and 4
  // 0 - errors only
  // 1 - warn and error
  // 2 - info, warn, error
  // 3 - debug, info, warn, error
  // 4 - all
}]);
```

to only allow certain modules to log, type this into the developer console:

```js
sessionStorage.debug = 'ThisCtrl,ThatService';
```

to allow all again, just set that to `*`.

### licence
```
The MIT License (MIT)

Copyright (c) 2015 Nick Comer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```