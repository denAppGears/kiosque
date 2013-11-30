/**
 * Model : Repo
 */
define(["jquery", "models/Model"],

function($, Model) {
    return Model.extend({
        // Default values for all of the Model attributes
        defaults: {
            title:'noTitleSetYet',
            content :'no content',
            isRepo : true,
            thumbSrc :'img/noimage.gif',
            currentArticle:null,
            navMode:false
        }

    });
}

);