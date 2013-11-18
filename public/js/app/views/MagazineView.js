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
            var that = this;
            that.loadMagContent();
        },
        modelEvents:{
            'change:currentPage' :'onCurrentPageChanged'
        },
        loadMagContent : function(){
            var that = this;
            var magContentUrl = this.model.get('magPath') + '/index.html';  
            $.get( magContentUrl, function( magContent ) {
                //var $content = $('<div></div>').html(that.parseLinks(magContent));
                var $content = that.parseLinks(magContent);
                that.model.set('magContent', $content);
                that.model.set('currentPage', 1);
            });
        },
        loadPage : function (pageId){
            if(!this.model.get('magContent')) return this.loadMagContent();
            //$(this.model.get('magContent')).find('.page').hide();
            var $page = $(this.model.get('magContent')).filter('.page[data-name="'+pageId+'"]').first();//.show(); //.prepend(in5Js)
            this.model.set('pageContent',$page.html());     
            this.render();
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
            });
            
            $parsed.find('source').each(function(index,el){
                $(this).attr('src',$(this).attr('src') );
            });
            
            $parsed.filter('script').each(function(index,el){
                $(this).removeAttr('src');
            });
            
            //var $css = $content.clone(true).find('link').first();
            //$('head').append($css);
            
            return $parsed.find('.page');
        },
        onCurrentPageChanged : function(magazine){
            this.loadPage( magazine.get('currentPage') );
        },
        onRender : function(){
            var magazine = this.model;       
            
            //handling In5 onClicks Buttons actions:
            clickEv = 'click';
            
            $('video').on('play',function(){
                var videoEl = $(this)[0];
                var random = new Date().getMilliseconds();
                $('source',this).attr('src',$('source',this).attr('src') + '?' + random);
                $( '<div class="video-mask"></div>' ).insertBefore( $(this).parent() );
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
            
            $('#header').addClass('discrete');
            $('#content').css('top','0px');

            $(document).trigger('MagRendered');
        }
    });
});