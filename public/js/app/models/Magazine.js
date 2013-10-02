define(["App", "jquery", "models/Model"],

function(App, $, Model) {
    // Creates a new Magazine Model class object
    var Magazine = Model.extend({

        // Default values for all of the Model attributes
        defaults: {
            title: 'noTitleSetYet',
            content: 'no content',
            uploadTime: null,
            downloadUrl: null,
            dlAvailable: false,
            downloading: false // idle, pending, downloading
        },

        initialize: function(attributes) {
            this.checkDlAvailable();
            //this.on('change:downloading', this.checkDlAvailable);
        },
        //Check if the Magazine is localy downloaded and up to date
        checkLocal: function() {
            var uploadMoment = moment(this.get('uploadTime'), "DD-MM-YYYY");
            if (0 > uploadMoment.diff(moment(), 'day')) {
                return false;
            }
            return true;
        },
        //check if a new download is available
        checkDlAvailable: function() {
            if (this.get('downloadUrl') && !this.checkLocal()) {
                this.set({
                    dlAvailable: true
                });
            }
            else {
                this.set({
                    dlAvailable: false
                });
            }
        },
        //Download Magazine to local file system.
        download: function() {
            App.downloads.add(this);
        },
        //Cancel ongoing download
        cancel: function() {
            App.downloads.remove(this);
        }
    });

    // Returns the Model class
    return Magazine;

}

);