/**
 * Magazine thumbnail item view 
 */
define(['App', 'jquery', 'backbone','views/items/MagazineThumb'],

function(App, $, Backbone, magazineThumb) {
    return magazineThumb.extend({
        initialize: function() {
            this.on("open", function(triggerArgs) {
                App.vent.trigger('goto', {
                    action: 'magazines',
                    model:triggerArgs.model
                });
            });
        }
    });

});