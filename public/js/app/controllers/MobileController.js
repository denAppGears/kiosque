define(['App', 'backbone', 'marionette', 'collections/Magazines', 'views/collections/Magazines', 'views/MobileHeaderView', 'views/MagazineView'],

function(App, Backbone, Marionette, MagazinesCollection, MagazinesCollectionView, MobileHeaderView, magazineView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function(options) {
            App.headerRegion.show( new MobileHeaderView());
            
            /**
             * Got to pages Events
             */
            var controller = this;

            //Goto Magazine Reader
            App.vent.on('goto:read', function(magazine) {
                controller.read(magazine);
            });
            //Goto Magazine list
            App.vent.on('goto:index', function() {
                controller.index();
            });

        },

        //gets mapped to in AppRouter's appRoutes
        index: function() {
            
            var MagazineListerView = new MagazinesCollectionView({
                collection: new MagazinesCollection([{
                    id: 1,
                    title: 'mag1',
                    content: 'htm5 content1'
                }, {
                    id: 2,
                    title: 'mag2',
                    content: 'htm5 content2'
                }, {
                    id: 3,
                    title: 'mag3',
                    content: 'htm5 content3'
                }])
            });

            App.mainRegion.show(MagazineListerView);
        },

        // show magazine reader for the given models/magazine
        read: function(magazine) {
            //App.headerRegion.close();
            App.mainRegion.show(new magazineView({model:magazine}));
        }
    });
});