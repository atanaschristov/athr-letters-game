/*global angular*/
(function () {
	'use strict';
	var LetterSvc = function () {
		var letters = {};
		var randomLetter = function () {
			var result,
				letters = 'abcd';

			result = letters.charAt(Math.floor(Math.random() * (letters.length)));
			return result;
		};
		var randomSize = function () {
			var max = 70, // pixels
				min = 20,
				size = {
					width: null,
					height: null
				};

			size.width = min + Math.floor(Math.random() * max);
			size.height = size.width;
			return size;
		};

		var self = {
			generateLetter: function () {
				return {
					letter: randomLetter(),
					size: randomSize()
				}
			},
			add: function (charVal, el, scope) {
				if (!letters[charVal]) {
					letters[charVal] = [];
				}
				letters[charVal].push({
					el: el,
					scope: scope
				});
				// console.log(letters);
			},
			get: function (charVal) {
				return letters[charVal];
			},
			removeAll: function (charVal) {
				delete letters[charVal];
			},
			removeEl: function (charVal) {
				if (letters[charVal] instanceof Array && letters[charVal].length > 0) {
					letters[charVal].shift();
				}
			}
		};
		return self;
	};
	angular.module('letters').service('LetterSvc', [LetterSvc]);
})();