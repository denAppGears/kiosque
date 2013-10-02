/**
 * Magazine  composite view 
 */
define(['jquery', 'backbone', 'views/items/MagazineThumb', 'hbs!templates/magazines'],

function($, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        itemViewContainer:'#list'
        //emptyView: NoItemsView
        
    });
});