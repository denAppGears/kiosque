define(['App','backbone', 'marionette', 'jquery', 'hbs!templates/mobileHeader'],
//'jquerymobile'
function(App,Backbone, Marionette, $, template) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        initialize: function() {
            _.bindAll(this);
            this.on('goto:index', function(triggerArgs) {
                App.vent.trigger('goto:index');
            });
        },
        triggers: {
            'click': 'goto:index'
        },
        onRender: function() {
            //this.$el.navbar();
        }
    });
});