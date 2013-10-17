define(["jquery", "marionette"],
    function($,Marionette){
        var ModalRegion = Marionette.Region.extend({
            el : "#modal",
            constructor: function() {
                
                Marionette.Region.prototype.constructor.apply(this, arguments);
                this.ensureEl();
                this.$el.addClass('modal fade');
                //this.$el.addClass('modal fade');
                this.$el.on('hidden', {region:this}, function(event) {
                    event.data.region.close();
                });
            },
         
            onShow: function() {
                this.$el.modal('show');
            },
         
            onClose: function() {
               this.$el.modal('hide');
            }
        });
        
        return ModalRegion;
    }
);