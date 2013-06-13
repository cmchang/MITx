/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function($) {
  exports = {};

  // The root element of the inspector.
  var root = null;
    var currentNode = null;

  var template = ""
    + "<div class='tray'>"
    + "  <textarea class='text-editor' type='text'></textarea>"
    + "  <div class='property-editor'>"
    + "    <div class='node-lookup'>"
    + "      <input class='selector' />"
    + "         <text id='index'></text>"
    + "      <input class='nth' />"
    + "      <button>search</button>"
    + "    </div>"
    + "    <div class='property-list'>"
    + "    </div>" 
    + "  </div>" 
    + "</div>" 
    + "<div class='handle'></div>";
    
  var toggle=function(){
    if (root.css("top")=="0px"){
        root.animate({"top":"-300px"},2000);//2000 millisecond
    }
    else{
        root.animate({"top":"0px"},2000);
    }
  }

  var searchBySelector = function(){
      var selectorBox = root.find(".selector");
      var selectorStr = selectorBox.val();//get string
      var selection=$(selectorStr).first();
      currentNode = selection;
      var html = getHtmlWithWrapperOf(selection);
      var textEditor = root.find(".text-editor");
      textEditor.val(html);
      
      searchedNumb();
      
  }
  
  var searchedNumb = function(){
      //var selectorBox = root.find(".selector");
      //var selectorStr = selectorBox.val();
      //var allSelection = $(selectorStr);
    
      $('#index').html("TESTTTTT");
      
      
  }
  
  var liveHTMLedit = function(){
      console.log("Hi");
  };
  
  /*
   * A better .html() than .html()!
   */
  var getHtmlWithWrapperOf = function(node) {
    var c = node.clone();
    var wrapper = $("<div></div>");
    c.appendTo(wrapper);
    return wrapper.html();
  };
    
  /*
   * Construct the UI
   */
  exports.initialize = function() {
    
    root = $("<div class='inspector'></div>").appendTo($('body'));
    root.append(template);    
    root.find(".handle").bind("click",toggle);//only find inside of the subtree not all $(".handle")
    root.find(".node-lookup button").on("click",searchBySelector);    
    var input;
    root.find(".text-editor").keyup(function(event){
        
        var html = root.find(".text-editor").val();
        var nodes = $(html);
        console.log(html, nodes, currentNode);

        currentNode.replaceWith(nodes); // This line modifies HTML
        currentNode = nodes; // This line modifies Javascript references
        
        
    
//        var selectorBox = root.find(".selector");
  //      var input = selectorBox.val();//get string
    //    var selection=$(input);
      //  selection.html();
    });
  };
  return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function() {
    var createInspector = function() {
      window.inspector = Inspector(jQuery);
      window.inspector.initialize();
    }

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();
