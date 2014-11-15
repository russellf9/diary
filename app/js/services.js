(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', [])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

     .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }])

	.factory('contactsList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('contacts', {limit: 50, endAt: null});
    }]);

})();

