// Include Mobile Specific JavaScript files here (or inside of your Mobile Controller, or differentiate based off App.mobile === false)
require(["App", "jquery", "routers/AppRouter", "controllers/MobileController", "backbone", "marionette", "backbone.validation", "moment","fastclick","appframework.ui.min"],
//"jquerymobile"
        
function(App, $, AppRouter, AppController) {
    
    //init fastclick on body
    FastClick.attach(document.body);
    
    $.ui.removeFooterMenu();
    
    App.addInitializer(function() {
        //app router init    
        this.appRouter = new AppRouter({
            controller: new AppController()
        });
        
        this.vent.on('startViewLoaded',function(){
            console.log('app:startViewLoaded');
            if( App.isPhonegap){ 
               //init AFUI    
                $.ui.ready( function(){
                    navigator.splashscreen.hide();
                });
            }    
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