(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['angular'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('angular'));
	} else {
		root.ngOnce = factory(root.angular);
	}
}(this, function (angular) {

	// Create the module
	return angular.module('ngOnce', []).config(['$provide', config]);

	// Configure the module
	function config($provide) {
		$provide.decorator('$rootScope', ['$delegate', decorate]);

		function decorate($delegate) {

			/**
			 * Registers an event handler that will be called only
			 * once when the event is triggered
			 * @param {string} event the name of the event to listen for
			 * @param {function} cb the function to be invoked when the event is triggered
			 */
			$delegate.$once = function (event, cb) {
				var deregistration = $delegate.$on(event, function () {
					// Remove the listener, and invoke the original callback
					deregistration();
					cb.apply(null, arguments);
				});
				return deregistration;
			};

			return $delegate;
		}
	}
}));
