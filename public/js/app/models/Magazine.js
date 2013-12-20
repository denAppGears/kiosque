define(["App", "jquery", "models/Model"],

function(App, $, Model) {
    // Creates a new Magazine Model class object
    var Magazine = Model.extend({

        // Default values for all of the Model attributes
        defaults: {
            title: 'noTitleSetYet',
            content: 'no content',
            downloadUrl: null,
            dlAvailable: false, 
            localData : null,// Available localData ?
            localVersion : null,
            serverVersion : null,
            downloading: false, // idle, downloading
            dlProgress : 0, // % download completion
            thumbSrc :'img/noimage.gif',
            magContent:false,
            currentPage:null,
            backPage:1,
            pageCount:null,
            magPath : null,
            cssPaths : null,
            selected:'',
            inMagList :false,
            articles :{}
        },
        //set page nb to 1 if : 0 or less is requested; set page nb to nbOfPages if more is requested.
        set : function(attributes, options) {
            if(attributes.hasOwnProperty('currentPage') || attributes == 'currentPage' ) {
               var destPage = ( attributes.hasOwnProperty('currentPage') )? attributes.currentPage : options ;
               if(destPage !== null){
                   this.set('backPage', this.get('currentPage') );
                   if( destPage <= 0 || destPage > this.get('pageCount')  || destPage == this.get('currentPage') ){
                       //this.set('currentPage',1);
                       return;
                   }
               } 
            } 
            Backbone.Model.prototype.set.call(this, attributes, options);
        },
        initialize: function(attributes) {
             var that = this;         
             this.get('articles').each(function(article){
                article.set('magPath',"mags/" + that.get('repo').get('id') + '/' + that.get('id') + '/' + article.get('id')  );
                article.set('magazine', that );
            });
            this.loadDatas();
            this.on('change:localData', this.checkDlAvailable, this);
            this.trigger('change:localData');
        },
        //try to load localy saved datas
        loadDatas: function() {
            
            
            //if(!App.isPhonegap){
               this.set('magPath',"mags/" + this.get('repo').get('id') + '/' + this.get('id')  );
               return false;
            //}
            
            //return App.downloads.loadDatas(this);
        },
        isUpToDate : function(){
            if( this.get('localVersion') && this.get('localData') ){
                var svMoment = moment(this.get('serverVersion'), "DD-MM-YYYY");
                var lvMoment = moment(this.get('localVersion'), "DD-MM-YYYY");
                if ( 0 >= svMoment.diff( lvMoment, 'second') ) {
                    return true;
                }
            }
            return false;
        },
        //check if a new download is available
        checkDlAvailable: function() {
            var dlAvailable = false;       
            if ( App.isPhonegap && navigator.connection.type !== Connection.NONE && this.get('downloadUrl') && !this.isUpToDate() ){
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