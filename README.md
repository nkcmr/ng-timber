## ng-timber
a sane logger for angular.js

### why?
because you depend on the console to be informative and concise, not a tangled mess of randomly formatted console messages.

### installation
**ng-timber** is available via npm and bower

```
npm install ng-timber
```
*or*

```
bower install ng-timber
```
then just `require` it or load it via a script tag. whatever you environment demands.

don't forget to load it in your module definition

```js
angular.module('myApp', ['ng-timber'])
// or
angular.module('myApp', require('ng-timber'))
```

now you're ready to use it

```js
function MyCoolCtrl (timber, $scope) {
  var log = timber('MyCoolCtrl')
  log.debug('yah, im cool')
}
MyCoolCtrl.$inject = ['timber']
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
there are a few things you can configure with `ng-timber`

```js
angular.config(['timberProvider', function (timberProvider) {
  // set the level of logging. can be error, warn, info, debug or silly
  timberProvider.set_level(x)
  
  // set the format of the timestamp (see 
  // https://secure.php.net/manual/en/function.date.php for formatting options)
  timberProvider.set_timestamp_format('H:i:s.u')
}]);
```

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
