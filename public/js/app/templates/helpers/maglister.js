
/**
 * Templates Helper Maglister : generate html5 for a given magazine model
 * 
 * @author schmitzdenis@gmail.com
 * @since 16/09/2013
 * @project kiosque
 */
define(['handlebars'], function ( Handlebars ){
  
  function maglister ( context, magazine ) {
    return magazine.title;
  }

  Handlebars.registerHelper( 'maglister', maglister );
  
  return maglister;
});
