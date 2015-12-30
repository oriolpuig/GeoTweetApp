'use strict';
angular.module('geoTweetApp').controller('tweetsController', 
	['$scope', 'twitterFactory', 'geolocationFactory', '$state', '$log',
		function($scope, twitterFactory, geolocationFactory, $state, $log){
			// Security
			if (twitterFactory.isReady()) {
				debugger;
				$scope.$parent.currentUser = twitterFactory.currentUser;
				if(geolocationFactory.coords != null){
					_getTweetsByCoords();
				}else{
					geolocationFactory
						.getCurrentLocation()
						.then(
							_getTweetsByCoords,
							function(error){
								$log.error(error);
							});
				}
				_getTweetsByCoords();
			} else {
				$state.go('login');
			}
			
			$scope.VM.PageTitle = "GeoTweets";
			
			// $scope.$watch('coords', function(n,o){
			// 	debugger;
			// });

			/***********/   
			/* HELPERS */
			/***********/
				 
			// TWEETS BY COORDINATES: get tweets byy coordinates from browser.
			function _getTweetsByCoords() {
				if (geolocationFactory.coords != null) {
					var ratio = '1km';
					twitterFactory
						.getLocatedTweets(geolocationFactory.coords.lat, geolocationFactory.coords.long, ratio)
							.then(function (data) {
								$scope.VM.tweets = data.statuses;
							});
				}
			};			  
			 
		}]);