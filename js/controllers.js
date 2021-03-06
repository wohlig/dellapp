var ref = 0;
angular.module('starter.controllers', ['ionic', 'templateservicemod', 'myservices', 'ngCordova','rn-lazy'])

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
    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        console.log(data);
        $scope.user = data;
    }
    var authenticatesuccess = function(data, status) {
        if (data == "false") {
            $location.url("/login");
        } else {
            MyServices.getuser(data).success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);



})

.controller('LoginCtrl', function($scope, $stateParams, MyServices, $location, $ionicPopup, $ionicSlideBoxDelegate, $interval) {
    $scope.facebooktwitter = false;
    $scope.logindiv = true;
    $scope.user = [];
    $scope.facebooktik = false;
    $scope.twittertik = false;



    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        console.log(data);
        $scope.user = data;

        if ($scope.user.facebookid == "" || $scope.user.twitterid == "") {
            $scope.facebooktwitter = true;
            $scope.logindiv = false;
            if ($scope.user.facebookid == '') {
                $scope.facebooktik = false;
            } else {
                console.log($scope.user.facebookid);
                $scope.facebooktik = true;
            }
            if ($scope.user.twitterid == '') {
                $scope.twittertik = false;
            } else {
                console.log($scope.user.twitterid);
                $scope.twittertik = true;
            }
        } else {
            $location.url("app/home");
        }
    }

    var authenticatesuccess = function(data, status) {
        if (data != "false") {
            MyServices.editprofilebefore().success(usersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);

    var activator = $ionicSlideBoxDelegate.currentIndex();

    $scope.changetologin = function() {
        $ionicSlideBoxDelegate.slide(1);
        $scope.her = '';
        $scope.him = 'active';
    };
    $scope.her = 'active';
    $scope.changetoinformation = function() {
        $ionicSlideBoxDelegate.slide(0);
        $scope.her = 'active';
        $scope.him = '';
    };

    //  ON LOGIN CLICK
    var loginsuccess = function(data, status) {
        if (data == "false") {
            var alertPopup = $ionicPopup.alert({
                title: 'Login',
                template: 'Invalide Username Or Password'
            });
        } else {
            MyServices.editprofilebefore().success(usersuccess);
            //            $location.url("app/home");
        }
    }


    var stopinterval = 0;
    var checkfb = function(data, status) {
        console.log(data);
        if (data.facebookid == "") {
            console.log("Do nothing");
        } else {
            ref.close();
            $interval.cancel(stopinterval);
        }
    }

    var callAtIntervalfb = function() {
        MyServices.editprofilebefore().success(checkfb);
    };

    var checktwitter = function(data, status) {
        console.log(data);
        if (data.twitterid == "") {
            console.log("Do nothing");
        } else {
            ref.close();
            $interval.cancel(stopinterval);
            $scope.showPopup();
        }
    }

    var callAtIntervaltwitter = function() {
        MyServices.editprofilebefore().success(checktwitter);
    };


    $scope.normallogin = function(login) {
        MyServices.normallogin(login).success(loginsuccess);
    }
    $scope.facebooklogin = function() {
        console.log(window.location);
        var abc = window.location.href;
        abc.replace("index.html", "success.html");
        ref = window.open('http://dellcampassador.com/new/index.php/json/loginhauth/Facebook?home=' + abc, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervalfb, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    };
    $scope.twitterlogin = function() {
        console.log(window.location);
        var abc = window.location.origin + window.location.pathname + "success.html";
        ref = window.open('http://dellcampassador.com/new/index.php/json/loginhauth/Twitter?home=' + abc, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
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

.controller('ProfileCtrl', function($scope, $stateParams, $ionicModal, TemplateService, MyServices, $location, $ionicPopup, $ionicLoading) {
	
//	$cordovaProgress.showSimple(true);


    TemplateService.noactive();
    TemplateService.profileclass = "active";
    TemplateService.changeopen1();

    //  DECLARATION
    $scope.allvalidation = [];
    $scope.allvalidation1 = [];
    $scope.user = [];
    $scope.profile = [];
    $scope.password = [];

	//	PAGE LOADER
	
	$ionicLoading.show({
        //        template: 'We are fetching the best rates for you.',

        content: 'We are fetching the best rates for you.',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: '0'
    });
	
    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        console.log(data);
        $scope.user = data;
		$ionicLoading.hide();
    }
    var profilesuccess = function(data, status) {
        console.log(data);
        $scope.profile = data;
		
    }
    var authenticatesuccess = function(data, status) {
        if (data == "false") {
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




    // CHANGE PASSWORD

    var passwordsuccess = function(data, status) {
        console.log(data);
        if (data == "false") {
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
    $scope.saveprofile = function(profile,password) {
        
        
        
        $scope.allvalidation = [{
            field: $scope.password.currentpassword,
            validation: ""
        }, {
            field: $scope.password.password,
            validation: ""
        }, {
            field: $scope.password.confirmpassword,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            MyServices.changepassword(password).success(passwordsuccess);
        };
        
        $scope.allvalidation1 = [{
            field: $scope.profile.name,
            validation: ""
        }, {
            field: $scope.profile.contact,
            validation: ""
        }, {    
            field: $scope.profile.city,
            validation: ""
        }, {
            field: $scope.profile.dob,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation1);

        if (check) {
            MyServices.changeprofile(profile).success(changeprofilesuccess);
        };
        
    }

})

.controller('EditprofileCtrl', function($scope, $stateParams, MyServices, $location, TemplateService) {




    $scope.user = 0;


    //  AUTHENTICATE
    var authenticatesuccess = function(data, status) {
        if (data == "false") {
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

.controller('PostinfoCtrl', function($scope, $stateParams, TemplateService) {

    $scope.post = $.jStorage.get("twipost");
})

.controller('SuggestpostCtrl', function($scope, $stateParams, $ionicHistory, TemplateService, MyServices, $ionicPopup, $cordovaCamera, $cordovaFileTransfer, $ionicLoading) {
    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };
	
    // IMAGE UPLOAD START
    
    
    //Capture Image
	$scope.filename2 = "";
    $scope.cameraimage = "http://dellcampassador.com/new/assets/images/tcp-no-image.jpg";
    $scope.takePicture = function () {
		console.log("take picture");
        var options = {
            quality: 40,
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0,21)=="content://com.android") {
                var photo_split=imageData.split("%3A");
                imageData="content://media/external/images/media/"+photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto();
        }, function (err) {
            // An error occured. Show a message to the user
        });

        //Upload photo
        var serverpath = "http://dellcampassador.com/new/index.php/json/fileupload";

        //File Upload parameters: source, filePath, options
        $scope.uploadPhoto = function () {
            console.log("function called");
            $cordovaFileTransfer.upload(serverpath, $scope.cameraimage, options)
                .then(function (result) {
                    console.log(result);
                    result = result.response;
                    $scope.filename2 = JSON.parse(result);
                    $scope.filename2 = $scope.filename2.name;
					console.log($scope.filename2);
					$ionicLoading.hide();
                    //$scope.addretailer.store_image = $scope.filename2;
                }, function (err) {
                    // Error
                    console.log(err);
                }, function (progress) {
                    // constant progress updates
				$ionicLoading.show({
					//        template: 'We are fetching the best rates for you.',

					content: 'We are fetching the best rates for you.',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: '0'
				});
                console.log("progress");
                });

        };
        

    }
    
    // IMAGE UPLOAD END
    
    
    
    // DECLARATION
    $scope.post = {
        text: ""
    };
    $scope.post.platform = "Facebook";
    $scope.showfb = true;

    $scope.twittertext = function() {
        console.log("android");
        if ($scope.showfb == false) {
            if ($scope.post.text.length > 140) {
                $scope.post.text = $scope.post.text.substr(0, 140);
                console.log("NP");
            }
            $scope.keysremaining = 140 - $scope.post.text.length + " characters remaining.";
        }
    };

    // SUGGEST FACEBOOK
    $scope.suggestfacebook = function() {
        console.log("facebook");
        $scope.post.platform = "Facebook";
        $scope.showfb = true;
    }

    $scope.suggesttwitter = function() {
        console.log("twitter");
        $scope.post.platform = "Twitter";
        $scope.showfb = false;
        $scope.twittertext();
    }
	
	// SUGGEST POST SAVE
	var suggestedsuccess = function (data, status) {
		console.log(data);
		if(data == "true"){
			var alertPopup = $ionicPopup.alert({
                title: 'Suggetion',
                template: 'Suggest post successfully submitted for review'
            });
		}else{
			var alertPopup = $ionicPopup.alert({
                title: 'Suggetion',
                template: 'Error in suggestion'
            });
		}
	}
	$scope.suggestpost = function (post) {
		console.log(post);
		if($scope.post.platform == "Facebook"){
			post.posttype = "1";
			if($scope.filename2 == ""){
//				var alertPopup = $ionicPopup.alert({
//                title: 'Suggetion',
//                template: 'Please Select Image'
//            });
				post.image = "";
			}else{
				post.image = $scope.filename2;
			}
			
		}else{
			post.posttype = "2";
			post.image = "";
			post.link = "";
		}
		MyServices.createsuggestion(post).success(suggestedsuccess);
	}
	
	
})

.controller('LeaderboardCtrl', function($scope, $stateParams, TemplateService, MyServices, $location, $ionicScrollDelegate, $ionicPopup, $ionicLoading) {

    TemplateService.noactive();
    TemplateService.leaderclass = "active";

    $scope.leaderboard = [];
    $scope.rankuser = [];
    $scope.user = [];
    $scope.pageno = 1;
    $scope.totallength = 0;
	$scope.search = "";
	$scope.data = [];
    $scope.scrollload = true;

	$ionicLoading.show({
        //        template: 'We are fetching the best rates for you.',

        content: 'We are fetching the best rates for you.',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: '0'
    });
	
	$scope.searchpopup = function (){
		$scope.pageno = 1;
		var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="data.wifi">',
		title: 'Search',
		scope: $scope,
		buttons: [
		  { text: 'Cancel',
		  	onTap: function(e) {
				$scope.data.wifi = "";
				$scope.search = "";
				MyServices.getleaderboard($scope.pageno, $scope.search).success(leaderboardsuccess);
			}
		  },
		  {
			text: '<b>Search</b>',
			type: 'button-positive',
			onTap: function(e) {
			  if (!$scope.data.wifi) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.search = $scope.data.wifi;
				console.log($scope.search);
				MyServices.getleaderboard($scope.pageno, $scope.search).success(leaderboardsuccess);
//				$scope.data.wifi = "";
			  }
			}
		  }
		]
	  });
	}
	
    //  AUTHENTICATE
    var usersuccess = function(data, status) {
        $scope.user = data;
    }
    var leaderboardsuccess = function(data, status) {
		
		if(data.queryresult.length==0)
        {
            $scope.scrollload = false;
            $scope.leaderboard = [];
        }else{
            if($scope.search == "")
            {
                $scope.totallength = data.totalvalues - 3;
                $scope.rankuser = data.queryresult.slice(0, 3);
                $scope.leaderboard = data.queryresult.splice(3);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.totallength = data.totalvalues;
                $scope.leaderboard = data.queryresult;
                $scope.$broadcast('scroll.infiniteScrollComplete');

            }
        }
		
		$ionicLoading.hide();
    }
    var leaderboardsuccesspush = function(data, status) {
        
        
            for (var i = 0; i < data.queryresult.length; i++) {
                $scope.leaderboard.push(data.queryresult[i]);
            }
            console.log("in push");
            if($scope.leaderboard.length==$scope.totallength){
                $scope.scrollload = false;
            }
            console.log($scope.leaderboard.length);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        
    }
    var authenticatesuccess = function(data, status) {
        if (data == "false") {
            $location.url("/login");
        } else {
            MyServices.getleaderboard($scope.pageno, $scope.search).success(leaderboardsuccess);
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
            MyServices.getleaderboard($scope.pageno, $scope.search).success(leaderboardsuccesspush);
        }

    }


})

.controller('PostCtrl', function($scope, $stateParams, TemplateService) {})

.controller('CreatepostCtrl', function($scope, $stateParams, TemplateService, MyServices, $location, $ionicLoading, $ionicScrollDelegate, $ionicPopup, $interval, $timeout) {


	// DECLARATION
	$scope.posts = [];
	$scope.totallength = 0;
	$scope.pageno = 1;
	$scope.data = [];
	$scope.search = "";
    $scope.scrollload = true;
	
	// IONIC LOADER
	
	$ionicLoading.show({
        //        template: 'We are fetching the best rates for you.',

        content: 'We are fetching the best rates for you.',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: '0'
    });
	
	//SEARCH
	$scope.searchpopup = function (){
		$scope.pageno = 1;
		var myPopup = $ionicPopup.show({
		template: '<input type="text" ng-model="data.wifi">',
		title: 'Search',
		scope: $scope,
		buttons: [
		  { text: 'Cancel',
		  	onTap: function(e) {
				$scope.data.wifi = "";
				$scope.search = "";
				MyServices.viewsuggestionjson($stateParams.status,$scope.pageno,$scope.search).success(suggestionsuccess);
			}
		  },
		  {
			text: '<b>Search</b>',
			type: 'button-positive',
			onTap: function(e) {
			  if (!$scope.data.wifi) {
				//don't allow the user to close unless he enters wifi password
				e.preventDefault();
			  } else {
				$scope.search = $scope.data.wifi;
				console.log($scope.search);
				MyServices.viewsuggestionjson($stateParams.status,$scope.pageno,$scope.search).success(suggestionsuccess);
//				$scope.data.wifi = "";
			  }
			}
		  }
		]
	  });
	}
	
	// CALL POST API
	var suggestionsuccess = function(data, status){
		console.log(data);
        if(data.queryresult.length==0){
            $scope.scrollload = false;
        }else{
            $scope.posts = data.queryresult
            $scope.totallength = data.totalvalues;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
		$ionicLoading.hide();
	}
	
	var suggestionsuccesspush = function(data, status){
		console.log(data);
		for (var i = 0; i < data.queryresult.length; i++) {
            $scope.posts.push(data.queryresult[i]);
        }
        
            if($scope.posts.length==$scope.totallength){
                $scope.scrollload = false;
            }
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
	
		MyServices.viewsuggestionjson($stateParams.status,$scope.pageno,$scope.search).success(suggestionsuccess);
	
	
	
	//LOAD MORE
	$scope.loadMore = function() {
        console.log("loading.....");
        console.log($scope.posts.length);
        console.log($scope.totallength);


        if ($scope.posts.length != $scope.totallength) {
            $scope.pageno = $scope.pageno + 1;
            MyServices.viewsuggestionjson($stateParams.status,$scope.pageno,$scope.search).success(suggestionsuccesspush);
        }

    }

	
	//TWITTER POST
	
	
    var stopinterval = 0;
    var postid = 0;
    var postcount = 0;
    var checktwitter = function(data, status) {

        var newpostcount = parseInt(data.count);

        console.log("newpostcount..." + newpostcount);
        console.log("postcount..." + postcount);
        if (postcount == newpostcount) {
            console.log("Do nothing");
        } else {
            ref.close();
            $interval.cancel(stopinterval);

            $scope.showPopup();

        }
    }

    var callAtIntervaltwitter = function() {
        MyServices.getuserpostcount(postid).success(checktwitter);
    };

    var postnow = function(data) {
        postcount = parseInt(data.count);
        ref = window.open('http://dellcampassador.com/new/index.php/json/postsugtweet?id=' + postid, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
        $scope.showPopup();
    };

    $scope.showPopup = function() {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1><p>',
            title: 'Succesfully tweeted!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close();
        }, 2000);
    };
	
	 $scope.makeposttwitter = function(post) {
        postid = post;
        MyServices.getuserpostcount(post).success(postnow);
    };
	

	// FACEBOOK POST
	
	
    var stopintervalf = 0;
    var postidf = 0;
    var postcountf = 0;
    var checkfb = function(data, status) {
        var newpostcountf = parseInt(data.count);
        if (postcountf == newpostcountf) {
            console.log("Do nothing");
        } else {
            ref.close();
            $interval.cancel(stopintervalf);
            $scope.showPopupf();
        }
    }

    var callAtIntervalfb = function() {
        MyServices.getuserpostcount(postidf).success(checkfb);
    };

    var postfbnow = function(data) {
        postcountf = parseInt(data.count);
        ref = window.open('http://dellcampassador.com/new/index.php/json/postsugfb?id=' + postidf, '_blank', 'location=no');
        stopintervalf = $interval(callAtIntervalfb, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopintervalf);
        });
        $scope.showPopupf();
    };


    $scope.showPopupf = function() {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1><p>',
            title: 'Succesfully posted!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close();
        }, 2000);
    };


    $scope.makepostfb = function(post) {
        console.log(post);
        postidf = post;
        MyServices.getuserpostcount(post).success(postfbnow);
    };

	
})

.controller('PostfbCtrl', function($scope, $stateParams, TemplateService) {})

.controller('PostinfofbCtrl', function($scope, $stateParams, TemplateService) {

    $scope.post = $.jStorage.get("fbpost");
})

.controller('SuggestedpostCtrl', function($scope, TemplateService, MyServices) {
    TemplateService.noactive();
    TemplateService.createpostclass = "active";
    TemplateService.changeopen2();
	
	// DECLARATION
	$scope.posts = [];
	
	// ALL SUGGESTIONS
	var suggestionsuccess = function(data, status){
		console.log(data);
		$scope.posts = data;
	}
	MyServices.allsuggestion().success(suggestionsuccess);
	
	
})

.controller('TableCtrl', function($scope, $stateParams, TemplateService, MyServices, $location, $interval, $timeout, $ionicLoading,$ionicPopup) {


    $scope.user = 0;
    $scope.twitter = [];
    $scope.tab = "history";
    $scope.historyclass = "active";
    $scope.newpostclass = "";
    $scope.lastid = "";
    $scope.twitterpost = [];

	//	PAGE LOADER
	
	$ionicLoading.show({
        //        template: 'We are fetching the best rates for you.',

        content: 'We are fetching the best rates for you.',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: '0'
    });
	
    //  AUTHENTICATE
    var twittersuccess = function(data, status) {
        console.log(data);
        $scope.twitter = data;
		$ionicLoading.hide();
    }
    var authenticatesuccess = function(data, status) {
        if (data == "false") {
            $location.url("/login");
        } else {
            $scope.user = data;
            MyServices.gettwitterposts().success(twittersuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);




    //  ON TAB CHANGE

    var postsuccess = function(data, status) {
        console.log(data);
        $scope.twitterpost = data;
        $scope.lastid = data.id;
    }

    $scope.changetab = function(tab) {
        console.log(tab);
        if (tab == "newpost") {
            $scope.tab = "newpost";
            $scope.newpostclass = "active";
            $scope.historyclass = "";
            MyServices.gettwitternextpost($scope.lastid).success(postsuccess);

        } else {
            $scope.tab = "history";
            $scope.historyclass = "active";
            $scope.newpostclass = "";
        }
    }

    // NEXT POST
    $scope.nextpost = function() {
        MyServices.gettwitternextpost($scope.lastid).success(postsuccess);
    }

    //  PREVIOUS POST
    $scope.prevoiuspost = function() {
        MyServices.gettwitterprevpost($scope.lastid).success(postsuccess);
    }
	
	// POST TWITTER
	
    var stopinterval = 0;
    var postid = 0;
    var postcount = 0;
    var checktwitter = function(data, status) {

        var newpostcount = parseInt(data.count);

        console.log("newpostcount..." + newpostcount);
        console.log("postcount..." + postcount);
        if (postcount == newpostcount) {
            console.log("Do nothing");
        } else {
            ref.close();
            $interval.cancel(stopinterval);

            $scope.showPopup();

        }
    }

    var callAtIntervaltwitter = function() {
        MyServices.getuserpostcount(postid).success(checktwitter);
    };

    var postnow = function(data) {
        postcount = parseInt(data.count);
        ref = window.open('http://dellcampassador.com/new/index.php/json/posttweet?id=' + postid, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
        $scope.showPopup();
    };

    $scope.showPopup = function() {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1><p>',
            title: 'Succesfully tweeted!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close();
        }, 2000);
    };

    $scope.makeposttwitter = function(post) {
        postid = post;
        MyServices.getuserpostcount(post).success(postnow);
    };

    var path = $location.path();
    if (path == "/app/table") {

        TemplateService.noactive();
        TemplateService.tabletwitclass = "active";
        TemplateService.changeopen1();

    } else {
        $scope.changetab('newpost');
        TemplateService.noactive();
        TemplateService.twitpostclass = "active";
        TemplateService.changeopen2();
    }

    $scope.gotopost = function(post) {
        console.log(post);
        $.jStorage.set("twipost", post);
        $location.path("/app/postinfo");
    };

})

.controller('TablefbCtrl', function($scope, $stateParams, TemplateService, MyServices, $location, $interval, $ionicPopup, $timeout, $ionicLoading) {

    $scope.user = 0;
    $scope.facebook = [];
    $scope.tab = "history";
    $scope.historyclass = "active";
    $scope.newpostclass = "";
    $scope.lastid = "";
    $scope.facebookpost = [];
	$scope.loading = "imageisloading";
	//	PAGE LOADER
	
	$ionicLoading.show({
        //        template: 'We are fetching the best rates for you.',

        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: '0'
    });
	
    //  AUTHENTICATE
    var facebooksuccess = function(data, status) {
        console.log(data);
        $scope.facebook = data;
		$ionicLoading.hide();
    }
    var authenticatesuccess = function(data, status) {
        if (data == "false") {
            $location.url("/login");
        } else {
            $scope.user = data;
            MyServices.getfacebookposts().success(facebooksuccess);
        }
    }
    MyServices.authenticate().success(authenticatesuccess);


    //  ON TAB CHANGE

    var postsuccess = function(data, status) {
        console.log(data);
        $scope.facebookpost = data;
        $scope.lastid = data.id;
    }

    $scope.changetab = function(tab) {
        console.log(tab);
        if (tab == "newpost") {
            $scope.tab = "newpost";
            $scope.newpostclass = "active";
            $scope.historyclass = "";
            MyServices.getfacebooknextpost($scope.lastid).success(postsuccess);

        } else {
            $scope.tab = "history";
            $scope.historyclass = "active";
            $scope.newpostclass = "";
        }
    }

    // NEXT POST
    $scope.nextpost = function() {
		$scope.facebookpost.image = "";
        MyServices.getfacebooknextpost($scope.lastid).success(postsuccess);
    }

    //  PREVIOUS POST
    $scope.prevoiuspost = function() {
		$scope.facebookpost.image = "";
        MyServices.getfacebookprevpost($scope.lastid).success(postsuccess);
    }


    var stopinterval = 0;
    var postid = 0;
    var postcount = 0;
    var checkfb = function(data, status) {
        var newpostcount = parseInt(data.count);
        if (postcount == newpostcount) {
            console.log("Do nothing");
        } else {
            ref.close();
            $interval.cancel(stopinterval);
            $scope.showPopup();
        }
    }

    var callAtIntervalfb = function() {
        MyServices.getuserpostcount(postid).success(checkfb);
    };

    var postfbnow = function(data) {
        postcount = parseInt(data.count);
        ref = window.open('http://dellcampassador.com/new/index.php/json/postfb?id=' + postid, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervalfb, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
        $scope.showPopup();
    };


    $scope.showPopup = function() {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-ios7-checkmark balanced"></h1><p>',
            title: 'Succesfully posted!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close();
        }, 2000);
    };


    $scope.makepostfb = function(post) {
        console.log(post);
        postid = post;
        MyServices.getuserpostcount(post).success(postfbnow);
    };


    var path = $location.path();
    if (path == "/app/tablefb") {

        TemplateService.noactive();
        TemplateService.tablefbclass = "active";
        TemplateService.changeopen1();
    } else {
        $scope.changetab('newpost');
        TemplateService.noactive();
        TemplateService.fbpostclass = "active";
        TemplateService.changeopen2();
    }

    $scope.gotopost = function(post) {
        $.jStorage.set("fbpost", post);
        $location.path("/app/postinfofb");
    };


})

.controller('TwitterpostCtrl', function($scope, $stateParams, TemplateService) {


})

.controller('FbpostCtrl', function($scope, $stateParams, TemplateService) {

})

.controller('MenuCtrl', function($scope, $stateParams, TemplateService, MyServices, $location) {

    // DEVELOPMENT


    $scope.navigation = TemplateService;

});