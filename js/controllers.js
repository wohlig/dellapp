angular.module('starter.controllers', ['templateservicemod'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('HomeCtrl', function ($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.homeclass = "active";
})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('WelcomeCtrl', function ($scope, $stateParams, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/model.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

})

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, TemplateService) {
    TemplateService.noactive();
    TemplateService.homeclass = "active";
    $scope.mkopen = function () {
        console.log("cbd");
        if ($scope.shldopens == "openprf") {
            $scope.shldopens = "";
        } else {
            $scope.shldopens = "openprf";
        }
    };

    $ionicModal.fromTemplateUrl('templates/editprofile.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    }

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    TemplateService.noactive();
    TemplateService.profileclass = "active";
})

.controller('EditprofileCtrl', function ($scope, $stateParams) {
    $scope.mkopen1 = function () {
        console.log("cbd");
        if ($scope.shldopens1 == "changesul" &&
            $scope.shldopens2 == "changesi") {
            $scope.shldopens1 = "";
            $scope.shldopens2 = "";
        } else {
            $scope.shldopens1 = "changesul";
            $scope.shldopens2 = "changesi";
        }
    };

    $scope.mkopen2 = function () {
        console.log("cbd");
        if ($scope.shldopens3 == "changesul1" &&
            $scope.shldopens4 == "changesi") {
            $scope.shldopens3 = "";
            $scope.shldopens4 = "";
        } else {
            $scope.shldopens3 = "changesul1";
            $scope.shldopens4 = "changesi";
        }
    };
})

.controller('PostinfoCtrl', function ($scope, $stateParams) {})

.controller('SuggestpostCtrl', function ($scope, $stateParams) {})

.controller('LeaderboardCtrl', function ($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.leaderclass = "active";

})

.controller('PostCtrl', function ($scope, $stateParams) {})

.controller('CreatepostCtrl', function ($scope, $stateParams) {})

.controller('PostfbCtrl', function ($scope, $stateParams) {})

.controller('PostinfofbCtrl', function ($scope, $stateParams) {})

.controller('SuggestedpostCtrl', function ($scope, TemplateService) {
    TemplateService.noactive();
    TemplateService.createpostclass = "active";
})

.controller('TableCtrl', function ($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.tabletwitclass = "active";
})

.controller('TablefbCtrl', function ($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.tablefbclass = "active";
})

.controller('TwitterpostCtrl', function ($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.twitpostclass = "active";

})

.controller('FbpostCtrl', function ($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.fbpostclass = "active";
})

.controller('MenuCtrl', function ($scope, $stateParams, TemplateService) {
    $scope.changeopen1 = function () {
        if ($scope.shouldopen1 == "open") {
            $scope.shouldopen1 = "";
        } else {
            $scope.shouldopen1 = "open";
        }
    };

    $scope.navigation = TemplateService;

    $scope.changeopen2 = function () {
        if ($scope.shouldopen2 == "open") {
            $scope.shouldopen2 = "";
        } else {
            $scope.shouldopen2 = "open";
        }
    };
});