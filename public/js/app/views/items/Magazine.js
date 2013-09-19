/**
 * Magazine item view 
 */
define(['jquery', 'hbs!templates/magazineItem', 'backbone', 'marionette'],

function($, template, Backbone) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName:'li'
    });
});