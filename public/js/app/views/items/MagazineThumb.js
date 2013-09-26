/**
 * Magazine thumbnail item view 
 */
define(['App', 'jquery', 'hbs!templates/items/magazineThumb', 'backbone'],

function(App, $, template, Backbone) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        className: 'span4',
        triggers: {
            "click": 'open:magazine'
        },
        initialize: function() {
            this.on("open:magazine", function(triggerArgs) {
                App.vent.trigger('goto', {
                    action: 'read',
                    model:triggerArgs.model
                });
            });
        }

    });

});