'use strict';


myAppControllers.controller('ContactsCtrl', ['$scope', 'contactsList', 'fbutil', function ($scope, contactsList, fbutil) {

	console.log('ContactsCtrl');
	$scope.contacts = contactsList;


	$scope.addPerson = function (person) {
		if (person) {
			console.log('Ok add person: ', person)
			var promise = $scope.contacts.$add({'firstName': person.firstName, 'lastName': person.lastName});

			promise.then(function (result) {
				console.log('add person path: ', result.path.toString());
			})
		}
	};

	var ref = fbutil.ref('contacts');

	// adds the unique firebase $id as an id on the same level as the other properties
	ref.on('child_added', function (snapshot) {
		console.log('child added!')
		var dataRef = fbutil.ref('contacts/' + snapshot.name());
		dataRef.child('id').set(snapshot.name()); // this will create a self refrence on the object as well
	});


	$scope.remove = function (index, person) {

		// the value of all the contacts
		var ref = fbutil.ref('contacts');

		console.log('delete this person: ', person)

		// console.log('A ref: ', ref);
		// console.log('B ref: ', ref.toString()); // will return the path or url
		// console.log('C name ', ref.name()); // will be `contacts`
		console.log('person: ', person)

		// each data element will have it's own firebase id
		console.log('person ', person.$id)

		// use the $id property to remove a singular item,
		// rather than using the $remove on the array		
		var deletePath = fbutil.ref('contacts/' + person.$id);

		deletePath.remove();

		// we could also use the `snap shot to get all the data!`
		ref.once('value', function (nameSnapshot) {
			var val = nameSnapshot.val();
			console.log('value: ', val)
		});

		// this works - will replace all the data at the 'contacts' level
		//ref.set({'test':'russell'})

		// the front end array method to use
		//$scope.contacts.$remove(person)
	};
	$scope.testData = function () {

		// the path for all the contacts
		var ref = fbutil.ref('contacts');

		//	console.log('ref: ',ref.path.toString()); // /contacts

		ref.once('value', function (snapshot) {

			var contacts = snapshot.val();
			var name = snapshot.name();

			snapshot.forEach(function (contact) {
				//console.log('contact | key: ', contact.key()); // will not have key
				console.log('21:56 -> child: ', contact);
				console.log('contact | value: ', contact.val());
				// ths snapshots' val property will have a reference to all the data
				var id = contact.val().contacts.id;
				console.log('id: ', id);
			})

			// see if we can modify outside the $scope
			// THIS IS WHAT I WAS LOOKING FOR - SIMPLE!
			var list = contactsList;

			angular.forEach(list, function (person) {
				// like this we get the $id property!
				var ref = fbutil.ref(person.$id);
				//console.log('path: ',ref.path.toString()); // like `/-JapL5dyvURrthbHDwX5`
				//var addPath = fbutil.ref('contacts' + ref.path.toString());
				var addPath = fbutil.ref('contacts/' + person.$id);

				// successfully added data to each node!
				addPath.child('new').update({'name': 'grace'});

			});
		});

		// look at the array now...
		// angular.forEach($scope.contacts, function(contact){
		// 			console.log('contact: ',contact)
		// 		})

	};

	// will have to return a $promise
	var getContacts = function () {
		var ref = fbutil.ref('contacts');
		ref.once('value', function (nameSnapshot) {
			return nameSnapshot.val();
		});
	};

	$scope.removeAll = function () {
		var ref = fbutil.ref('contacts');
		ref.remove();
	};
	// test to run through all the data
	$scope.addToAll = function () {
		var data = {"id": '-JaoxFN-jOvFxyt-WkL6'};

		var ref = fbutil.ref('contacts');

		ref.once('value', function (nameSnapshot) {

			var contacts = nameSnapshot.val();
			var name = nameSnapshot.name();

			angular.forEach(contacts, function (contact) {
				var dataRef = fbutil.ref('contacts/' + contact.id);
				dataRef.child('contacts').update(data);
			})
		});
	};
}])