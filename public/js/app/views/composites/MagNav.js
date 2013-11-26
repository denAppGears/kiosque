/**
 * Magazine Navigator composite view 
 */
define(['jquery', 'backbone', 'views/items/magNavThumb', 'hbs!templates/magnav','swipeview'],

function($, Backbone, itemView,template,swipeview) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        tagName : "div",
        itemViewContainer:'#magPageThumbs',
        //className:'grid',
        initialize: function(){
        },
        modelEvents:{
            'change:magContent':'onMagContentChanged'   
        },
        onMagContentChanged: function(){
            var that = this;
            var pages = [];
            $( this.model.get('magContent') ).filter('.page').each(function(index,el){
                var pageId = $(el).data('name');
                var thumbSrc = that.model.get('magPath') + '/book/assets/images/pagethumb_000' + pageId + '.jpg';
                pages.push({"id":pageId,"pageId":pageId,magazine:that.model, "thumbSrc":thumbSrc});
            });
            this.collection = new Backbone.Collection(pages);
            this.render();
        },
        onRender : function(){
            $('#navToggle').on('click',function(){
                $(this).hide();
                $('#thumbs_container').show();
                $.ui.toggleHeaderMenu(true);
            });
            $('#content').not('#magPageThumbs').on('click',function(){
               $('#thumbs_container').hide();
               $('#navToggle').show();
               $.ui.toggleHeaderMenu(false);
            });
            
            var magazine = this.model;
            $('#navNext').on('click', function(){
                magazine.set('currentPage',magazine.get('currentPage')+1);
            });
            $('#navPrev').on('click', function(){
                magazine.set('currentPage',magazine.get('currentPage')-1);
            }); 
        }
    });
});