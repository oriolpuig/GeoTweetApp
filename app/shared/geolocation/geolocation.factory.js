'use-strict';
angular.module('geoTweetApp')
		.factory('geolocationFactory', 
			['geolocation', '$q', 
			function(geolocation, $q){
				
				var factory = {
					coords: null,
					getCurrentLocation: _getCurrentLocation
				}
				
				return factory; 
				
				function _getCurrentLocation(){
					var def = $q.defer();
					
					geolocation
						.getLocation()
						.then(function (data) {
							factory.coords = { 
									lat: data.coords.latitude, 
									long: data.coords.longitude 
								};
							def.resolve(data);
						}, function(error){
							def.reject(error);
						});
					
					return def.promise;
				}
			}]);