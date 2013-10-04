define(["App","jquery", "collections/Magazines"],

function(App, $, parentCollection) {
    var Downloads = parentCollection.extend({
        initialize: function(attributes) {
            this.on('add', this.onAdd);
            this.on('remove', this.onRemove);
        },
        onAdd: function(magazine) {
            magazine.set({
                downloading: true
            });
            if( App.phonegap )this.toStorage(magazine);
        },
        onRemove: function(magazine) {
            magazine.set({
                downloading: false
            });
        },
        toStorage: function(magazine) {
            console.log(magazine.get('downloadUrl') );
        }

    });
    return Downloads;
});
