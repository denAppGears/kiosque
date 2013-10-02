define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],

function($, Backbone, Marionette, _, Handlebars, MagazineDownloads) {

    var App = new Backbone.Marionette.Application();

    //collection pesistence key init
    App.collections = {};
    
    function isMobile() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //force user agent
        userAgent = 'iPad';
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    }

    //Organize Application into regions corresponding to DOM elements
    //Regions can contain views, Layouts, or subregions nested as necessary
    App.addRegions({
        headerRegion: "header",
        mainRegion: "#main",
        listRegion: "#list"
    });

    App.addInitializer(function() {
        Backbone.history.start();
    });

    App.mobile = isMobile();

    return App;
});