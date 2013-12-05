/**
 * Magazine Navigator composite view 
 */
define(['App','jquery', 'backbone', 'views/items/articleNavThumb', 'hbs!templates/articlenav'],

function(App,$, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        tagName : "div",
        itemViewContainer:'#magArticlesThumbs',
        onRender : function(){
            if(!this.model.get('navMode')){
                this.hide();
            }
        },
        hide : function(){
            $('#article_container',this.$el).css('bottom','-120px');
        },
        show : function(){
            $('#article_container',this.$el).css('bottom','0px');
        }
    });
});