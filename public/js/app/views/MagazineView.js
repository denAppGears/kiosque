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
            var magContentUrl = "mags/" + this.model.get('repo').get('id') + '/' + this.model.get('id') + '/pages.html';
            var that = this;
            $.get( magContentUrl, function( magContent ) {
                that.model.set('magContent', $('<div></div>').html( magContent) );
                that.model.set('currentPage', 1);
            });        
        },
        loadPage : function (pageId){
            if(!this.model.get('magContent')) return this.loadMagContent();
            this.model.set('pageContent', $(this.model.get('magContent')).clone(true).children('#page'+pageId).html() );
            this.render();
        },
        onCurrentPageChanged : function(magazine){
            this.loadPage( magazine.get('currentPage') );
        }
    });
});