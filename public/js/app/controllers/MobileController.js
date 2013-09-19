define(['App', 'backbone', 'marionette', 'views/MagazinesView', 'views/collections/Magazines', 'views/MobileHeaderView'],

function(App, Backbone, Marionette, MagazinesView, MagazinesCollectionView, MobileHeaderView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function(options) {
            App.headerRegion.show(new MobileHeaderView());
        },
        //gets mapped to in AppRouter's appRoutes
        index: function() {
            var MagView = new MagazinesView();
            App.mainRegion.show(new MagazinesCollectionView({
                collection: MagView.magazines
            }));
        }
    });
});