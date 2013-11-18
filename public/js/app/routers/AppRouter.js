define(['backbone', 'marionette', 'App'],

function(Backbone, Marionette, App) {
    return Backbone.Marionette.AppRouter.extend({
        

        //"index" must be a method in AppRouter's controller
        appRoutes: {
            "": "magazines",
            "/read/:id": "read"
        }
    });
});