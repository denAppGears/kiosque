/**
 * View Item Magazine navigator page Thumbnail
 */
define(['App', 'jquery', 'hbs!templates/items/articleNavThumb', 'backbone'],

function(App, $, template, Backbone,confirmView) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        modelEvents:{
            'change:magContent':'onMagContentChanged'   
        },
        onMagContentChanged: function(){
            this.$el.siblings().each(function(index){
                $('div',this).removeClass('selected');
            });
            $('div',this.$el).addClass('selected');
        },
        triggers: {
            click: 'onSelect'
        },
        initialize: function(attributes) {
            this.on("onSelect", function(triggerArgs) {
                App.collections.articles.setElement( triggerArgs.model ); //App.collections.magazines
            });
        },
        onRender : function(){
            var selected = ( this.model.get('id') ==  App.collections.articles.getElement().get('id') )? 'selected':  ''; //App.collections.magazines
            if(this.model.get('selected') != selected) {
                this.model.set('selected', selected);
                this.render();
            }
        }
    });
});