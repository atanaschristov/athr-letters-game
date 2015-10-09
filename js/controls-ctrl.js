/*global angular*/
(function () {
	'use strict';
	var ControlsController = function ($scope, $rootScope, $timeout) {
		$scope.score = 0;
		$scope.started = false;

		$scope.toggle = function () {
			if (!$scope.started) {
				$scope.started = true;
				$rootScope.$broadcast('start');
			} else {
				$scope.started = false;
				$rootScope.$broadcast('stop');
				$scope.score = 0;
			}
		};

		$scope.$on('updateScore', function (e, val) {
			// console.log('update score', val);
			$timeout(function () {
				$scope.score += val;
			});
		});
	};
	angular.module('letters').controller('ControlsController', ['$scope', '$rootScope', '$timeout', ControlsController]);
})();