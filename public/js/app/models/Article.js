define(["App", "jquery", "models/Model"],

function(App, $, Model) {
    
    var Article = Model.extend({

        // Default values for all of the Model attributes
        defaults: {
            title: 'noTitleSetYet',
            content: 'no content',
            thumbSrc :'img/noimage.gif',
            magContent:false,
            currentPage:null,
            backPage:1,
            pageCount:null,
            magPath : null,
            cssPaths : null,
            selected:'',
            inMagList :false,
            magazine :{}
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
            //this.loadDatas();
            //this.on('change:localData', this.checkDlAvailable, this);
            //this.trigger('change:localData');
            
        }
    });

    // Returns the Model class
    return Article;

}

);