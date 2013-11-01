/**
 * View Item Magazine navigator page Thumbnail
 */
define(['App', 'jquery', 'hbs!templates/items/magNavThumb', 'backbone'],

function(App, $, template, Backbone,confirmView) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        events:{
            'click':'onSelect'
        },
        initialize:function(){
            this.model.get('magazine').on('change:currentPage', this.onCurrentPageChanged, this);
        },
        onCurrentPageChanged: function(magazine){
            var selected = ( this.model.get('pageId') == magazine.get('currentPage') )? 'selected':  '';
            if(this.model.get('selected') != selected) {
                this.model.set('selected', selected);
                this.render();
            }
        }, 
        onSelect : function(trgArgs){
            if(this.model.get('magazine').get('currentPage') == this.model.get('pageId')) return ;
            this.model.get('magazine').set('currentPage',this.model.get('pageId') );
        }
    });
});
        