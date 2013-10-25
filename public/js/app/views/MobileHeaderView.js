define(['App','backbone', 'marionette', 'jquery', 'hbs!templates/mobileHeader'],
//'jquerymobile'
function(App,Backbone, Marionette, $, template) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
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
        } 
    });
});