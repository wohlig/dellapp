angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('Login1Ctrl', function ($scope, $stateParams) {})

.controller('WelcomeCtrl', function ($scope, $stateParams) {})

.controller('LandingCtrl', function ($scope, $stateParams) {})

.controller('ProfileCtrl', function ($scope, $stateParams) {})

.controller('EditprofileCtrl', function ($scope, $stateParams) {

    $scope.mkopen = function () {
        console.log("cbd");
        if ($scope.shldopens == "openprf") {
            $scope.shldopens = "";
        } else {
            $scope. = "openprf";
        }
    };


})

.controller('PostinfoCtrl', function ($scope, $stateParams) {})

.controller('SuggestpostCtrl', function ($scope, $stateParams) {})

.controller('LeaderboardCtrl', function ($scope, $stateParams) {})

.controller('PostCtrl', function ($scope, $stateParams) {})

.controller('CreatepostCtrl', function ($scope, $stateParams) {})

.controller('PostfbCtrl', function ($scope, $stateParams) {})

.controller('PostinfofbCtrl', function ($scope, $stateParams) {})

.controller('SuggestedpostCtrl', function ($scope, $stateParams) {})

.controller('TableCtrl', function ($scope, $stateParams) {})

.controller('TablefbCtrl', function ($scope, $stateParams) {})

.controller('MenuCtrl', function ($scope, $stateParams) {

    $scope.changeopen1 = function () {
        if ($scope.shouldopen1 == "open") {
            $scope.shouldopen1 = "";
        } else {
            $scope.shouldopen1 = "open";
        }
    };

    $scope.changeopen2 = function () {
        if ($scope.shouldopen2 == "open") {
            $scope.shouldopen2 = "";
        } else {
            $scope.shouldopen2 = "open";
        }
    };
});