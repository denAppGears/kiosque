define(['App', 'backbone', 'marionette', 'collections/Magazines', 'views/composites/Magazines', 'views/MobileHeaderView', 'views/MagazineView'],

function(App, Backbone, Marionette, MagazinesCollection, MagazinesView, MobileHeaderView, magazineView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function(options) {
            App.headerRegion.show( new MobileHeaderView());
            
            /**
             * Goto pages Events
             */
            var controller = this;
            
            //Goto Controller action
            App.vent.on('goto', function(options) {
                controller[options.action](options.model);
            });

        },

        //gets mapped to in AppRouter's appRoutes
        index: function() {
            
            var MagazineListerView = new MagazinesView({
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