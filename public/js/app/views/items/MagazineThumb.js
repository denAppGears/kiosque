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
                /*
                    @todo do git pull request to assign options in popup object to be able to pass parameters to the callBack function !
                */
                $.ui.popup( {
                    title:"Magazine removal",
                    message:"Are you sure you want to remove the localy saved magazine ? you'll have to download it again in order to read it.",
                    cancelText:"Cancel",
                    cancelCallback: function(){console.log("Removal canceled");},
                    doneText:"Remove",
                    doneCallback: function(){
                        App.collections.magazines.get( arguments[0].addCssClass.split('_')[1] ).removeDatas();
                    },
                    cancelOnly:false,
                    addCssClass : 'popup-remove-magazine-id'+ '_' + triggerArgs.model.get('id')
                });
                
                //App.modalRegion.show( new confirmView({ model : modalParams }) );
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