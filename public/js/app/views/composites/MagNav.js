/**
 * Magazine Navigator composite view 
 */
define(['jquery', 'backbone', 'views/items/magNavThumb', 'hbs!templates/magnav'],

function($, Backbone, itemView,template) {
    return Backbone.Marionette.CompositeView.extend({
        template : template,
        itemView: itemView,
        itemViewContainer:'#magnav',
        //className:'grid',
        initialize: function(){
        },
        modelEvents:{
            'change:magContent':'onMagContentChanged'   
        },
        onMagContentChanged: function(){
            var pages = [];
            var that = this;
            $( this.model.get('magContent') ).children('.magpage').each(function(index,el){
                var pageId = _.last($(el).attr('id').split('')) ;
                pages.push({id:pageId,pageId:pageId,magazine:that.model});
            });
            this.collection = new Backbone.Collection(pages);
            this.render();
        }
       
    });
});