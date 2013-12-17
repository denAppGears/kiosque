define(["App","jquery","collections/Collection","models/Magazine"],
  function(App,$, Collection, Model) {
    var Magazines = Collection.extend({
      model: Model,
      initialize:function (){ 
        //this.setElement(this.at(0));
      },
      
      comparator: function(model) {
        return model.get("orderId");
      },
      getElement: function() {
        return this.currentElement;
      },
      setElement: function(model,opening) {
        var prevElement = this.currentElement;
        this.currentElement = model;
        console.log(this.currentElement);
        if( prevElement != model || opening){
          this.gotoArticle();
        }
      },
      gotoArticle : function(){
        App.vent.trigger('goto', {
            action: 'article',
            model: this.getElement()
        }); 
      },
      next: function (){
        if(this.currentElement != this.last()){
          var targetID = this.indexOf(this.getElement()) + 1 ;
          console.log('articles : current OrderId : '+ this.currentElement.get('orderId') );
          console.log('articles : goto at : '+ targetID );
          this.setElement(this.at(targetID) );
          App.vent.trigger('ArticleElementSet');
        }
        return this;
      },
      prev: function() {
        if(this.currentElement != this.first()){
          var targetID = this.indexOf(this.getElement()) - 1 ;
          console.log('articles : current OrderId : '+ this.currentElement.get('orderId') );
          console.log('articles : goto at : '+ targetID );
          this.setElement(this.at(targetID) );
  
          App.vent.trigger('ArticleElementSet');
        }
        return this;
      },
      getNext: function (){
        if(this.currentElement != this.last()){
         return this.at(this.indexOf(this.getElement()) + 1);
        }
        return false;
      },
      getPrev: function (){
        if(this.currentElement != this.first()){
         return this.at(this.indexOf(this.getElement()) - 1);
        }
        return false;
      }
      
    });
    return Magazines;
  });