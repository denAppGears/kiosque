/**
 * View of the magazine detailed content
 */
define(['App', 'backbone', 'marionette', 'jquery', 'models/Magazine', 'hbs!templates/magazine','in5'],

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
            $.ui.loadContent('page_'+ pageId ,false,false, transition);    
        },
        parseLinks : function (html){
            var that = this;
            var $parsed = $(html);
            
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
                $(this).addClass('panel');
                //@todo disable scrolling if necessary by adding style="overflow:hidden to panels"
                $(this).attr({'id':'page_' + $(this).data('name'),'js-scrolling':"false"});   
            });
            
            return $parsed.find('.pages');
        },
        onCurrentPageChanged : function(magazine){
            this.loadPage( magazine.get('currentPage') );
        },
        onRender : function(event){ 
            //$('#header').addClass('discrete');
            //$('#content').css('top','0px');
        },
        onShow : function (){
            
            var magazine = this.model;
            
            $(document).trigger('MagRendered');
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
            
           $('.panel').bind('swipeDown', nav.back);
           $('.panel').bind('swipeUp', nav.next);
           
            this.model.set('currentPage', 1); this.model.trigger('change:currentPage',this.model);
        }
    });
});