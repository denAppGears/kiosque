define(["jquery","collections/Collection","models/Magazine"],
  function($, Collection, Magazine) {
    // Creates a new Backbone Collection class object
    var Magazines = Collection.extend({
      // Tells the Backbone Collection that all of it's models will be of type Magazine (listed up top as a dependency)
      model: Magazine
    });

    return Magazines;
  });