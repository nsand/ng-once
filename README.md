# ng-once
ng-once is a module that introduces `$rootScope.$once`. This allows an event handler to
be bound to an event, but it will be invoked only once.

## Installation

### Bower
```bash
$ bower install ng-once --save
```

### npm
```bash
$ npm install ng-once
```

## Usage

```javascript
angular.module('demo').controller('DemoCtrl', function ($rootScope) {
	$rootScope.$once('$routeChangeSuccess', function () {
		// This function will be invoked on only the first $routeChangeSuccess
	});
});
```
