var adminurl = "http://localhost/dellbackend1.0/index.php/json/";

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
        authenticate: function (){
            return $http.get(adminurl + "authenticate", {});
        },
        logout: function (){
            return $http.get(adminurl + "logout", {});
        },
        getuser: function (id){
            return $http.get(adminurl + "usersdetail?id=" + id , {});
        },
        getleaderboard: function (pageno){
            return $http.get(adminurl + "viewleaderboardjson?pageno=" + pageno , {});
        }
    }
});