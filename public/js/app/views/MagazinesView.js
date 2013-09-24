/**
 * Magazines lister View
 */
define(['App', 'backbone', 'marionette', 'jquery', 'hbs!templates/magazines'],

function(App, Backbone, Marionette, $, Magazines, template) {

    return Backbone.Marionette.ItemView.extend({
        template: template,

        initialize: function() {
            _.bindAll(this);
        }
    });
});