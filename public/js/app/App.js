define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars','regions/ModalRegion'],

function($, Backbone, Marionette, _, Handlebars,modalRegionClass) {

    var App = new Backbone.Marionette.Application();
    
    function isMobile() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        //force user agent
        userAgent = 'iPad';
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    }

    // Platform Agnostic initializer.
    App.addInitializer(function() {
        //collection cache object init
        this.collections = {};
        
        var modalRegion = new modalRegionClass();
        
        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        this.addRegions({
            headerRegion: "#header",
            mainRegion: "#main",
            listRegion: "#list",
            modalRegion: modalRegion
        });
        // add a modal region wich exends marionette region.
    });
    //Platform Agnostic Last initializer.
    App.on("initialize:after", function(options){
      if (Backbone.history){
        Backbone.history.start();
      }
    });

    App.mobile = isMobile();

    return App;
});