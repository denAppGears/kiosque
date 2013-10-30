/**
 * Magazine  composite view 
 */
define(['App','jquery', 'backbone', 'views/items/RepoThumb', 'hbs!templates/magazines'],

function(App,$, Backbone, itemView, template) {
    return Backbone.Marionette.CompositeView.extend({
        template: template,
        itemView: itemView,
        itemViewContainer: '#list',
        //emptyView: NoItemsView,
        onRender : function(){ 
            App.vent.trigger('startViewLoaded'); 
        }
    });
});