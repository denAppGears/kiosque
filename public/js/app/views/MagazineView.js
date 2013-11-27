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
                this.model.trigger('change:magContent',this.model); 
                return;
            }
            
            var that = this;
            var magContentUrl = this.model.get('magPath') + '/index.html';  
            $.get( magContentUrl, function( magContent ) {
                var $content = that.parseLinks(magContent);
                that.model.set('magContent', $content.html() );
            });
        },
        loadPage : function (pageId){
            var transition = (pageId > this.model.get('backPage'))? 'up' : 'down' ;  
            //this.model.get('viewSwiper').goToPage(pageId-1);
            $.ui.toggleHeaderMenu(false);           
            $(document).trigger('MagRendered');
        },
        parseLinks : function (html){
            var that = this;
            var $parsed = $(html);
            var pageCount = 0;
            
            $parsed.find('img').each(function(index,el){
                $(this).attr('src', that.model.get('magPath') + '/' + $(this).attr('src') );
            });
            
            $parsed.filter('link').each(function(index,el){
                $('#magcss',$('head')).remove();
                $('<link>').appendTo($('head'))
                .attr({id :'magcss' ,type : 'text/css', rel : 'stylesheet'})
                .attr('href', that.model.get('magPath') + '/' + $(this).attr('href') ); 
            });
            
            $parsed.find('video').each(function(index,el){
                $(this).attr('poster', that.model.get('magPath') + '/' + $(this).attr('poster'));
                $('object',this).remove();
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
            return $parsed.find('.pages');
        },
        onCurrentPageChanged : function(magazine){
            this.loadPage( magazine.get('currentPage') );
        },
        onRender : function(event){ 
            $('#header').addClass('discrete');
            $.ui.toggleHeaderMenu(false);
            //$('#content').css('top','0px');
            
        },
        onShow : function (){ 
           $.ui.toggleHeaderMenu(false);
           var magazine = this.model ;
           
           myScroll = new iScroll('wrapper', {
                snap: true,
                momentum: false,
                hScrollbar: false,
                onScrollEnd: function () {
                    //document.querySelector('#indicator > li.active').className = '';
                    //document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                }
            });
            
           /*    
           var slides = $('.page'),
           i,
           page
           ;
           
           if(slides.length === 1 ){
                gallery = {
                   goToPage : function(pageId){
                       $('#wrapper').append(slides[0]);  
                   }
               };
           }else{

                gallery =  new SwipeView('#wrapper', { 
                        numberOfPages: slides.length,
                        hastyPageFlip: true,
                        loop: false
               });
            
                switch(slides.length){
    
                    default:
                        for (i = 0; i < 3; i++) {
                            page = i === 0 ? slides.length - 1 : i - 1;
                            gallery.masterPages[i].appendChild(slides[page]); 
                        }
                    break;
                    
                }
               
               //also triggered on gotoPage
                gallery.onFlip(function () {
                    var el,
                        upcoming,
                        i;
                        
                   // window.location.hash = gallery.pageIndex;
            
                    for (i = 0; i < 3; i++) {
                        upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
                        if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
                            el = gallery.masterPages[i].querySelector('.slide');
                            if (el) gallery.masterPages[i].removeChild(el);
                            el = gallery.masterPages[i].appendChild(slides[upcoming]);
                            el.className += " loading";
                        }
                    }
            
                });
           
           }
           */
           
           //$("#magContainer").remove();
           $("#menu").remove();

            //handling In5 onClicks Buttons actions:
            clickEv = 'click';
            
            $('video').on('play',function(){
                var videoEl = $(this)[0];
                var random = new Date().getMilliseconds();
                $('source',this).attr('src',$('source',this).attr('src') + '?' + random);
                $( '<div class="video-mask"></div>' ).insertBefore( $(this).parent() );
                //$.ui.blockUI(0.9);
                $('.video-mask').on('click',function(){
                    videoEl.pause();
                });
                $(this).show();
            });
            
            $('video').on('pause',function(){
                $(this).hide();
                $('.video-mask').remove();
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

           $.ui.toggleHeaderMenu(false);
           //magazine.set('viewSwiper',gallery);
           this.model.set('currentPage', 1); 
           this.model.trigger('change:currentPage',this.model);
           

        }
    });
});