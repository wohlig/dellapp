var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function () {
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

    this.noactive = function () {
        this.homeclass = "";
        this.profileclass = "";
        this.tablefbclass = "";
        this.tabletwitclass = "";
        this.fbpostclass = "";
        this.twitpostclass = "";
        this.createpostclass = "";
        this.createpostclass = "";
        this.leaderclass = "";
    };

    var d = new Date();
    this.year = d.getFullYear();
});