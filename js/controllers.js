angular.module('starter.controllers', ['ionic','templateservicemod','myservices'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('LogoutCtrl', function ($scope, $ionicModal, $timeout, MyServices) {
    
    var logoutsuccess = function (data, status){
        console.log(data);
    }
    MyServices.logout().success(logoutsuccess);
    
})

.controller('HomeCtrl', function ($scope, $stateParams, TemplateService, MyServices, $location) {
    TemplateService.noactive();
    TemplateService.homeclass = "active";
    $scope.user = [];
    
    
    //  AUTHENTICATE
    var usersuccess = function (data, status) {
        console.log(data);
        $scope.user = data;
    }
    var authenticatesuccess = function (data, status) {
        if(data=="false")
        {
            $location.url("/login");
        }else{
            MyServices.getuser(data).success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);
    
    $scope.facebooklogin = function() {
        window.open('http://dellcampassador.com/index.php/hauth/login/Facebook', '_blank', 'location=yes');
    };
    // GET USER DATA
    
})

.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location, $ionicPopup,$ionicSlideBoxDelegate) {

    //  AUTHENTICATE
    var authenticatesuccess = function (data, status) {
        console.log(data);
        if(data!="false")
        {
            $location.url("app/home");
        }
    }
    MyServices.authenticate().success(authenticatesuccess);
    
    
    $scope.changetologin=function() {
        $ionicSlideBoxDelegate.slide(1);
    };
    
    //  ON LOGIN CLICK
    var loginsuccess = function (data, status) {
        console.log(data);
        if(data=="false"){
            var alertPopup = $ionicPopup.alert({
                title: 'Login',
                template: 'Invalide Username Or Password'
            });
        }else{
            $location.url("app/home");
        }
    }
    
    $scope.normallogin = function (login){
        MyServices.normallogin(login).success(loginsuccess);
    }

})

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

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, TemplateService, MyServices, $location, $ionicPopup) {
    TemplateService.noactive();
    TemplateService.homeclass = "active";
    
    
    $scope.user = [];
    $scope.profile = [];
    
    //  AUTHENTICATE
    var usersuccess = function (data, status) {
        console.log(data);
        $scope.user = data;
    }
	var profilesuccess = function (data, status) {
		console.log(data);
		$scope.profile = data;
	}
    var authenticatesuccess = function (data, status) {
        if(data=="false")
        {
            $location.url("/login");
        }else{
            MyServices.getuser(data).success(usersuccess);
			MyServices.editprofilebefore().success(profilesuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);
    
    
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

	$scope.savepassword = function () {
		$scope.shldopens3 = "changesul1";
		$scope.shldopens4 = "changesi";
	}
	
    TemplateService.noactive();
    TemplateService.profileclass = "active";
	
	
	// CHANGE PASSWORD
	
	var passwordsuccess = function (data, status) {
		console.log(data);
		if(data=="false"){
			var alertPopup = $ionicPopup.alert({
                title: 'Change Password',
                template: 'Error In Update'
            });
		}else{
			var alertPopup = $ionicPopup.alert({
                title: 'Change Password',
                template: 'Password Updated Successfully'
            });
		}
	}
	$scope.savepassword = function (password) {
		console.log(password);
		MyServices.changepassword(password).success(passwordsuccess);
	}
	
	// CHANGE PROFILE
	
	var changeprofilesuccess = function (data, status) {
		console.log(data);
		if(data==false){
			var alertPopup = $ionicPopup.alert({
                title: 'Change Profile',
                template: 'Error In Update'
            });
		}else{
			var alertPopup = $ionicPopup.alert({
                title: 'Change Profile',
                template: 'Profile Updated successfully'
            });
		}
	}
	$scope.saveprofile = function (profile) {
		console.log(profile);
		MyServices.changeprofile(profile).success(changeprofilesuccess);
	}
	
})

.controller('EditprofileCtrl', function ($scope, $stateParams, MyServices, $location) {

    
    $scope.user = 0;
    
    
    //  AUTHENTICATE
    var authenticatesuccess = function (data, status) {
        if(data=="false")
        {
            $location.url("/login");
        }else{
			$scope.user = data;
		}
    }
    MyServices.authenticate().success(authenticatesuccess);
	
	// CHANGE PASSWORD
	var passwordsuccess = function (data, status) {
		console.log(data);
	}
	$scope.savepassword = function (password) {
		console.log(password);
		MyServices.changepassword(password).success(passwordsuccess);
	}

})

.controller('PostinfoCtrl', function ($scope, $stateParams) {})

.controller('SuggestpostCtrl', function ($scope, $stateParams) {})

.controller('LeaderboardCtrl', function ($scope, $stateParams, TemplateService, MyServices, $location, $ionicScrollDelegate) {
    TemplateService.noactive();
    TemplateService.leaderclass = "active";
	
    $scope.leaderboard = [];
	$scope.rankuser = [];
	$scope.user = [];
	$scope.pageno = 1;
	$scope.totallength = 0;
    
    
    //  AUTHENTICATE
	var usersuccess = function (data, status) {
		$scope.user = data;
	}
    var leaderboardsuccess = function (data, status) {
		$scope.totallength = data.totalvalues-3;
		$scope.rankuser = data.queryresult.slice(0,3);
        $scope.leaderboard = data.queryresult.splice(3);
		$scope.$broadcast('scroll.infiniteScrollComplete');
    }
	var leaderboardsuccesspush = function (data, status) {
		for (var i = 0; i < data.queryresult.length; i++) {
            $scope.leaderboard.push(data.queryresult[i]);
        }
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
    var authenticatesuccess = function (data, status) {
        if(data=="false")
        {
            $location.url("/login");
        }else{
            MyServices.getleaderboard($scope.pageno).success(leaderboardsuccess);
			MyServices.getuser(data).success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);
	
	$scope.loadMore = function () {
		console.log("loading.....");
		console.log($scope.leaderboard.length);
		console.log($scope.totallength);
        
		
        if ($scope.leaderboard.length != $scope.totallength) {
            $scope.pageno = $scope.pageno + 1;
            MyServices.getleaderboard($scope.pageno).success(leaderboardsuccesspush);
        }
		
	}

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

.controller('MenuCtrl', function ($scope, $stateParams, TemplateService, MyServices, $location) {
    
    // DEVELOPMENT
    var logoutsuccess = function(data, status) {
        console.log(data);
        $location.url("/login");
    }
    $scope.logoutapp = function () {
        
        MyServices.logout().success(logoutsuccess);
        
    }
    
    
    // DESIGN
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