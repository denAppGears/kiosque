/**
 * Magazine  composite view 
 */
define(['App','jquery', 'backbone', 'views/items/MagazineThumb', 'hbs!templates/magazines'],

function(App,$, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        itemViewContainer:'#list',
        className :'topcoat-list',
        onRender : function(){
            this.$el.attr({id:'list_panel',selected:"true"});           
        },
        onShow: function(){
            App.vent.trigger('startViewLoaded');
            $('#list_panel').show();
        }
    });
});