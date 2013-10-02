define(["jquery", "collections/Collection", "models/Repo"],

function($, Collection, Model) {

    return Collection.extend({
        model: Model
    });

});