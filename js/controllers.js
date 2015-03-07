var ref="";
angular.module('starter.controllers', ['ionic', 'templateservicemod', 'myservices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('LogoutCtrl', function($scope, $ionicModal, $timeout, MyServices) {

    var logoutsuccess = function(data, status) {
        console.log(data);
    }
    MyServices.logout().success(logoutsuccess);

})

.controller('HomeCtrl', function($scope, $stateParams, TemplateService, MyServices, $location) {
    TemplateService.noactive();
    TemplateService.homeclass = "active";
    $scope.user = [];


    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        console.log(data);
        $scope.user = data;
    }
    var authenticatesuccess = function(data, status) {
        if (data == false) {
            $location.url("/login");
        } else {
            MyServices.getuser(data).success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);



})

.controller('LoginCtrl', function($scope, $stateParams, MyServices, $location, $ionicPopup, $ionicSlideBoxDelegate) {

    $scope.facebooktwitter = false;
    $scope.logindiv = true;
    $scope.user = [];
    $scope.facebooktik = false;
    $scope.twittertik = false;
    
    
    //  AUTHENTICATE
    var usersuccess = function (data, status) {
        console.log(data);
        $scope.user = data;
        
        if($scope.user.facebookid == "" || $scope.user.twitterid == ""){
            $scope.facebooktwitter = true;
            $scope.logindiv = false;
            if($scope.user.facebookid == ''){
                $scope.facebooktik = false;
            }else{
                console.log($scope.user.facebookid);
                $scope.facebooktik = true;
            }
            if($scope.user.twitterid == ''){
                $scope.twittertik = false;
            }else{
                console.log($scope.user.twitterid);
                $scope.twittertik = true;
            }
        }else{
            $location.url("app/home");
        }
    }
    
    var authenticatesuccess = function(data, status) {
        if (data != false) {
            MyServices.editprofilebefore().success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);


    $scope.changetologin = function() {
        $ionicSlideBoxDelegate.slide(1);
    };
	
    $scope.changetoinformation = function() {
        $ionicSlideBoxDelegate.slide(0);
    };

    //  ON LOGIN CLICK
    var loginsuccess = function(data, status) {
        if (data == false) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login',
                template: 'Invalide Username Or Password'
            });
        } else {
            MyServices.editprofilebefore().success(usersuccess);
//            $location.url("app/home");
        }
    }

    $scope.normallogin = function(login) {
        MyServices.normallogin(login).success(loginsuccess);
    }
    $scope.facebooklogin = function() {
        console.log(window.location);
        var abc=window.location.href;
        abc.replace("index.html", "success.html");
        ref=window.open('http://dellcampassador.com/new/index.php/json/loginhauth/Facebook?home='+abc, '_blank', 'location=yes');
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
        });
    };
    $scope.twitterlogin = function() {
        console.log(window.location);
        var abc=window.location.origin+window.location.pathname+"success.html";
        ref=window.open('http://dellcampassador.com/new/index.php/json/loginhauth/Twitter?home='+abc, '_blank', 'location=yes');
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
        });
    };
    // GET USER DATA
    
    
    // FACEBOOK TWITTER SHOW

})

.controller('WelcomeCtrl', function($scope, $stateParams, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/model.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function() {
        $scope.modal.show();
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

})

.controller('ProfileCtrl', function($scope, $stateParams, $ionicModal, TemplateService, MyServices, $location, $ionicPopup) {
    TemplateService.noactive();
    TemplateService.homeclass = "active";


    $scope.user = [];
    $scope.profile = [];

    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        console.log(data);
        $scope.user = data;
    }
    var profilesuccess = function(data, status) {
        console.log(data);
        $scope.profile = data;
    }
    var authenticatesuccess = function(data, status) {
        if (data == false) {
            $location.url("/login");
        } else {
            MyServices.getuser(data).success(usersuccess);
            MyServices.editprofilebefore().success(profilesuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);


    $scope.mkopen = function() {
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
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function() {
        $scope.modal.show();
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.mkopen1 = function() {
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

    $scope.mkopen2 = function() {
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

    $scope.savepassword = function() {
        $scope.shldopens3 = "changesul1";
        $scope.shldopens4 = "changesi";
    }

    TemplateService.noactive();
    TemplateService.profileclass = "active";


    // CHANGE PASSWORD

    var passwordsuccess = function(data, status) {
        console.log(data);
        if (data == false) {
            var alertPopup = $ionicPopup.alert({
                title: 'Change Password',
                template: 'Error In Update'
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Change Password',
                template: 'Password Updated Successfully'
            });
        }
    }
    $scope.savepassword = function(password) {
        console.log(password);
        MyServices.changepassword(password).success(passwordsuccess);
    }

    // CHANGE PROFILE

    var changeprofilesuccess = function(data, status) {
        console.log(data);
        if (data == false) {
            var alertPopup = $ionicPopup.alert({
                title: 'Change Profile',
                template: 'Error In Update'
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Change Profile',
                template: 'Profile Updated successfully'
            });
        }
    }
    $scope.saveprofile = function(profile) {
        console.log(profile);
        MyServices.changeprofile(profile).success(changeprofilesuccess);
    }

})

.controller('EditprofileCtrl', function($scope, $stateParams, MyServices, $location) {


    $scope.user = 0;


    //  AUTHENTICATE
    var authenticatesuccess = function(data, status) {
        if (data == false) {
            $location.url("/login");
        } else {
            $scope.user = data;
        }
    }
    MyServices.authenticate().success(authenticatesuccess);

    // CHANGE PASSWORD
    var passwordsuccess = function(data, status) {
        console.log(data);
    }
    $scope.savepassword = function(password) {
        console.log(password);
        MyServices.changepassword(password).success(passwordsuccess);
    }

})

.controller('PostinfoCtrl', function($scope, $stateParams) {})

.controller('SuggestpostCtrl', function($scope, $stateParams) {})

.controller('LeaderboardCtrl', function($scope, $stateParams, TemplateService, MyServices, $location, $ionicScrollDelegate) {
    TemplateService.noactive();
    TemplateService.leaderclass = "active";

    $scope.leaderboard = [];
    $scope.rankuser = [];
    $scope.user = [];
    $scope.pageno = 1;
    $scope.totallength = 0;


    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        $scope.user = data;
    }
    var leaderboardsuccess = function(data, status) {
        $scope.totallength = data.totalvalues - 3;
        $scope.rankuser = data.queryresult.slice(0, 3);
        $scope.leaderboard = data.queryresult.splice(3);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    var leaderboardsuccesspush = function(data, status) {
        for (var i = 0; i < data.queryresult.length; i++) {
            $scope.leaderboard.push(data.queryresult[i]);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    var authenticatesuccess = function(data, status) {
        if (data == false) {
            $location.url("/login");
        } else {
            MyServices.getleaderboard($scope.pageno).success(leaderboardsuccess);
            MyServices.getuser(data).success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);

    $scope.loadMore = function() {
        console.log("loading.....");
        console.log($scope.leaderboard.length);
        console.log($scope.totallength);


        if ($scope.leaderboard.length != $scope.totallength) {
            $scope.pageno = $scope.pageno + 1;
            MyServices.getleaderboard($scope.pageno).success(leaderboardsuccesspush);
        }

    }

})

.controller('PostCtrl', function($scope, $stateParams) {})

.controller('CreatepostCtrl', function($scope, $stateParams) {})

.controller('PostfbCtrl', function($scope, $stateParams) {})

.controller('PostinfofbCtrl', function($scope, $stateParams) {})

.controller('SuggestedpostCtrl', function($scope, TemplateService) {
    TemplateService.noactive();
    TemplateService.createpostclass = "active";
})

.controller('TableCtrl', function($scope, $stateParams, TemplateService, MyServices, $location) {
    TemplateService.noactive();
    TemplateService.tabletwitclass = "active";

    $scope.user = 0;
    $scope.twitter = [];
    $scope.tab = "history";
    $scope.historyclass = "activated";
    $scope.newpostclass = "";
    $scope.lastid = "";
    $scope.twitterpost = [];

    //  AUTHENTICATE
    var twittersuccess = function(data, status) {
        console.log(data);
        $scope.twitter = data;
    }
    var authenticatesuccess = function(data, status) {
        if (data == false) {
            $location.url("/login");
        } else {
            $scope.user = data;
            MyServices.gettwitterposts().success(twittersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);
    
    
    
    
    //  ON TAB CHANGE
    
    var postsuccess = function (data, status) {
        console.log(data);
        $scope.twitterpost = data;
        $scope.lastid = data.id;
    }
    
    $scope.changetab = function (tab) {
        console.log(tab);
        if(tab == "newpost"){
            $scope.tab = "newpost";
            $scope.newpostclass = "activated";
            $scope.historyclass = "";
            MyServices.gettwitternextpost($scope.lastid).success(postsuccess);
            
        }else{
            $scope.tab = "history";
            $scope.historyclass = "activated";
            $scope.newpostclass = "";
        }
    }
    
    // NEXT POST
    $scope.nextpost = function (){
        MyServices.gettwitternextpost($scope.lastid).success(postsuccess);
    }
    
    //  PREVIOUS POST
    $scope.prevoiuspost = function () {
        MyServices.gettwitterprevpost($scope.lastid).success(postsuccess);
    }

})

.controller('TablefbCtrl', function($scope, $stateParams, TemplateService, MyServices, $location) {
    TemplateService.noactive();
    TemplateService.tablefbclass = "active";

    $scope.user = 0;
    $scope.facebook = [];
    $scope.tab = "history";
    $scope.historyclass = "activated";
    $scope.newpostclass = "";
    $scope.lastid = "";
    $scope.facebookpost = [];

    //  AUTHENTICATE
    var facebooksuccess = function(data, status) {
        console.log(data);
        $scope.facebook = data;
    }
    var authenticatesuccess = function(data, status) {
        if (data == false) {
            $location.url("/login");
        } else {
            $scope.user = data;
            MyServices.getfacebookposts().success(facebooksuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);
    
    
    //  ON TAB CHANGE
    
    var postsuccess = function (data, status) {
        console.log(data);
        $scope.facebookpost = data;
        $scope.lastid = data.id;
    }
    
    $scope.changetab = function (tab) {
        console.log(tab);
        if(tab == "newpost"){
            $scope.tab = "newpost";
            $scope.newpostclass = "activated";
            $scope.historyclass = "";
            MyServices.getfacebooknextpost($scope.lastid).success(postsuccess);
            
        }else{
            $scope.tab = "history";
            $scope.historyclass = "activated";
            $scope.newpostclass = "";
        }
    }
    
    // NEXT POST
    $scope.nextpost = function (){
        MyServices.getfacebooknextpost($scope.lastid).success(postsuccess);
    }
    
    //  PREVIOUS POST
    $scope.prevoiuspost = function () {
        MyServices.getfacebookprevpost($scope.lastid).success(postsuccess);
    }

})

.controller('TwitterpostCtrl', function($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.twitpostclass = "active";

})

.controller('FbpostCtrl', function($scope, $stateParams, TemplateService) {
    TemplateService.noactive();
    TemplateService.fbpostclass = "active";
})

.controller('MenuCtrl', function($scope, $stateParams, TemplateService, MyServices, $location) {

    // DEVELOPMENT
    var logoutsuccess = function(data, status) {
        console.log(data);
        $location.url("/login");
    }
    $scope.logoutapp = function() {

        MyServices.logout().success(logoutsuccess);

    }


    // DESIGN
    $scope.changeopen1 = function() {
        if ($scope.shouldopen1 == "open") {
            $scope.shouldopen1 = "";
        } else {
            $scope.shouldopen1 = "open";
        }
    };

    $scope.navigation = TemplateService;

    $scope.changeopen2 = function() {
        if ($scope.shouldopen2 == "open") {
            $scope.shouldopen2 = "";
        } else {
            $scope.shouldopen2 = "open";
        }
    };
});