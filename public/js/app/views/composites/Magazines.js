/**
 * Magazine  composite view 
 */
define(['App','jquery', 'backbone', 'views/items/MagazineThumb', 'hbs!templates/magazines'],

function(App,$, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        itemViewContainer:'#list',
        onRender : function(){ 
                App.vent.trigger('startViewLoaded'); 
        }
        //emptyView: NoItemsView
        
    });
});