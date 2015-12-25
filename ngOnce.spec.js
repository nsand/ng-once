describe('ng-once', function () {
	'use strict';

	beforeEach(module('ngOnce'));

	var $rootScope;
	beforeEach(inject(function (_$rootScope_) {
		$rootScope = _$rootScope_;
	}));

	it('should add a function called $once to $rootScope', function () {
		expect($rootScope.$once).to.be.a('function');
	});

	it('should invoke the event handler', function () {
		var $event, $sound;
		$rootScope.$once('ngOnce.sound', function (event, sound) {
			$event = event.name;
			$sound = sound;
		});
		$rootScope.$broadcast('ngOnce.sound', 'boop');
		expect($event).to.equal('ngOnce.sound');
		expect($sound).to.equal('boop');
	});

	it('should invoke the event handler only once', function () {
		var $event, $sound;
		$rootScope.$once('ngOnce.sound', function (event, sound) {
			$event = event.name;
			$sound = sound;
		});
		$rootScope.$broadcast('ngOnce.sound', 'boop');
		$rootScope.$broadcast('ngOnce.sound', 'bang');
		$rootScope.$broadcast('ngOnce.sound', 'pow');
		expect($event).to.equal('ngOnce.sound');
		expect($sound).to.equal('boop');
	});

	it('should work with child scopes as well', function () {
		var child = $rootScope.$new();
		expect(child.$once).to.be.a('function');

		var $event, $sound;
		child.$once('ngOnce.sound', function (event, sound) {
			$event = event.name;
			$sound = sound;
		});
		$rootScope.$broadcast('ngOnce.sound', 'boop');
		expect($event).to.equal('ngOnce.sound');
		expect($sound).to.equal('boop');
	});

	it('should return the deregistration function', function () {
		var deregistration = $rootScope.$once('ngOnce.sound', function () {});
		expect(deregistration).to.be.a('function');
	});
});
