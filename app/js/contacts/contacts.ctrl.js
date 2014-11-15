'use strict';


myAppControllers.controller('ContactsCtrl', ['$scope', 'contactsList', 'fbutil', function($scope, contactsList, fbutil) {
   
    console.log('ContactsCtrl')
    $scope.contacts = contactsList;
    $scope.addPerson = function(person) {
        if( person ) {
            console.log('Ok add person: ', person)
            var promise = $scope.contacts.$add({'firstName': person.firstName, 'lastName' : person.lastName});
			
			promise.then(function(result){
				console.log('path: ', result.path.toString());
			})
        }
    };
	$scope.remove = function(index, person){
		
		// the value of all the contacts
		var ref = fbutil.ref('contacts');
		
		// console.log('A ref: ', ref);
		// console.log('B ref: ', ref.toString()); // will return the path or url
		// console.log('C name ', ref.name()); // will be `contacts`
		
		// each data element will have it's own firebase id
		console.log('person ', person.$id)
		
		// use the $id property to remove a singular item,
		// rather than using the $remove on the array		
		var deletePath = fbutil.ref('contacts/' + person.$id);

		deletePath.remove();
		
		// we could also use the `snap shot to get all the data!`
		ref.once('value', function(nameSnapshot) {
		  var val = nameSnapshot.val();
		  console.log('value: ', val)
		});
		
		// this works - will replace all the data at the 'contacts' level
		//ref.set({'test':'russell'})
		
		//$scope.contacts.$remove(person)
	};
 }])