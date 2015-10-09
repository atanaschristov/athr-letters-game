/*global angular*/
(function () {
	'use strict';
	var game = function ($interval, $document, $compile, $rootScope, LetterSvc) {
		return {
			templateUrl: 'game.html',
			// controller: 'GameController',
			// restrict:'EA',
			link: function ($scope, el, attr) {
				// console.log('game', $scope, el, attr);
				var game, main = el.find('div');

				var keyHandler = function (e) {
					var charVal = String.fromCharCode(e.charCode),
						letterEls = LetterSvc.get(charVal);
					if (!letterEls || letterEls.length < 2) {
						$rootScope.$broadcast('updateScore', -1);
					} else {
						for (var idx in letterEls) {
							letterEls[idx].scope.$destroy();
							letterEls[idx].el.remove();
							LetterSvc.removeAll(charVal);
						}
						$rootScope.$broadcast('updateScore', letterEls.length);
					}
				};

				var start = function () {
					$document.bind('keypress', keyHandler);
					game = $interval(function () {
						// console.log('test');
						var res = LetterSvc.generateLetter(),
							childScope = $scope.$new();
						var letterEl = $compile('<letter val="' + res.letter + '" w="' + res.size.width + '" h="' + res.size.height + '"></letter>')(childScope);
						// console.log(main);
						LetterSvc.add(res.letter, letterEl, childScope);
						main.append(letterEl);
					}, 1000);
				}

				$scope.$on('start', function () {
					start();
				});

				$scope.$on('stop', function () {
					$document.unbind('keypress', keyHandler);
					// el.find('letter').remove();
					if (game) {
						$interval.cancel(game);
						game = undefined;
					}
				});
			}
		};
	};
	angular.module('letters').directive('game', ['$interval', '$document', '$compile', '$rootScope', 'LetterSvc', game]);
})();