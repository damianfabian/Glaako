App.service('Dictionary', function (localStorageService, $http) {
  
  var url_server = '';
  var empty = { 
    word:"RESULT_EMPTY_TITLE",
    image_url:"http://cdn2.hubspot.net/hub/150/file-13149256-jpg/images/sorry.jpg",
    meaning:"RESULT_EMPTY_MEANING",
    tips:[]
  };
  var current_word = [];
  
  this.search = function(key){
    var words = localStorageService.get("words");
    if(words === null){
      this.loadResources();
      words = localStorageService.get("words");
    }
    
    var result = words.filter(this.customFilter({ "word":key }));
    
    result = result.length > 0 ? result[0] : empty;
    return localStorageService.set("current_result", result);
  };
  
  this.all = function(key){
    var words = localStorageService.get("words");
    if(words === null){
      this.loadResources();
      words = localStorageService.get("words");
    }
    words = key ? words.filter(this.customFilter({ "lang":key })) : words;
    words = words.length > 0 ? words : empty;
    return localStorageService.set("current_result", words);
  };
  
  this.getByID = function(id){
    var words = [];
  };
  
  this.suggest = function(key){
    var words = [];
  };
  
  this.loadResources = function(){
      $http.get('words.json').success(function(data, status, headers, config) {
        localStorageService.set("words",data);
      }).error(function(data, status, headers, config) {
        console.log(data);
      });
  };
  
  this.customFilter = function(values) {
   return function(el) {
      var r = el;
      var keys = Object.keys( values );
      var answer = true;

      for( var i = keys.length-1; i >= 0; i--) {
          if( r[keys[i]] !== values[keys[i]] ) {
              answer = false;
              break;
          }
      }

      return answer;
   }
  };
  
});