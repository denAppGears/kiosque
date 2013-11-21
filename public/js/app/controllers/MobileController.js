define(['App', 'backbone', 'marionette', 'models/Model', 'collections/Magazines', 'collections/Downloads', 'collections/Repos', 'views/composites/Magazines', 'models/Repo','views/composites/Repos', 'views/MobileHeaderView', 'views/composites/MagNav','views/MagazineView'],

function(App, Backbone, Marionette, Model, MagazinesCollection, MagazinesDownloads, ReposCollection, MagazinesView, RepoModel, ReposView, MobileHeaderView,MagNavView, magazineView) {
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
                    
                }])
            });
            App.mainRegion.show(reposView);
        },
        // Show magazine feeds origins list
        'magazines': function(repo) {
            repo = new RepoModel({
                    id: 1,
                    title: 'Woluwe Shopping Center',
                    content: 'all magazines provided by WSC',
                    thumbSrc :'mags/1/thumb.png'
                    
            });
            App.magNavRegion.close();
            App.headerRegion.show(new MobileHeaderView({
                model: new Model({
                    goBackAction: '',
                    goBackModel : null,
                    label: '',
                    pageTitle: repo.get('title')
                })
            }));
            if (!App.collections.magazines) {
                
                App.collections.magazines = new MagazinesCollection([
                     {
                        id: 3,
                        title: 'Les fêtes arrivent !',
                        content: 'Les fêtes arrivent !',
                        downloadUrl: 'https://build.phonegap.com/apps/558893/download/android',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/1/3/thumb.png'
                    },{
                        id: 2,
                        title: 'In5 documentation',
                        content: 'demo, tutorial',
                        downloadUrl: 'https://build.phonegap.com/apps/558893/download/android',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/1/2/thumb.png'
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
                    label: '',
                    pageTitle: '',//magazine.get('title'),
                    magazine:magazine
                })
            }));

            App.magNavRegion.show(new MagNavView({
                model: magazine
            }));
            
            var magView = new magazineView({model: magazine});
            magView.model.on('change:magContent',function(magazine){
                App.mainRegion.show(magView);
            });
            magView.loadMagContent();    
        }
    });
});