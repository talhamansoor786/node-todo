'user strict';
var app = angular.module('nodeApp', ['ngResource', 'ngCookies']);
var myApp = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngCookies'])
.config(['$routeProvider', '$compileProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $compileProvider, $locationProvider, $httpProvider) {

	$routeProvider
		
        .when('/todo', {
			controller: 'todoController',
            templateUrl: 'todo.html',
			controllerAs:'Ctrl'
        })
 
        .otherwise({ redirectTo: '/todo'});

		var imgSrcSanitizationWhitelist = /^\s*(https?|ftp|file|blob|content):|data:image\//;
		$compileProvider.imgSrcSanitizationWhitelist(imgSrcSanitizationWhitelist);
}]);