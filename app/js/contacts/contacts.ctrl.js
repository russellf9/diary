'use strict';


myAppControllers.controller('ContactsCtrl', ['$scope', 'contactsList', function($scope, contactsList) {
   
	console.log('ContactsCtrl')
	$scope.contacts = contactsList;
   $scope.addPerson = function(person) {
     if( person ) {
		console.log('Ok add person: ', person)
      $scope.contacts.$add({'firstName': person.firstName, 'lastName' : person.lastName});
     }
   };
 }])