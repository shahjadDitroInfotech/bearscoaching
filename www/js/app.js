// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ui.router','ngStorage'])

.constant('API_URL', 'http://dev.ditroinfotech.com/bearscoaching/')

.run(function($ionicPlatform, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
})


.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.factory('Auth', function () {


   if (window.localStorage['session']) { 

      var _user = window.localStorage['session'];
   }


   var setUser = function (session) {
      _user = session;
      window.localStorage['session'] = JSON.stringify(_user);
   }

   return {
      setUser: setUser,
      isLoggedIn: function () {
         return _user ? true : false;
      },
      getUser: function () {
         return _user;
      },
      logout: function () {
         window.localStorage.removeItem("session");
         window.localStorage.removeItem("list_dependents");
         _user = null;
      }
   }
})

.factory('UserService', function(API_URL) {

  return {

    serverpath : API_URL+'media/images/teachers',

    studentpath : API_URL+'media/images/student',

    classvideos : API_URL+'media/images/sport/videos/',

  }


})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

 .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'StudentsCtrl'
      }
    }
  })

.state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'AppCtrl'
      }
    }
  })

.state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'LoginCtrl'
      }
    }
  })

/*  Controller of the students */



.state('app.levels', {
    url: '/levels',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/levels.html',
        controller: 'StudentsCtrl'
      }
    }
  })

.state('app.studentvideo', {
    url: '/studentvideo/:levelID/:levelname',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/studentVideo.html',
        controller: 'StudentsCtrl'
      }
    }
  })


.state('app.students', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/students.html',
        controller: 'StudentsCtrl'
      }
    }
  })


.state('app.studentdetail', {
    url: '/studentdetail/:levelID',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/studentdetail.html',
        controller: 'StudentsCtrl'
      }
    }
  })










.state('app.classvideos', {
    url: '/classvideos',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/classIndoorOutdoorVideos.html',
        controller: 'StudentsCtrl'
      }
    }
  })

.state('app.classindoorvideos', {
    url: '/classindoorvideos',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/classindoorvideos.html',
        controller: 'StudentsCtrl'
      }
    }
  })

.state('app.classoutdoorvideos', {
    url: '/classoutdoorvideos',
    views: {
      'menuContent': {
        templateUrl: 'templates/students/classoutdoorvideos.html',
        controller: 'StudentsCtrl'
      }
    }
  })




/*  Controller of the videos */



.state('app.videos', {
    url: '/videos',
    views: {
      'menuContent': {
        templateUrl: 'templates/videos/videos.html',
        controller: 'VideosCtrl'
      }
    }
  })


.state('app.indoorvideos', {
    url: '/indoorvideos',
    views: {
      'menuContent': {
        templateUrl: 'templates/videos/indoorvideos.html',
        controller: 'VideosCtrl'
      }
    }
  })

.state('app.outdoorvideos', {
    url: '/outdoorvideos',
    views: {
      'menuContent': {
        templateUrl: 'templates/videos/indoorvideos.html',
        controller: 'VideosCtrl'
      }
    }
  })








/*  Controller of the news */

.state('app.news', {
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/news/news.html',
        controller: 'NewsCtrl'
      }
    }
  })

/*  Controller of the community */
.state('app.community', {
    url: '/community',
    views: {
      'menuContent': {
        templateUrl: 'templates/community/community.html',
        controller: 'CommunityCtrl'
      }
    }
  })







    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');




});



