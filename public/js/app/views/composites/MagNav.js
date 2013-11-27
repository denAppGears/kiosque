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
            $( this.model.get('magContent') ).filter('.page').each(function(index,el){
                var pageId = $(el).data('name');
                var thumbSrc = that.model.get('magPath') + '/book/assets/images/pagethumb_000' + pageId + '.jpg';
                pages.push({"id":pageId,"pageId":pageId,magazine:that.model, "thumbSrc":thumbSrc});
            });
            this.collection = new Backbone.Collection(pages);
            this.render();
        },
        onRender : function(){
            var that = this ;
            
            $('.backButton').on("click", function(triggerArgs) {
                App.vent.trigger('goto', {
                    action: 'magazines',
                    model: that.model.get('repo')
                });  
            });
            $('#navToggle').on('click',function(){
                $(this).hide();
                $('#thumbs_container').show();
               // $.ui.toggleHeaderMenu(true);
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