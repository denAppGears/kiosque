/**
 * Magazine thumbnail item view 
 */
define(['App', 'jquery', 'hbs!templates/items/magazineThumb', 'backbone'],

function(App, $, template, Backbone) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        className: 'span4',
        //view triggers
        triggers: {
            "click img": 'open',
            'click button.download': 'download',
            'click button.cancel': 'cancel'
        },
        // aliases some dom selectors 
        ui: {
            'progress': '.progress',
            'btnDownload': 'button .download',
            'btnCancel': 'button .cancel',
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
                triggerArgs.model.cancel();
            });
        },


        // on magazine downloading state changes
        modelEvents: {
            'change:downloading': 'onDownloadingChanged'
        },

        // events handlers
        onDownloadingChanged: function(magazine) {
            this.render();
            // switch (magazine.get('downloading')) {
            // case true:
            //     this.ui.progress.removeClass('hide');
            //     this.ui.btnCancel.removeClass('hide');
            //     this.ui.btnDownload.addClass('hide');
            //     break;
            // default:
            //     this.ui.progress.addClass('hide');
            //     this.ui.btnCancel.addClass('hide');
            //     this.ui.btnDownload.removeClass('hide');
            //     break;
            // }

        }
    });

});