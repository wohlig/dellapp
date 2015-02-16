// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    /*Sidemenu Pages*/

    .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/profile.html",
                    controller: 'ProfileCtrl'
                }
            }
        })
        .state('app.postinfo', {
            url: "/postinfo",
            views: {
                'menuContent': {
                    templateUrl: "templates/postinfo.html",
                    controller: 'PostinfoCtrl'
                }
            }
        })
        .state('app.suggestpost', {
            url: "/suggestpost",
            views: {
                'menuContent': {
                    templateUrl: "templates/suggestpost.html",
                    controller: 'SuggestpostCtrl'
                }
            }
        })
        /*Simple Pages*/

    .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'
        })
        .state('login1', {
            url: "/login1",
            templateUrl: "templates/login1.html",
            controller: 'Login1Ctrl'
        })

    .state('welcome', {
        url: "/welcome",
        templateUrl: "templates/welcome.html",
        controller: 'WelcomeCtrl'
    })

    .state('landing', {
            url: "/landing",
            templateUrl: "templates/landing.html",
            controller: 'LandingCtrl'
        })
        .state('editprofile', {
            url: "/editprofile",
            templateUrl: "templates/editprofile.html",
            controller: 'EditprofileCtrl'
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});