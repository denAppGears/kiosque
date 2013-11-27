/**
 * View Item Magazine Thumbnail
 */
define(['App', 'jquery', 'hbs!templates/items/magazineThumb', 'backbone'],

function(App, $, template, Backbone,confirmView) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        className: 'span4',
        //view triggers
        triggers: {
            'click button.download': 'download',
            'click button.cancel': 'cancel',
            'click button.update': 'update',
            'click button.open': 'open',
            'click div.thumbnail': 'open',
            'click button.remove': 'remove'
        },

        initialize: function(attributes) {
            this.on("open", function(triggerArgs) {
                App.vent.trigger('goto', {
                    action: 'read',
                    model: triggerArgs.model
                });

            });
            this.on("download", function(triggerArgs) {
                triggerArgs.model.download();
            });
            this.on("cancel", function(triggerArgs) {
                triggerArgs.model.endDownload();
            });
            this.on("remove", function(triggerArgs) {
                    
                    //phonegap notification !
                    navigator.notification.confirm(
                        "Are you sure you want to remove the localy saved magazine ? you'll have to download it again in order to read it.", // message
                        function(){
                            console.log("Removal canceled");
                        },function(){
                            App.collections.magazines.get( arguments[0].addCssClass.split('_')[1] ).removeDatas();
                        },            
                        // callback to invoke with index of button pressed
                        'Magazine removal',           // title
                        ['cancel','remove']         // buttonLabels
                    );
                
            });
        },


        // on magazine downloading state changes
        modelEvents: {
            'change:downloading': 'onDownloadingChanged',
            'change:dlProgress': 'onDownloadingChanged',
            'change:dlAvailable' : 'onDownloadingChanged',
            'change:localData' : 'onDownloadingChanged'
        },
        // events handlers
        onDownloadingChanged: function(magazine) {
            this.render();
        }
    });

});