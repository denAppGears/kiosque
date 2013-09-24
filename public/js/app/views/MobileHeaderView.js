define(['App','backbone', 'marionette', 'jquery', 'jquerymobile', 'hbs!templates/mobileHeader'],

function(App,Backbone, Marionette, $, jqm, template) {
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
            this.$el.navbar();
        }
    });
});