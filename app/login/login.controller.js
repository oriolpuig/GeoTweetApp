'use strict';
angular.module('geoTweetApp').controller('loginController', 
	['$scope', 'twitterFactory', '$state', '$log',
		function($scope, twitterFactory, $state, $log){
			
			// Security
			// if(twitterFactory.isReady()){
			// 	$state.go('home');
			// }
			// twitterFactory.initialize();
			
			$scope.VM = {
				signIn : _signIn
			};
			
			function _signIn(){
				twitterFactory
					.connectToTwitter()
					.then(
						function(){
							debugger;
							if (twitterFactory.isReady()) {
								twitterFactory.getCurrentUser();
								$state.go('home');
							}
						},
						function(error){
							$log.error(error);
						});
			}
		}]);