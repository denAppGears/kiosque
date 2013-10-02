define(["jquery","collections/Collection","models/Magazine"],
  function($, Collection, Model) {
    var Magazines = Collection.extend({
      model: Model
    });
    return Magazines;
  });