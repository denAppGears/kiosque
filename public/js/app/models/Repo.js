/**
 * Model : Repo
 */
define(["jquery", "models/Model"],

function($, Model) {
    return Model.extend({
        // Default values for all of the Model attributes
        defaults: {
            title:'noTitleSetYet',
            content :'no content'
        }

    });
}

);