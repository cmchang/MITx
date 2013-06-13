 /*
    Calculate: evaluate the value of an arithmetic expression
*/
function calculate(text){
    var pattern = /\d+|\+|\-|\*|\/|\(|\) /g; //indicates a "regular expression" pattern
    //mathes digits with a sequence of length 1 (+)
    //http://www.w3schools.com/jsref/jsref_obj_regexp.asp
    var tokens = text.match(pattern); //returns array
    return JSON.stringify(tokens); //JSON = type of interchanged data structure
    
    //var input = $('#text1:first'); //get input field from DOM
    //var val = input.val(); //get contents/val of object, return string
    //var output = $('#text1_out:first');
    //output.text(val);
    //output.html(val);
    //console.log(val);
}

function setup_calc(div){
    var input = $('<input></input>', {type: "Text", size: 50})
    var output = $('<div></div>')
    var button = $('<button>Calculate</button>');
    button.bind("click", function(){
        output.text(String(calculate(input.val())));
    });
    
    $(div).append(input, button, output);
    //<input type = "text" size = "50" id = "text1"></input>
    //<button onclick = "calculate()">Calculate</button>
}

$(document).ready(function(){
   $('.calculator').each(function(){
       //'this' refers to the <div> with class calculator
       setup_calc(this);
   })
});