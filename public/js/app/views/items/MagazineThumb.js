/**
 * Magazine thumbnail item view 
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
                App.modalRegion.show( new confirmView() );
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