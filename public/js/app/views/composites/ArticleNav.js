/**
 * Magazine Navigator composite view 
 */
define(['App','jquery', 'backbone', 'views/items/articleNavThumb', 'hbs!templates/articlenav'],

function(App,$, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        tagName : "div",
        itemViewContainer:'#magArticlesThumbs'
    });
});