/**
 * View Item Magazine Thumbnail
 */
define(['App', 'jquery', 'hbs!templates/items/magazineThumb', 'backbone','views/modal/confirm'],

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
                // config a confirm view to pass to the region modal.
                var modalParams = new Backbone.Model({
                    actionLabel: 'remove', 
                    cancelLabel: 'cancel',  
                    actionCallBack:triggerArgs.model.removeDatas,
                    actionOptions:{},
                    modalTitle : 'magazine local data removal',
                    modalContent : "Are you sure you want to remove the localy saved magazine ? you'll have to download it again in order to read it."
                }) ;
                App.modalRegion.show( new confirmView({ model : modalParams }) );
                //triggerArgs.model.removeDatas();
            });
        },


        // on magazine downloading state changes
        modelEvents: {
            'change:downloading': 'onDownloadingChanged',
            'change:dlProgress': 'onDownloadingChanged',
            'change:dlAvailable' : 'onDownloadingChanged'
        },
        // events handlers
        onDownloadingChanged: function(magazine) {
            this.render();
        }
    });

});