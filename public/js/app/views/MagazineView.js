/**
 * View of the magazine detailed content
 */
define(['App', 'backbone', 'marionette', 'jquery', 'models/Magazine', 'hbs!templates/magazine','in5','iscroll'],

function(App, Backbone, Marionette, $, Magazine, template) {

    return Backbone.Marionette.ItemView.extend({
        template: template,
        model:Magazine,
        //tagName,
        className:'paper-vertical',
        //id:,   
        initialize: function() {
            _.bindAll(this);
        },
        modelEvents:{
            'change:currentPage' :'onCurrentPageChanged'
        },
        loadMagContent : function(){
            if(this.model.get('magContent')){
                console.log('getSavedMagcontent');
                this.model.trigger('change:magContent',this.model); 
                return;
            }
            var that = this;
            var magContentUrl = this.model.get('magPath') + '/parsed.html';
            var articleCssUrl = this.model.get('magPath') + '/assets/css/parsed.css';  
            $.get( magContentUrl, function( magContent ) {
                console.log('loadArticleContent');
                var $content = magContent;
                $.get( articleCssUrl, function( cssContent ) {
                         console.log('cssLoaded');
                         that.model.set('magContent', {css:cssContent,html:$content} );   
                });
            });
        },
        loadCss : function(){
            var that = this;    
            var magCsss = this.model.get('cssPaths');
            _.each(magCsss,function(href){
                 $.get( that.model.get('magPath') + '/' + href , function( cssContent ) {
                         
                       that.trigger('cssLoaded',cssContent.split('/*CSS Generated from InDesign Styles*/')[1]) ;
                 });
            });     
        },
        loadPage : function (pageId){
            console.log('loadPage ' + pageId);
            var transition = (pageId > this.model.get('backPage'))? 'up' : 'down' ;  
            viewSwiper.scrollToPage(0,pageId-1,0);           
        },
        parseLinks : function (html){
            console.log('parseLinks');
            var that = this;
            var $parsed = $(html);
            var pageCount = 0;
            
            $parsed.find('img').each(function(index,el){
                $(this).attr('src', that.model.get('magPath') + '/' + $(this).attr('src') );
            });
            
            var magCsss = [];
            $parsed.filter('link[rel="stylesheet"]').each(function(index){      
              magCsss.push( $(this).attr('href') );
            });
            that.model.set('cssPaths', magCsss);
            
            $parsed.find('video').each(function(index,el){
                $(this).attr('poster', that.model.get('magPath') + '/' + $(this).attr('poster'));
                $('object',this).remove();
            });
            
            $parsed.find('.mso.slideshow').each(function(index,el){
                $(this).attr('data-useswipe',0);
            });
            
            $parsed.find('source').each(function(index,el){
                $(this).attr('src',$(this).attr('src') );
            });
            
            $parsed.filter('script').each(function(index,el){
                $(this).removeAttr('src');
            });
            
            $parsed.find('.page').each(function(index,el){
               $(this).addClass('slide');
               pageCount++;
            });
            this.model.set('pageCount',pageCount);
  
            return $parsed.find('.pages').html();
   
        },
        onCurrentPageChanged : function(magazine){
            this.loadPage( magazine.get('currentPage') );
        },
        onShow : function (){ 
           $("#menu").remove();       
           var that = this; 
           var magazine = this.model ;
           
           var nextArticle = App.collections.magazines.getNext() ;
           var prevArticle = App.collections.magazines.getPrev();
             //load prev and next articles thumbs
            
            if( nextArticle ){
                $('button.next div').first().css('background-image','url("' + App.collections.magazines.getNext().get('thumbSrc') + '")');
            }
            if( prevArticle ){
                $('button.prev div').first().css('background-image','url("' + App.collections.magazines.getPrev().get('thumbSrc') + '")');
            }
                
            // init Iscroller
        
            function onImagesLoaded() {
                 console.log('AllImagesLoaded');
                setTimeout(function () {
                   console.log('setViewSwiper');
                   var confirmDist = 150;
                   var sugestDist = 90;
                   viewSwiper = new iScroll('wrapper', {
                        snap: 'li',
                        momentum: false,
                        lockDirection:true,
                        snapThreshold:200,
                        hScrollbar: false,
                        vScrollbar: false,
                        hScroll:false,
                        onScrollEnd: function () {
                            if(viewSwiper.currPageY != (magazine.get('currentPage') - 1) ){
                                magazine.set('currentPage', viewSwiper.currPageY + 1);
                            }
                            if( viewSwiper.absDistX >= confirmDist && viewSwiper.distX < 0 && nextArticle){
                                $('button.next','#articleNav').addClass('confirmed');
                                that.$el.trigger('nextArticle');
                                console.log('swipeRIGHT');
                            }
                            if( viewSwiper.absDistX >= confirmDist && viewSwiper.distX > 0 && prevArticle){
                                $('button.prev','#articleNav').addClass('confirmed');    
                                that.$el.trigger('prevArticle');
                                console.log('swipeLEFT');
                            }
                            $('button','#articleNav').removeClass('sugested');
                            $('button','#articleNav').removeClass('confirmed');
                            
                            console.log(viewSwiper);
                            
                        },
                        onScrollMove : function(){
                            if( viewSwiper.absDistX > confirmDist && viewSwiper.distX < 0){
                                $('button.next','#articleNav').addClass('confirmed');
                                $('button.prev','#articleNav').removeClass('confirmed');
                            }
                            if( viewSwiper.absDistX > confirmDist && viewSwiper.distX > 0){
                                $('button.prev','#articleNav').addClass('confirmed');
                                $('button.next','#articleNav').removeClass('confirmed');
                            }
                            if( viewSwiper.absDistX >= sugestDist && viewSwiper.absDistX <= sugestDist ){
                                    $('button.prev','#articleNav').removeClass('confirmed');
                                    $('button.next','#articleNav').removeClass('confirmed');
                            }
                            if( viewSwiper.absDistX >= sugestDist && viewSwiper.distX < 0){
                                $('button.next','#articleNav').addClass('sugested');
                                $('button.prev','#articleNav').removeClass('sugested');
                                
                            }
                            if( viewSwiper.absDistX >= sugestDist && viewSwiper.distX > 0){
                                $('button.prev','#articleNav').addClass('sugested');
                                $('button.next','#articleNav').removeClass('sugested');
                                
                            }
                        }
                   });
                   
                   magazine.set('currentPage', 1); 
                   //magazine.trigger('change:currentPage',magazine);
           
                }, 100);
                
                console.log('show mag Container');
                $('#magContainer',that.$el).css('left','0');
                
                clickEv = 'click';
                
                $(document).trigger('assignIn5');
             
                //handling In5 onClicks Buttons actions:
                console.log('overrideIn5');
                
                /*
                $('video').parent().each(function(){
                    $(this).appendTo( $(this).parent('li.page') );
                });
                */
                
                $('video').on('play',function(){
                    var videoEl = $(this)[0];
                    var random = new Date().getMilliseconds();
                    $('source',this).attr('src',$('source',this).attr('src') + '?' + random);
                    $( '<div class="video-mask"></div>' ).insertBefore( $(this).parent() ); //
                    
                    $('.video-mask').not('video').on(clickEv,function(event){
                        //event.stopImmediatePropagation();
                        videoEl.pause();
                    });
                    $(this).show();
                });
                
                $('video').on('pause',function(){
                    $(this).hide();
                    $('.video-mask').hide();
                });
            
                
                $('button[data-gotoarticle]').on('click',function(){
                    var article = App.collections.magazines.setElement( App.collections.magazines.get( $(this).data('gotoarticle') ) );
                });
                
                that.$el.on('nextArticle',function(){
                    console.log('nextArticle');
                    App.collections.magazines.next();
                }); 
                that.$el.on('prevArticle',function(){
                    console.log('prevArticle');
                    App.collections.magazines.prev();
                });
                
                nav.to = function(pageId){
                    magazine.set('currentPage',pageId);
                };
                nav.next = function(){
                    magazine.set('currentPage',magazine.get('currentPage')+1);
                };
                nav.back = function(){
                    magazine.set('currentPage',magazine.get('currentPage')-1);
                };
          
            }
            
            //waiting for images to be loaded
            var total = $(this.$el).find('img').length;
            var loaded = 0;
            $( "img",this.$el ).load(function(){
                loaded++;
                if( total == loaded ){
                    onImagesLoaded();
                }
            });
        
        },
        onClose: function(){
            $('.magcss',$('head')).remove();
        }
    });
});