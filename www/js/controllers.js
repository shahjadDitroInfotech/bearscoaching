angular.module('starter.controllers', ['ui.router','ui.validate'])


//myApp.controller('userController',['$scope', '$http','$rootScope','$state', '$stateParams', function ($scope,$http,$rootScope,$state, $stateParams)
.controller('AppCtrl', function(Auth,$scope,$http, $ionicModal,API_URL,$location,$state,$window,$localStorage, $sessionStorage,$timeout,$ionicSideMenuDelegate) {

	//$scope.$on('$ionicView.leave', function () { $ionicSideMenuDelegate.canDragContent(true) });
	$scope.adminData = $localStorage.adminData;
	$scope.forgetData = $sessionStorage.forgetData;
	

	$scope.loginData = {}
		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function() {
			$scope.modal.hide();
		};		
		if(!Auth.isLoggedIn()){
			$ionicSideMenuDelegate.canDragContent(false);
			$state.go("app.login");	
		}
		$scope.logout = function() {

			
			Auth.logout();
			$ionicSideMenuDelegate.canDragContent(false);
			$state.go("app.login");
		};
		$scope.dashBoard = function() {

			$state.go("app.dashboard");
		};


	})


/******* Perform the login action when the user submits the login form ********/


.controller('LoginCtrl', function(Auth,$scope,$http, API_URL,$ionicModal,$location,$state,$window,$localStorage, $sessionStorage,$timeout,$ionicSideMenuDelegate,UserService) {
	
	$scope.$on('$ionicView.leave', function () { $ionicSideMenuDelegate.canDragContent(true) });
	$scope.adminData = $localStorage.adminData;
	$scope.serverpath = UserService.serverpath;
	$scope.doLogin = function() {

		$http({
			method: 'POST',
			url: API_URL+'api/teacherlogin',
			data: {email:$scope.loginData.username,password:$scope.loginData.password},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
		.then(function successCallback(response) 
		{

			console.log(response.data);

			function isObjectHasData(object)
			{ 

				return (object != null && typeof object != 'undefined' && Object.keys(object).length > 0);
			}

			if(isObjectHasData(response.data))
			{

				$scope.dp = response.data;
				//localStorage.clear();
				$localStorage.adminData =  $scope.dp;
				//console.log($localStorage.adminData)
				window.localStorage['session'] = $localStorage.adminData.name;
			//$scope.$on('$ionicView.leave', function () { $ionicSideMenuDelegate.canDragContent(true) });
			$state.go('app.dashboard');
		}
		else 
		{
			alert("Invalid email or pasword");
			//$state.go('app.dashboard');

		}
	}, function errorCallback(response) 
	{
		console.log(response);
		// $state.go('app.dashboard');

		alert("Invalid email or pasword");
	});
	};

})

.controller('StudentsCtrl', function(Auth,$scope,$sce,$http,$stateParams,API_URL,$ionicModal,$location,$state,$window,$localStorage, $sessionStorage,$timeout,$ionicSideMenuDelegate,$ionicScrollDelegate,UserService) {

	//localStorage.clear();
	$scope.studData = $localStorage.studData;
	$scope.studentpath = UserService.studentpath;
	$scope.classvideos  = UserService.classvideos;
	$scope.classID = $localStorage.classID;
	$scope.indVideo = $localStorage.indoorVideos;
	$scope.outVideo = $localStorage.outdoorVideos;
	$scope.levelData = $localStorage.levelData;
	$localStorage.levelname   = $stateParams.levelname;
	$scope.levelname = $localStorage.levelname;
	$scope.levelname12 = $localStorage.levelname123;
	$scope.studetail = $localStorage.studentDetail;
	 $scope.today = new Date();
	//$scope.dateinformtion = '2017-06-08';






/*  this function is used for showing the all Classes or levels  */
	$scope.levels = function() {

		$http({

			url: API_URL + '/api/classes',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
		.then(function successCallback(response) 
		{
			function isObjectHasData(object)
			{ 

				return (object != null && typeof object != 'undefined' && Object.keys(object).length > 0);
			}

			if(isObjectHasData(response.data))
			{

					 //localStorage.clear();
					 $scope.dp = response.data;
					 $localStorage.levelData =  $scope.dp;

					/*angular.forEach($localStorage.levels, function(user, arrayID) 
					{
						alert(user.name);
					});*/
					$state.go('app.levels');
				}
				else 
				{
					alert("Data is not available");
					//$state.go('app.dashboard');

				}
			}, function errorCallback(response) 
			{
				console.log(response);
		// $state.go('app.dashboard');

		alert("Data is not available");
	});
	};

	/*  this function is used for sgenerate trus url for video  */
	$scope.getIframeSrc = function (videoId) {

		return   $sce.trustAsResourceUrl($scope.classvideos + videoId);
	};






	/*  this function is used for show  student information like image and name  */


	$scope.studentsData = function() {
		
		
		$http({
			method: 'POST',
			url: API_URL+'api/students',
			data: {level_id:$stateParams.levelID},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
		.then(function successCallback(response) 
		{
			function isObjectHasData(object)
			{ 

				return (object != null && typeof object != 'undefined' && Object.keys(object).length > 0);
			}

			if(isObjectHasData(response.data)){

				//localStorage.clear();
				$scope.dp = response.data;
				$localStorage.studData =  $scope.dp;
				$localStorage.levelname123 = $stateParams.levelname;
				//debugger;
				//console.log($localStorage.levelname);

				$state.go('app.students');
			}
			else {
				alert("Data is not available");
					//$state.go('app.dashboard');
				}
			}, function errorCallback(response) 
			{
				console.log(response);
		// $state.go('app.dashboard');

		alert("Data is not available");
	});
	}



	$scope.studentDetail = function(studentID){
		$http({

			method:"POST",
			url:API_URL+"api/studentdetail",
			data:{studentId:studentID},
			headers:{ 
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
		})
		.then(function successCallback(response){

			function isObjectHasData(object)
			{ 

				return (object != null && typeof object != 'undefined' && Object.keys(object).length > 0);
			}
			if(isObjectHasData(response.data)){

				$scope.dp = response.data;
				$localStorage.studentDetail = $scope.dp;
			
				$state.go('app.studentdetail');

			}else{

				alert("data is not available");

			}

		   },function errorCallback(response){

				alert("data is not available");
			});
	}
















	$scope.classVideos = function() {	

		$localStorage.classID = $stateParams.levelID;
		$state.go('app.classvideos');

	}


	/*  this function is used for showing the indoor videos of a particular Class or level  */
	$scope.indoorVideos = function() {

		$http({
			method: 'POST',
			url: API_URL+'api/indoor',
			data: {classID:$scope.classID,video_category:1},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
		.then(function successCallback(response) 
		{
			function isObjectHasData(object)
			{ 

				return (object != null && typeof object != 'undefined' && Object.keys(object).length > 0);
			}

			if(isObjectHasData(response.data)){

				//localStorage.clear();
				$scope.dp = response.data;
				$localStorage.indoorVideos =  $scope.dp;
				console.log($localStorage.indoorVideos);
				//debugger;
				$state.go('app.classindoorvideos');
			}
			else {
				alert("Data is not available");
					//$state.go('app.dashboard');
				}
			}, function errorCallback(response) 
			{
				console.log(response);
		// $state.go('app.dashboard');

		alert("Data is not available");
	});


	}

	/*  this function is used for showing the outdoor videos of a particular Class or level  */

	$scope.outdoorVideos = function() {


		

		$http({		

			method: 'POST',
			url: API_URL +"api/outdoor",
			data: {classID:$scope.classID,video_category:2},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
		.then(function successCallback(response) 
		{
			function isObjectHasData(object)
			{ 

				return (object != null && typeof object != 'undefined' && Object.keys(object).length > 0);
			}

			if(isObjectHasData(response.data)){

						//localStorage.clear();
						$scope.dp = response.data;
						$localStorage.outdoorVideos =  $scope.dp;
						//console.log($localStorage.outdoorVideos);
					//	debugger;
					$state.go('app.classoutdoorvideos');
				}
				else {
					alert("Data is not available");
							//$state.go('app.dashboard');
						}
					}, function errorCallback(response) 
					{
						console.log(response);
				// $state.go('app.dashboard');

				alert("Data is not available");
			});
	}



})







.controller('VideosCtrl', function(Auth,$scope,$http, $ionicModal,$location,$state,$window,$localStorage, $sessionStorage,$timeout,$ionicSideMenuDelegate,API_URL) {


	$scope.levels = function() {

		$state.go("app.videos");

	};
})

.controller('NewsCtrl', function(Auth,$scope,$http, $ionicModal,$location,$state,$window,$localStorage, $sessionStorage,$timeout,$ionicSideMenuDelegate,API_URL) {


	/*$scope.levels = function() {

		$state.go("app.news");

	};*/
})
.controller('CommunityCtrl', function(Auth,$scope,$http, $ionicModal,$location,$state,$window,$localStorage, $sessionStorage,$timeout,$ionicSideMenuDelegate,API_URL) {
/*	$scope.levels = function() {

		$state.go("app.community");

	};*/
})
