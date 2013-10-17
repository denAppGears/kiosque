/**
 * Modal confirmation  item view 
 */
define(['App', 'jquery', 'hbs!templates/modal/confirm','backbone'],

function(App, $, template, Backbone) {
    return Backbone.Marionette.ItemView.extend({
        template: template,
        events : {
           'click button.confirm' : 'onAction'
        },
        onAction : function(triggersArgs) {
            this.model.get('actionCallBack')(this.model.get('actionOptions') );
        }
    });
});