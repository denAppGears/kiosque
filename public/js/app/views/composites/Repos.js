/**
 * Magazine  composite view 
 */
define(['jquery', 'backbone', 'views/items/RepoThumb', 'hbs!templates/magazines'],

function($, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        itemViewContainer:'#list'
        //emptyView: NoItemsView,
    });
});