var templateservicemod = angular.module('templateservicemod', ['myservices']);
templateservicemod.service('TemplateService', function(MyServices, $location) {
    this.title = "Home";
    this.meta = "Google";
    this.metadesc = "Home";

    this.homeclass = "";
    this.profileclass = "";
    this.tablefbclass = "";
    this.tabletwitclass = "";
    this.fbpostclass = "";
    this.twitpostclass = "";
    this.createpostclass = "";
    this.leaderclass = "";
    this.postingclass = "";

    this.noactive = function() {
        this.homeclass = "";
        this.profileclass = "";
        this.tablefbclass = "";
        this.tabletwitclass = "";
        this.fbpostclass = "";
        this.twitpostclass = "";
        this.createpostclass = "";
        this.leaderclass = "";
        this.postingclass = "";
        this.shouldopen2 = "";
        this.shouldopen1 = "";
    };
    this.shouldopen2 = "";
    this.shouldopen1 = "";


    var logoutsuccess = function(data, status) {
        console.log(data);
        $location.url("/login");
    }
    this.logoutapp = function() {
        console.log("Logout Pressed");
        console.log("Logout Pressed");
        console.log("Logout Pressed");
        MyServices.logout().success(logoutsuccess);

    }

    // DESIGN
    this.changeopen1 = function() {
        if (this.shouldopen1 == "open") {
            this.shouldopen1 = "";
        } else {
            this.shouldopen1 = "open";
        }
    };



    this.changeopen2 = function() {
        if (this.shouldopen2 == "open") {
            this.shouldopen2 = "";
        } else {
            this.shouldopen2 = "open";
        }
    };



    var d = new Date();
    this.year = d.getFullYear();
});