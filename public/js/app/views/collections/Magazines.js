/**
 * Magazine  collection view 
 */
define(['jquery', 'backbone', 'views/items/Magazine'],

function($, Backbone, MagazineView) {
    return Backbone.Marionette.CollectionView.extend({
        itemView: MagazineView,
        tagName: 'ul'
    });
});