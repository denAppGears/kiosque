/**
 * View of the magazine detailed content
 */
define(['App', 'backbone', 'marionette', 'jquery', 'models/Magazine', 'hbs!templates/magazine','iscroll'],

function(App, Backbone, Marionette, $, Magazine, template,iscroll) {

    return Backbone.Marionette.ItemView.extend({
        template: template,
        model:Magazine,
        
        
        initialize: function() {
            _.bindAll(this);
            this.loadMagContent();
        },
        modelEvents:{
            'change:currentPage' :'onCurrentPageChanged'
        },
        loadMagContent : function(){
            var magContentUrl = this.model.get('magPath') + '/pages.html';
            var that = this;
            $.get( magContentUrl, function( magContent ) {
                that.model.set('magContent', $('<div></div>').html( magContent) );
                that.model.set('currentPage', 1);
            });        
        },
        loadPage : function (pageId){
            if(!this.model.get('magContent')) return this.loadMagContent();
            var page =  $(this.model.get('magContent')).clone(true).find('.page[data-name="'+pageId+'"]').first();
            this.model.set('pageContent',this.parseLinks(page));
            this.render();
        },
        parseLinks : function (page){
            var that = this;
            $(page).find('img').each(function(index,el){
                $(this).attr('src', that.model.get('magPath') + '/' + $(this).attr('src') );
            });
            return page.html();
        },
        onCurrentPageChanged : function(magazine){
            this.loadPage( magazine.get('currentPage') );
        }
    });
});