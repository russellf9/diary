'use strict';

angular.module('myApp.directives');

myApp.directives.directive('person', [function () {
	return {
		restrict: 'EA',
		scope: {},
		controller: function ($scope, $filter) {
		},
		link: function (scope, element, attributes) {
		},
		templateUrl: 'partials/person.html'
	}
}]);