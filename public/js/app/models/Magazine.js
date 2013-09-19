define(["jquery", "models/Model"],

function($, Model) {
    // Creates a new Magazine Model class object

    var Magazine = Model.extend({
        // Default values for all of the Model attributes
        defaults: {
            title:'noTitleSetYet',
            content :'no content'
        }

    });

    // Returns the Model class
    return Magazine;

}

);