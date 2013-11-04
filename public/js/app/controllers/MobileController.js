define(['App', 'backbone', 'marionette', 'models/Model', 'collections/Magazines', 'collections/Downloads', 'collections/Repos', 'views/composites/Magazines', 'views/composites/Repos', 'views/MobileHeaderView', 'views/composites/MagNav','views/MagazineView'],

function(App, Backbone, Marionette, Model, MagazinesCollection, MagazinesDownloads, ReposCollection, MagazinesView, ReposView, MobileHeaderView,MagNavView, magazineView) {
    return Backbone.Marionette.Controller.extend({
        initialize: function(options) {

            var controller = this;

            // init magazine downloads stack collection
            App.downloads = new MagazinesDownloads();

            //Goto Controller action
            App.vent.on('goto', function(options) {
                controller[options.action](options.model);
            });

        },

        //DEFAULT show repos list as defined in app/router
        'repos': function() {
            App.magNavRegion.close();
            App.headerRegion.show(new MobileHeaderView({
                model: new Model({
                    pageTitle: "Magazines Repositories"
                })
            }));
            
            var reposView = new ReposView({
                'collection': new ReposCollection([{
                    id: 1,
                    title: 'Woluwe Shopping Center',
                    content: 'all magazines provided by WSC',
                    thumbSrc :'mags/1/thumb.png'
                    
                }]),
                // default view -> trigger startViewLoaded when rendered !
                'onRender' : function(){ 
                    App.vent.trigger('startViewLoaded'); 
                }
            });
            App.mainRegion.show(reposView);
        },
        // Show magazine feeds origins list
        'magazines': function(repo) {
            App.magNavRegion.close();
            App.headerRegion.show(new MobileHeaderView({
                model: new Model({
                    goBackAction: 'repos',
                    goBackModel : null,
                    label: 'Repos',
                    pageTitle: repo.get('title')
                })
            }));
            if (!App.collections.magazines) {
                
                App.collections.magazines = new MagazinesCollection([{
                        id: 1,
                        title: 'mag1',
                        content: 'htm5 content1',
                        downloadUrl: 'https://build.phonegap.com/apps/558893/download/android',
                        serverVersion: '01-10-2013',
                        repo : repo,
                        thumbSrc :'mags/1/1/thumb.png'
                    }, {
                        id: 2,
                        title: 'mag2',
                        content: 'htm5 content2',
                        downloadUrl: 'https://build.phonegap.com/apps/558893/download/android',
                        serverVersion: '01-10-2013',
                        repo : repo,
                        thumbSrc :'mags/1/2/thumb.png'
                    }, {
                        id: 3,
                        title: 'mag3',
                        content: 'htm5 content3',
                        downloadUrl: 'https://build.phonegap.com/apps/558893/download/android',
                        serverVersion: '01-09-2013',
                        repo : repo,
                        thumbSrc :'mags/1/3/thumb.png'
                    }, {
                        id: 4,
                        title: 'mag4',
                        content: 'htm5 content4',
                        downloadUrl: 'https://build.phonegap.com/apps/558893/download/android',
                        serverVersion: '20-09-2013',
                        repo : repo,
                        thumbSrc :'mags/1/4/thumb.png'
                    }
                                                                    
                ]);

            }

            App.mainRegion.show(new MagazinesView({ collection : App.collections.magazines }) );
        },
        // Show magazine reader for the given models/magazine
        'read': function(magazine) {
            App.headerRegion.show(new MobileHeaderView({
                model: new Model({
                    goBackAction: 'magazines',
                    goBackModel : magazine.get('repo'),
                    label: 'Magzs',
                    pageTitle: magazine.get('title'),
                    magazine:magazine
                })
            }));

            App.magNavRegion.show(new MagNavView({
                model: magazine
            }));
            
            App.mainRegion.show(new magazineView({
                model: magazine
            }));
            
        }
    });
});