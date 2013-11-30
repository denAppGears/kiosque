/**
 * View Item Magazine navigator page Thumbnail
 */
define(['App', 'jquery', 'hbs!templates/items/magNavThumb', 'backbone'],

function(App, $, template, Backbone,confirmView) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
        modelEvents:{
            'change:magContent':'onMagContentChanged'   
        },
        onMagContentChanged: function(){
            this.$el.siblings().each(function(index){
                $('div',this).removeClass('selected')
            });
            $('div',this.$el).addClass('selected');
        },
        triggers: {
            click: 'onSelect'
        },
        initialize: function(attributes) {
            this.on("onSelect", function(triggerArgs) {
                App.vent.trigger('goto', {
                    action: 'article',
                    model: triggerArgs.model
                });

            });
        },
        onRender : function(){
            var selected = ( this.model.get('id') == this.model.get('repo').get('currentArticle').get('id') )? 'selected':  '';
            if(this.model.get('selected') != selected) {
                this.model.set('selected', selected);
                this.render();
            }
        }
    });
});