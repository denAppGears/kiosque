define(["jquery","collections/Collection","models/Magazine"],
  function($, Collection, Model) {
    var Magazines = Collection.extend({
      // Tells the Backbone Collection that all of it's models will be of type Magazine
      model: Model,
    });

    return Magazines;
  });