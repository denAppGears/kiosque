/**
 * View of the magazine detailed content
 */
define(['App', 'backbone', 'marionette', 'jquery', 'models/Magazine', 'hbs!templates/magazine'],

function(App, Backbone, Marionette, $, Magazine, template) {

    return Backbone.Marionette.ItemView.extend({
        template: template,
        model:Magazine,
        
        initialize: function() {
            _.bindAll(this);
        },
        onRender :  function(options){
            //if(!App.isPhonegap) return;
            var readerContainer = $(this.$el).find('#reader');
            $.get( "mags/1/2/page-1.html", function( pageContent ) {
                $(readerContainer).html(pageContent);
            });
            
        }
    });
});