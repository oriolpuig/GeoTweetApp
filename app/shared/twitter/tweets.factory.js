'use strict';
angular.module('geoTweetApp')
	.factory('twitterFactory', 
		['$q', '$log', function($q, $log){
			
			var authorizationResult = false;
			
			var factory = {
				coords: null,
				currentUser: null,
				initialize: _initialize,
				isReady: _isReady,
				connectToTwitter: _connectToTwitter,
				clearCache: _clearCache,
				getLastetsTweets: _getLatestTweets,
				getLocatedTweets: _getLocatedTweets,
				getCurrentUser: _getCurrentUser
			};			
			
			return factory; 
			
			function _initialize(){
				// Initialize OAuth.io with public key of the application
				// TODO: Oriol Puig set up this part
				OAuth.initialize('Ltbu6ajQt9XUmIexZExRc5yYP7Q', { cache: true });
	
				// try to create an authorization result when the page loads, 
				// this means a returning user won't have to click the twitter button again
				authorizationResult = OAuth.create('twitter');
			}

			function _isReady(){
				return authorizationResult;
			}
			
			function _connectToTwitter(){
				var def = $q.defer();
				
				OAuth.popup('twitter',
					{ cache: true }, //cache means to execute the callback if the tokens are already present
					function(error, result) {
						if (!error) {
							authorizationResult = result;
							def.resolve();
						} else {
							//do something if there's an error
							$log.error(error.message);
						}
					});
					
				return def.promise;
			}
			
			function _clearCache(){
				OAuth.clearCache('twitter');
				authorizationResult = false;
			}			
			
			// function _getLastestTweets(){
			// 	var def = $q.defer();
			// 	
			// 	// https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
			// 	authorizationResult
			// 		.get('/1.1/statuses/home_timeline.json')
			// 		.done(function(data){
			// 			def.resolve(data);
			// 		});
			// 		
			// 	return def.promise;
			// }
			
			function _getLocatedTweets(lat, lon, ratio){
				var def = $q.defer();
				
				// https://dev.twitter.com/rest/reference/get/search/tweets
				authorizationResult
					.get('/1.1/search/tweets.json?q=""&geocode="' + lat + ',' + lon + ',' + ratio + '"')
					.done(function (data) {
						def.resolve(data);
					})
					.fail(function(err) {
						def.reject(err);
					});
					
				return def.promise;
			}
			
			function _getLatestTweets(maxId) {
				var def = $q.defer();
				var url = '/1.1/statuses/home_timeline.json';
				if (maxId) {
					url += '?max_id=' + maxId;
				}
				
				// https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
				authorizationResult
					.get(url)
					.done(function(data) {
						def.resolve(data);
					})
					.fail(function(err) {
						def.reject(err);
					});

				return def.promise;
			}
			
			function _getCurrentUser(){
				var def = $q.defer();
				
				authorizationResult
					.me()
					.done(function (data) {
						factory.currentUser = data;
						def.resolve(data);
					})
					.fail(function(error){
						def.reject(error);
					});
				
				return def.promise;
			}
		}]);