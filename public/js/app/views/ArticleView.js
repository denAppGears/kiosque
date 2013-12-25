/**
 * View of the article detailed content
 */
define(['App', 'backbone', 'marionette', 'jquery', 'models/Article', 'hbs!templates/article','iscroll'], //'in5',

function(App, Backbone, Marionette, $, Model, template) {

    return Backbone.Marionette.ItemView.extend({
        template: template,
        model:Model,
        className:'paper-vertical',
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
        onCurrentPageChanged : function(article){
            this.loadPage( article.get('currentPage') );
            App.vent.trigger('currentPageChange');
        },
       
        onShow : function (){ 
           $("#menu").remove();       
           var that = this; 
           var article = this.model ;
           
           var nextArticle = App.collections.articles.getNext() ;
           var prevArticle = App.collections.articles.getPrev();
             //load prev and next articles thumbs
            
            if( nextArticle ){
                $('button.next div').first().css('background-image','url("' + App.collections.articles.getNext().get('thumbSrc') + '")');
            }
            if( prevArticle ){
                $('button.prev div').first().css('background-image','url("' + App.collections.articles.getPrev().get('thumbSrc') + '")');
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
                        bounce: false,
                        bounceLock: false,
                        onScrollEnd: function () {
                             
                            if(viewSwiper.currPageY != (article.get('currentPage') - 1) ){
                                article.set('currentPage', viewSwiper.currPageY + 1);
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
                            
                            //console.log(viewSwiper);
                            
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
                   
                   article.set('currentPage', 1);
                   console.log('show mag Container');
                   $('#magContainer',that.$el).addClass('active');
           
                }, 100);
         
                
                //$(document).trigger('assignIn5');
             
                //handling In5 onClicks Buttons actions:
                console.log('assignIn5');
                clickEv = 'click';
                var nav = {};
                
                /*
                 *  VIDEO CLICK PLAY
                 */
                _.each($('video'),function(videoEl){
                        
                        var $spinner = $('.video-spinner', $(videoEl).parent());
                        var $mask = $('.video-mask',$(videoEl).parent().parent() );
                        var $videoEl = $(videoEl);
                        
                        $videoEl.on('error',function(error){
                           console.log('error while loading video src : ' + error.currentTarget.currentSrc);
                           $videoEl.trigger('pause');
                          
                        });
                        
                        $videoEl.on('timeupdate',function(event){
                               console.log('timeupdate : ' + videoEl.currentTime + ' paused : ' + videoEl.paused + ' show :' + $videoEl.hasClass('active') );  
                               if( !$videoEl.hasClass('active') && videoEl.currentTime > 0 && !videoEl.paused ) {
                                      $videoEl.trigger('isPlaying');         
                               }
                        });
                        
                        $videoEl.on('isPlaying',function(event){
                               $(videoEl).addClass('active');
                               $spinner.removeClass('active');
                        });
                        
                        /*
                        $videoEl.on('progress',function(event){
                                console.log('progress : ' + videoEl.duration );
                        });
                        */
                        
                        /*
                        $videoEl.on('canplaythrough canplay',function(event){
                                console.log('can play through now..');
                               videoEl.play();
                        });
                        */
 
                        $mask.not('video').on(clickEv,function(event){
                               console.log('mask has been clicked !');
                               if( $videoEl.hasClass('active') && $mask.hasClass('active') && !videoEl.paused ){
                                 $videoEl.trigger('rewind');
                               }
                              
                        });
                        
                        /* 
                        $videoEl.on('loadstart',function(event){                  
                            $spinner.addClass('active');
                            console.log('start loading : ' + event.currentTarget.currentSrc );
                            console.log('is video format supported for : ' + event.currentTarget.currentSrc + ' : ' + videoEl.canPlayType($('source',videoEl).attr('type')) );   
                            
                        });
                        */

                        $videoEl.on('onstalled ended',function(){
                                console.log('video Stalled or Ended');
                                videoEl.pause();
                        }); 
                       
                        $videoEl.on('rewind',function(){
                           console.log('rewind and pause .. Standing by.')     
                           videoEl.pause(); 
                           videoEl.currentTime = 0;
                        });
                        
                                           
                        $videoEl.on('pause',function(){
                           console.log('video paused');     
                           $(this).removeClass('active');
                           $spinner.removeClass('active');
                           $mask.removeClass('active');
                        });
      
                        App.vent.on('currentPageChange',function(){
                            videoEl.pause();    
                        });
                        
                        $videoEl.on('playing',function(event){ 
                               console.log('playing showtime !');
                        });
                        
                        $videoEl.on('playRequest',function(event){ 
                               console.log('play request : ' + videoEl.currentSrc);
                               $mask.addClass('active'); 
                               $spinner.addClass('active'); 
                               videoEl.play();
                        });
                });
                
                /* bind video play buttons */
                $('[data-click-play]').each(function(index,el) {
                    $(el).on(clickEv, function(e){  $.each($(this).attr('data-click-play').split(','), function(i,val){ 
                                var targData = val.split(':');
                                var $videoEl = $('[data-id=' + targData[0] + ']'); 
                                $videoEl.trigger('playRequest');
                       });
                    }); 
                });
                
                /*
                   SlIDESHOW CLICK
                */
                
                function nextState(dataID, loop) {
            
                    var mso = $('[data-id=' + dataID + ']');
                    
                    var states = mso.first().children('.state');
                    
                    var current = states.siblings('.active').index();
                    
                    if(current+1 < states.length) {
                        mso.each(function(index,elem) {	
                                $(elem).removeClass('hidden').children('.state').removeClass('active').eq(current+1).addClass('active');
                                return;
                        });
                    } else if(loop) {
                        
                        mso.each(function(index,elem) {
                                $(elem).removeClass('hidden').children('.state').removeClass('active').first().addClass('active');
                                return;
                        });
                    }
                }


                $('[data-click-next]').each(function(index,el) {
                    $(el).on(clickEv, function(e){  
                        var loop = ($(this).attr('data-loop') == '1');
                        $.each($(this).attr('data-click-next').split(','), function(i,val){ nextState(val, loop); });
                }); });
                
                /*
                  NEXT STATE CLICK
                */
                $('[data-click-state]').each(function(index,el) {
                    $(el).on(clickEv, function(e){  $.each($(this).attr('data-click-state').split(','), function(i,val){ 
                        var targData = val.split(':');
                        $('[data-id=' + targData[0] + ']').each(function(index,elem) {
                                $ (elem).children('.state').removeClass('active').hide().eq(targData[1]).addClass('active').show().parent('.mso').removeClass('hidden');
                        });
                        //toState(targData[0], targData[1]); 
                    });
                  }); 
                });
                
                $('button[data-gotoarticle]').on('click',function(){
                    var article = App.collections.articles.setElement( App.collections.articles.get( $(this).data('gotoarticle') ) );
                });
                
                that.$el.on('nextArticle',function(){
                    console.log('nextArticle');
                    App.collections.articles.next();
                }); 
                that.$el.on('prevArticle',function(){
                    console.log('prevArticle');
                    App.collections.articles.prev();
                });
                
                nav.to = function(pageId){
                    article.set('currentPage',pageId);
                };
                nav.next = function(){
                    article.set('currentPage',article.get('currentPage')+1);
                };
                nav.back = function(){
                    article.set('currentPage',article.get('currentPage')-1);
                };
          
            }
            
            //waiting for images to be loaded
            var $visuals =  $( "img",this.$el );
            var total = $visuals.length;
            var loaded = 0;
            $visuals.load(function(){
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