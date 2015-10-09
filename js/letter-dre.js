/*global angular*/
(function () {
	'use strict';
	var letter = function ($rootScope, $interval, $timeout, LetterSvc) {
		return {
			templateUrl: 'letter.html',
			// controller : '',
			// restrict:'EA',
			scope: {
				val: '=',
				w: '=',
				h: '=',
				remove: '='
			},
			link: function ($scope, el, attr) {
				// console.log('letter', $scope, el, attr);
				// console.log('letter LetterSvc', LetterSvc);
				// console.log('parent', el.parent()[0].clientHeight);
				var maxW = el.parent()[0].clientWidth, // TODO get the max Width and height from the game directive
					maxH = el.parent()[0].clientHeight;

				var left = Math.floor(Math.random() * maxW);
				var top = Math.floor(Math.random() * maxH);
				var diff = left + parseInt(attr.w) - maxW;

				// console.log('diff', diff);
				if (diff > 0) {
					console.log('Out of border, so adjust with', diff);
					left -= diff;
				}

				var div = el.find('div');
				var counter = 1,
					letterInterval;

				// init letter element 
				div.css('width', attr.w + 'px');
				div.css('height', attr.h + 'px');
				div.css('background-color', 'rgba(0,0,0,0.3)');
				div.css('text-align', 'center');
				div.css('line-height', attr.h + 'px');
				div.append(attr.val);

				// position letter element 
				el.css('position', 'absolute');
				el.css('left', left + 'px');
				el.css('top', '0px');

				var selfDestroy = function () {
					// $interval.cancel(letterInterval);
					$timeout(function () {
						$scope.$destroy();
						el.remove();
					});
					// console.log('el self destroied', el);
				};

				var letterInterval = $interval(function () {
					counter += 1;
					el.css('left', left + 'px');
					var curPos = el.css('top');
					var pos = parseInt(curPos) + parseInt(attr.h);
					// console.log('curPos', pos);
					if (pos > maxH) {
						el.css('bottom', '-90px');
						el.css('top', null);
						$rootScope.$broadcast('updateScore', -1);
						$interval.cancel(letterInterval);
						LetterSvc.removeEl(attr.val);
					}
					el.css('top', pos + 'px');
				}, 2000);

				$scope.$on('stop', function () {
					// console.log('stop event letter');
					selfDestroy();
				});

				$scope.$on('$destroy', function () {
					console.log('destroy event happened');
					$interval.cancel(letterInterval);
				});
			}
		};
	};
	angular.module('letters').directive('letter', ['$rootScope', '$interval', '$timeout', 'LetterSvc', letter]);
})();