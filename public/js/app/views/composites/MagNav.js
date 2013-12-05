/**
 * Magazine Navigator composite view 
 */
define(['App','jquery', 'backbone', 'views/items/magNavThumb', 'hbs!templates/magnav','swipeview'],

function(App,$, Backbone, itemView,template,swipeview) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        tagName : "div",
        itemViewContainer:'#magPageThumbs',
        //className:'grid',
        modelEvents:{
            'change:magContent':'onMagContentChanged'   
        },
        onMagContentChanged: function(){
            var that = this;
            var pages = [];
            $( this.model.get('magContent').html ).filter('.page').each(function(index,el){
                var pageId = $(el).data('name');
                var thumbSrc = that.model.get('magPath') + '/book/assets/images/pagethumb_000' + pageId + '.jpg';
                pages.push({"id":pageId,"pageId":pageId,magazine:that.model, "thumbSrc":thumbSrc});
            });
            this.collection = new Backbone.Collection(pages);
            this.render();
        },
        onRender : function(){
            var that = this ;
            
            function showNav(){
                $('#navToggle').hide();
                $('#thumbs_container').css('right','0px');
                $('#article_container').css('bottom','0px');
                App.headerRegion.currentView.show();
                that.model.get('repo').set('navMode',true);
            }
            
            function hideNav(){
               $('#navToggle').show();
               $('#thumbs_container').css('right','-120px');
               $('#article_container').css('bottom','-120px');
               App.headerRegion.currentView.hide();
               that.model.get('repo').set('navMode',false);
            }
   
            if( that.model.get('repo').get('navMode') ){
                showNav();
            }else{
                hideNav();
            }
            
            $('#navToggle').on('click',function(){
                showNav();
            });
            
            $('#content').not('#magPageThumbs').not('#article_container').on('click',function(){
                hideNav();
            });
            
        },
        onClose : function(){
            $('#content').off( "click");
    
        }
    });
});