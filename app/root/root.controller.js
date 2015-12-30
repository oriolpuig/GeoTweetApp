'use strict';
angular.module('geoTweetApp')
		.controller('rootController', 
			['$scope', 'twitterFactory', 'geolocationFactory', '$state',  
			function($scope, twitterFactory, geolocationFactory, $state){
				
				// Initialize TwitterFactory
				twitterFactory.initialize();
				
				$scope.VM = {
					currentUser: twitterFactory.currentUser == null ? "Oriol" : twitterFactory.currentUser,
					coords: geolocationFactory.coords,
					showSignOutBtn: false,
					getCurrentUser: _getCurrentUser,
					signOut: _signOut,
					tweets: {},
					geoTweets: {}
				};
				
				/***********/
				/* HELPERS */
				/***********/
				
				// SIGNOUT: Sign out and clear cache from current user.
				function _signOut(){
					twitterFactory.clearCache();
					$scope.VM.tweets.length = 0;
					$scope.VM.geoTweets.length = 0;
					$scope.VM.showSignOutBtn = false;
					$state.go('login');
				}
				
				// CURRENT USER: get basic data from current logged user.
				function _getCurrentUser() {
					twitterFactory
						.getCurrentUser();
						// .then(function(data) {
						// 	tweetsFactory.currentUser = data;
						// });	
				}
				
				
			}]);