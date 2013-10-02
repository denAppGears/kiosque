define(['App','backbone', 'marionette', 'jquery', 'hbs!templates/mobileHeader'],
//'jquerymobile'
function(App,Backbone, Marionette, $, template) {
    return Backbone.Marionette.ItemView.extend({
        template: template
    });
});