/**
 * Magazine  collection view 
 */
define(['jquery', 'backbone', 'views/items/MagazineThumb'],

function($, Backbone, MagazineView) {
    return Backbone.Marionette.CollectionView.extend({
        itemView: MagazineView,
        tagName: 'ul'
    });
});