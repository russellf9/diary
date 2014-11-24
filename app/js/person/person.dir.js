'use strict';

angular.module('myApp.directives');

myApp.directive('person', [function () {
	return {
		restrict: 'EA',
		scope: {
			thePerson: '='
		},
		controller: function ($scope, $filter) {

			console.log('person');

			$scope.remove = function (person) {
				console.log('remove: ', person);

				console.log('the: ',$scope.thePerson.firstName)
			};
		},
		link: function (scope, element, attributes) {
		},
		templateUrl: 'partials/person.html'
	}
}]);