"use strict";
angular.module('geoTweetApp', [
	
	// oauth Module
  
  	// geolocation Module
  	'geolocation', 
  
  	// ui-riuter Module
  	'ui.router'])
	  
	  .config(function($stateProvider, $urlRouterProvider){
		  $urlRouterProvider.otherwise('/login');
		  
		  $stateProvider
		  	.state('home', {
				  url:'/home',
				  controller:'tweetsController',
				  templateUrl: '/app/tweets/tweets.html',
				  authenticate: true
			  })
			.state('login', {
				url: '/login',
				controller: 'loginController',
				templateUrl: '/app/login/login.html',
				authenticate: false
			});
	  })
	  .run(function($rootScope, $state, twitterFactory){
		  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState){
			if(toState.authenticate && ! twitterFactory.isReady()){
				$state.transitionTo('login');
				e.preventDefault();
			}			  
		  });
	  });