define(["App","jquery","collections/Collection","models/Magazine"],
  function(App,$, Collection, Model) {
    var Magazines = Collection.extend({
      model: Model,
      comparator: function(model) {
        return model.get("orderId");
      }
    });
    return Magazines;
  });