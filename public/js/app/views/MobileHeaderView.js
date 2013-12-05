define(['App','backbone', 'marionette', 'jquery', 'hbs!templates/mobileHeader'],
//'jquerymobile'
function(App,Backbone, Marionette, $, template) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        className:"topcoat-navigation-bar",
        triggers: {
            'click #backButton': 'goBack'
        },
        initialize: function(attributes) {
            this.on("goBack", function(triggerArgs) {
                App.vent.trigger('goto', {
                    action: triggerArgs.model.get('goBackAction'),
                    model: triggerArgs.model.get('goBackModel')
                });  
            });
        },
        modelEvents:{
            'change:pageTitle' :'onTitleChanged'
        },
        onShow : function (){
            if(this.model.get('show')){
                this.show();
            }
        },
        onClose : function(){
            this.hide();
        },
        onTitleChanged: function(){
            $('#pageTitle',this.$el).html(this.model.get('pageTitle'));
        },
        hide : function(){
            $('#content').css('top','0px');
            this.$el.parent().css('top','-' + this.$el.height() + 'px');
            this.model.set('show',false);
        },
        show : function(){
            $('#content').css('top', this.$el.height() + 'px');
            this.$el.parent().css('top','0px');
            this.model.set('show',true);
        },
        
    });
});