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
            var that = this;
            var pages = [];
            $( this.model.get('magContent') ).filter('.page').each(function(index,el){
                var pageId = $(el).data('name');
                pages.push({id:pageId,pageId:pageId,magazine:that.model});
            });
            this.collection = new Backbone.Collection(pages);
            this.render();
        }

    });
});