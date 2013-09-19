define(['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'collections/WelcomeView', 'hbs!templates/welcome'],

function(App, Backbone, Marionette, $, Model, Magazines, template) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
        template: template,
        model: new Model({
            mobile: App.mobile
        }),

        // View Event Handlers
        events: {

        }
    });
});