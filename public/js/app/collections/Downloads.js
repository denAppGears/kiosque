define(["jquery","collections/Magazines"],
  function($, parentCollection) {
    var Downloads = parentCollection.extend({
        initialize: function(attributes){
            this.on ('add', this.onAdd );
            this.on ('remove', this.onRemove );
        },
        onAdd : function(magazine){
            magazine.set({downloading:true});
        },
        onRemove : function(magazine){
            magazine.set({downloading:false});
        }
    });

    return Downloads;
  });