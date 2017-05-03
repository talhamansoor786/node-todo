'use strict';
app.controller("registrationCtrl", ['$http', '$location', '$resource', '$timeout', '$rootScope', '$cookies', function($http, $location, $resource, $timeout, $rootScope, $cookies){
	
	var that = this;
	this.submitBtnText = 'Create Account';
	this.gender = 'F';
	var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	this.submit = function(){
		if(!regexEmail.test(this.email)){
			this.errorText = 'Email Address Is Not Valid';
			return false;
		}
		if(this.password !== this.confirmPassword){
			this.errorText = 'Password and Confirm Password Doesn\'t Match';
			return false;
		}
		var data = {
			name: that.name,
			email: this.email,
			gender:this.gender,
			password:this.password,
			confirmPassword:this.confirmPassword
		};
		this.submitBtnText = 'Loading...';
		$http({
			method:'POST',
			url:'http://127.0.0.1:3000/register',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
		}).then( function successCallBack(response){
			var response = response;
			console.log(response.data.userId);
			if(response.data.status){
				$cookies.put('userId', response.data.userId);
				$cookies.put('username', that.name);
			}else{
				that.errorText = response.data.message;
			}
			that.submitBtnText = 'Create Account';
		}, function errorCallBack(response){
			this.status = status;
		});
	}

}]);