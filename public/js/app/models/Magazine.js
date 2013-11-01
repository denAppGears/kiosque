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
            localData : false,
            downloading: false, // idle, downloading
            dlProgress : 0, // % download completion
            thumbSrc :'img/noimage.gif',
            magContent:false,
            currentPage:null
        },

        initialize: function(attributes) {
            this.checkDlAvailable();
        },
        //Check if the Magazine is localy downloaded and up to date
        checkLocal: function() {
            if(!App.isPhonegap) return false;
            var uploadMoment = moment(this.get('uploadTime'), "DD-MM-YYYY");
            if (0 > uploadMoment.diff(moment(), 'day')) {
                return false;
            }
            return true;
        },
        //check if a new download is available
        checkDlAvailable: function() {
            var dlAvailable = false;
            if ( App.isPhonegap && navigator.connection.type !== Connection.NONE && this.get('downloadUrl') && !this.checkLocal() ){
                dlAvailable = true;
            } 
            this.set({dlAvailable : dlAvailable});
        },
        //Download Magazine to local file system.
        download: function() {
            App.downloads.add(this);
        },
        //Stop ongoing or completed download
        endDownload: function() {
            App.downloads.remove(this);
        },
        //Stop ongoing or completed download
        cancelDownload: function() {
            this.endDownload();
            this.removeDatas();
        },
        removeDatas: function(){
            App.downloads.removeDatas(this);
        }
    });
    
    if(App.isPhonegap){
        document.addEventListener("offline", onConnectionChange, false);
        document.addEventListener("online", onConnectionChange, false);
    }
    function onConnectionChange() {
        Magazine.checkDlAvailable();
    }

    // Returns the Model class
    return Magazine;

}

);