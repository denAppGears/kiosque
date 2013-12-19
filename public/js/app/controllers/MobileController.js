define(['App', 'backbone', 'marionette', 'models/Model', 'collections/Magazines', 'collections/Downloads', 'collections/Repos', 'views/composites/Magazines', 'models/Repo','views/composites/Repos', 'views/MobileHeaderView', 'views/composites/MagNav','views/composites/ArticleNav','views/MagazineView'],

function(App, Backbone, Marionette, Model, MagazinesCollection, MagazinesDownloads, ReposCollection, MagazinesView, RepoModel, ReposView, MobileHeaderView,MagNavView,ArticleNavView, magazineView) {
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
            App.articleNavRegion.close();
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
                    pageTitle: repo.get('title'),
                    show:true
                })
            }));
            if (!App.collections.magazines) {
                
                App.collections.magazines = new MagazinesCollection([
                    {
                        id: 'cover',
                        orderId:0,
                        title: 'Les fêtes arrivent',
                        content: 'Les fêtes arrivent !',
                        downloadUrl: 'https://dl.dropboxusercontent.com/u/2582860/1.zip',
                        serverVersion: '10-10-2013',
                        localData:false,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/coverdef.png',
                        inMagList :true   
                    },
                     {
                        id: 'summary',
                        orderId:1,
                        title: 'Sommaire',
                        content: 'Les fêtes arrivent !',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/sommaire.png'
                    },
                     {
                        id: 3,
                        orderId:2,
                        title: 'Beauté',
                        content: 'Les fêtes arrivent !',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/beautyfrinteractif.png'
                    },{
                        id: 4,
                        orderId:3,
                        title: 'Mode',
                        content: 'Mode WSC',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/modefrinteractif.png'
                    },{
                        id: 6,
                        orderId:4,
                        title: 'Deco',
                        content: 'Deco WSC',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/decofrinteractif.png'
                    },{
                        id: 5,
                        orderId:5,
                        title: 'Cadeaux',
                        content: 'Cadeaux',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/cadeauxfrinteractif.png'
                    },{
                        id: 2,
                        orderId:6,
                        title: 'Nouveautés',
                        content: 'Nouveautés WSC',
                        serverVersion: '10-10-2013',
                        localData:true,
                        localVersion:'01-09-2013', 
                        repo : repo,
                        thumbSrc :'mags/thumbs/nouveautesfrinteractif_def.png'
                    }
                                                                    
                ]);

            }
            
            App.mainRegion.show(new MagazinesView({ collection : App.collections.magazines }) );
        },
        // Show magazine reader for the given models/magazine
        'read': function(magazine) {
            //App.headerRegion.currentView.hide();
              App.headerRegion.show(new MobileHeaderView({
                model: new Model({
                    goBackModel : magazine.get('repo'),
                    goBackAction:'magazines', 
                    label:'Liste',
                    pageTitle: ''
                })
            }));
            magazine.get('repo').set('navMode',false);
            App.collections.magazines.setElement( App.collections.magazines.at(0),true );
            App.articleNavRegion.show(new ArticleNavView({
                model: magazine.get('repo'),
                collection:App.collections.magazines
            }));
        },
        // Show article  for the given models/article
        'article' : function(magazine){
            App.magNavRegion.show(new MagNavView({ model: magazine}));
            // goBackModel : magazine.get('repo'), goBackAction:'magazines', label:'liste',
            var magView = new magazineView({model: magazine});
            magView.model.on('change:magContent',function(magazine){
                App.headerRegion.currentView.model.set({pageTitle:magazine.get('title')});
                App.mainRegion.show(magView);
            });
            magView.loadMagContent();  
        }
    });
});