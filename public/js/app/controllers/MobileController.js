define(['App', 'backbone', 'marionette', 'models/Model', 'collections/Magazines', 'collections/Articles','collections/Downloads', 'collections/Repos', 'views/composites/Magazines', 'models/Repo','views/composites/Repos', 'views/MobileHeaderView', 'views/composites/PageNav','views/composites/ArticleNav','views/ArticleView'],

function(App, Backbone, Marionette, Model, MagazinesCollection, ArticlesCollection, MagazinesDownloads, ReposCollection, MagazinesView, RepoModel, ReposView, MobileHeaderView,PageNavView,ArticleNavView, ArticleView) {
    return Backbone.Marionette.Controller.extend({
        
        initialize: function(options) {
            var controller = this;
            
            App.downloads = new MagazinesDownloads();
            
            //Goto Controller action
            App.vent.on('goto', function(options) {
                controller[options.action](options.model);
            });
        },

        //DEFAULT show repos list as defined in app/router
        'repos': function() {
            App.pageNavRegion.close();
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
            App.pageNavRegion.close();
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
                
                var articlesFR = new ArticlesCollection([
                    {
                        id: 'cover',
                        orderId:0,
                        title: 'Les fêtes arrivent',
                        content: 'Les fêtes arrivent !',
                        thumbSrc :'mags/thumbs/coverdef.png'
                    },
                     {
                        id: 'summary',
                        orderId:1,
                        title: 'Sommaire',
                        thumbSrc :'mags/thumbs/sommaire.png'
                    },
                     {
                        id: 3,
                        orderId:2,
                        title: 'Beauté',
                        thumbSrc :'mags/thumbs/beautyfrinteractif.png'
                    },
                    {
                        id: 4,
                        orderId:3,
                        title: 'Mode',
                        thumbSrc :'mags/thumbs/modefrinteractif.png'
                    },
                    {
                        id: 6,
                        orderId:4,
                        title: 'Deco',
                        thumbSrc :'mags/thumbs/decofrinteractif.png'
                    },
                    {
                        id: 5,
                        orderId:5,
                        title: 'Cadeaux',
                        thumbSrc :'mags/thumbs/cadeauxfrinteractif.png'
                    },
                    {
                        id: 2,
                        orderId:6,
                        title: 'Nouveautés',
                        thumbSrc :'mags/thumbs/nouveautesfrinteractif_def.png'
                    }
                ]);
                var articlesNL = new ArticlesCollection([
                    {
                        id: 'cover',
                        orderId:0,
                        title: 'NL - Les fêtes arrivent',
                        content: 'Les fêtes arrivent !',
                        thumbSrc :'mags/thumbs/coverdef.png'
                    },
                     {
                        id: 'summary',
                        orderId:1,
                        title: 'NL - Sommaire',
                        thumbSrc :'mags/thumbs/sommaire.png'
                    },
                     {
                        id: 3,
                        orderId:2,
                        title: 'NL - Beauté',
                        thumbSrc :'mags/thumbs/beautyfrinteractif.png'
                    },
                    {
                        id: 4,
                        orderId:3,
                        title: 'NL - Mode',
                        thumbSrc :'mags/thumbs/modefrinteractif.png'
                    },
                    {
                        id: 6,
                        orderId:4,
                        title: 'NL - Deco',
                        thumbSrc :'mags/thumbs/decofrinteractif.png'
                    },
                    {
                        id: 5,
                        orderId:5,
                        title: 'NL - Cadeaux',
                        thumbSrc :'mags/thumbs/cadeauxfrinteractif.png'
                    },
                    {
                        id: 2,
                        orderId:6,
                        title: 'NL - Nouveautés',
                        thumbSrc :'mags/thumbs/nouveautesfrinteractif_def.png'
                    }
                ]);
                
                App.collections.magazines = new MagazinesCollection([
                    {
                            id: 'fr',
                            orderId:0,
                            title: 'FR - Les fêtes arrivent',
                            content: 'Les fêtes arrivent !',
                            downloadUrl: 'https://dl.dropboxusercontent.com/u/2582860/1.zip',
                            serverVersion: '10-10-2013',
                            localData:false,
                            localVersion:'01-09-2013', 
                            repo : repo,
                            thumbSrc :'mags/thumbs/coverdef.png',
                            inMagList :true,
                            articles:articlesFR
                    },{
                            id: 'nl',
                            orderId:1,
                            title: 'NL - Les fêtes arrivent',
                            content: 'NL Les fêtes arrivent !',
                            downloadUrl: 'https://dl.dropboxusercontent.com/u/2582860/2.zip',
                            serverVersion: '10-10-2013',
                            localData:false,
                            localVersion:'01-09-2013', 
                            repo : repo,
                            thumbSrc :'mags/thumbs/coverdef.png',
                            inMagList :true,
                            articles:articlesNL
                    }
                                                                    
                ]);
            }
            
            App.mainRegion.show(new MagazinesView({ collection : App.collections.magazines }) );
        },
        // Show magazine reader for the given models/magazine
        'read': function(magazine) {
            var articles = magazine.get('articles');
            App.collections.articles = articles;
            
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
            articles.setElement( articles.at(0),true );
            App.articleNavRegion.show(new ArticleNavView({
                model: magazine.get('repo'),
                collection:articles//App.collections.magazines
            }));
        },
        // Show article  for the given models/article
        'article' : function(article){
            App.pageNavRegion.show( new PageNavView({ model: article}));
            // goBackModel : magazine.get('repo'), goBackAction:'magazines', label:'liste',
            var articleView = new ArticleView({model: article});
            articleView.model.on('change:magContent',function(article){
                App.headerRegion.currentView.model.set({pageTitle:article.get('title')});
                App.mainRegion.show(articleView);
            });
            articleView.loadMagContent();
        }
    });
});