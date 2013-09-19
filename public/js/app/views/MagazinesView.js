define(['App', 'backbone', 'marionette', 'jquery', 'collections/Magazines', 'hbs!templates/magazines'],

function(App, Backbone, Marionette, $, Magazines, template) {

    return Backbone.Marionette.ItemView.extend({
        template: template,

        initialize: function() {
            _.bindAll(this);
        },

        magazines: new Magazines([{
            title: 'mag1',
            content: 'htm5 content1'
        }, {
            title: 'mag2',
            content: 'htm5 content2'
        }, {
            title: 'mag3',
            content: 'htm5 content3'
        }])
    });
});