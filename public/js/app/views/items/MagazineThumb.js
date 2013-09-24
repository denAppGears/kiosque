/**
 * Magazine thumbnail item view 
 */
define(['App', 'jquery', 'hbs!templates/items/magazineThumb', 'backbone', 'views/MagazineView'],

function(App, $, template, Backbone, magazineView) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        triggers: {
            "click": 'open:magazine'
        },
        initialize: function() {
            this.on("open:magazine", function(triggerArgs) {
                App.vent.trigger( 'goto:read', triggerArgs.model);
            });
        }

    });

});