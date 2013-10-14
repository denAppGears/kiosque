// Include Mobile Specific JavaScript files here (or inside of your Mobile Controller, or differentiate based off App.mobile === false)
require(["App", "jquery", "routers/AppRouter", "controllers/MobileController", "backbone", "marionette", "backbone.validation", "moment", "bootstrap"],
//"jquerymobile"
function(App, $, AppRouter, AppController) {
    
    App.addInitializer(function() {
        //app router init    
        this.appRouter = new AppRouter({
            controller: new AppController()
        });
        
        this.vent.on('startViewLoaded',function(){
            if (App.isPhonegap) navigator.splashscreen.hide();
        });
    });
    //Check if we're on phonegap
    function isPhonegap() {
        App.isPhonegap = APP_ENV.isPhonegap;
        return App.isPhonegap ;
    }
    
    // starts the application when device's ready.
    function onDeviceReady() {
        App.start();
    }
    
    App.isPhonegap = isPhonegap();
    
    var r = (!App.isPhonegap) ? onDeviceReady() : document.addEventListener("deviceready", onDeviceReady, false );
});