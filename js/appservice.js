var adminurl = "http://dellcampassador.com/new/index.php/json/";
//var adminurl = "http://localhost/dellbackend1.0/index.php/json/";

var myservices = angular.module('myservices', [])
.factory('MyServices', function ($http, $location) {

    var useremail = "";
    var uservalue = {};
    return {
        normallogin: function (login) {
            return $http({
                url: adminurl + 'login',
                method: "POST",
                data: {
                    'email': login.email,
                    'password': login.password
                }
            });
        },
        changepassword: function (password) {
            return $http({
                url: adminurl + 'changepasswordsubmit',
                method: "POST",
                data: {
                    'password': password.password,
                    'currentpassword': password.currentpassword,
                    'confirmpassword': password.confirmpassword
                }
            });
        },
        changeprofile: function (profile) {
            return $http({
                url: adminurl + 'editprofilesubmit',
                method: "POST",
                data: {
                    'name': profile.name,
                    'contact': profile.contact,
                    'dob': profile.dob,
                    'city': profile.city
                }
            });
        },
        createsuggestion: function (post) {
            return $http({
                url: adminurl + 'createsuggestion',
                method: "POST",
                data: {
                    'text': post.text,
                    'image': post.image,
                    'posttype': post.posttype,
                    'link': post.link
                }
            });
        },
        gettwitterposts: function () {
            return $http.get(adminurl + "gettwitterposts", {});
        },
        getfacebookposts: function () {
            return $http.get(adminurl + "getfacebookposts", {});
        },
        editprofilebefore: function () {
            return $http.get(adminurl + "editprofilebefore", {});
        },
        viewsuggestionjson: function (status, pageno, search) {
			if(status==3)
			{
				status = "";
			}
            return $http.get(adminurl + "viewsuggestionjson?status=" + status + "&pageno=" + pageno + "&search=" + search, {});
        },
        gettwitternextpost: function (id) {
            return $http.get(adminurl + "gettwitternextpost?id=" + id, {});
        },
        getfacebooknextpost: function (id) {
            return $http.get(adminurl + "getfacebooknextpost?id=" + id, {});
        },
        getfacebookprevpost: function (id) {
            return $http.get(adminurl + "getfacebookprevpost?id=" + id, {});
        },
        gettwitterprevpost: function (id) {
            return $http.get(adminurl + "gettwitterprevpost?id=" + id, {});
        },
        allsuggestion: function () {
            return $http.get(adminurl + "allsuggestion", {});
        },
        authenticate: function () {
            return $http.get(adminurl + "authenticate", {});
        },
        logout: function () {
            return $http.get(adminurl + "logout", {});
        },
        getuser: function (id) {
            return $http.get(adminurl + "usersdetail?id=" + id, {});
        },
        getleaderboard: function (pageno,search) {
            return $http.get(adminurl + "viewleaderboardjson?pageno=" + pageno + "&search=" + search, {});
        },
        getuserpostcount: function (post) {
            return $http.get(adminurl + "getuserpostcount?post=" + post, {});
        },
        postfb: function (post) {
            return $http.get(adminurl + "postfb?id=" + post, {});
        },
        posttweet: function (post) {
            return $http.get(adminurl + "posttweet?id=" + post, {});
        }
    }
});