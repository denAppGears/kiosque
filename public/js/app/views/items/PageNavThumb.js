/**
 * View Item Magazine navigator page Thumbnail
 */
define(['App', 'jquery', 'hbs!templates/items/pageNavThumb', 'backbone'],

function(App, $, template, Backbone,confirmView) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        events:{
            'click':'onSelect'
        },
        initialize:function(){
            this.onCurrentPageChanged( this.model.get('article') );
            this.model.get('article').on('change:currentPage', this.onCurrentPageChanged, this);
        },
        onCurrentPageChanged: function(article){
            var selected = ( this.model.get('pageId') == article.get('currentPage') )? 'selected':  '';
            if(this.model.get('selected') != selected) {
                this.model.set('selected', selected);
                this.render();
            }
        }, 
        onSelect : function(trgArgs){
            if(this.model.get('article').get('currentPage') == this.model.get('pageId')) return ;
            this.model.get('article').set('currentPage',this.model.get('pageId') );
        }
    });
});
        