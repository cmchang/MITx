 /*
    Calculate: evaluate the value of an arithmetic expression
*/

//Parses a string of text and calls evaluate()
function calculate(text){
    //var pattern = /\d+|\+|\-|\*|\/|\(|\)/g; 
    //var pattern = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/g;
    
    var pattern = /[-+]?([0-9]*\.[0-9]+|[0-9]+)|\+|\-|\*|\/|\(|\)/g; 
    var tokens = text.match(pattern); //returns array
    console.log(tokens);
    try{
        var value = evaluate(tokens);
        if (tokens.length != 0)
            throw "ill-formed expression";
        return String(value);
    }catch(err){
        return err;
    }
}

//Sets up the calculator; visual representation
function setup_calc(div){
    var input = $('<input></input>', {type: "Text", size: 50});
    var output = $("<div class='output'></div>");
    var button = $('<button>Calculate</button>');
    button.bind("click", function(){
        output.text(String(calculate(input.val())));
    });
    $(div).append(input, button, output);
}

//Reads the next value in the array
//Expects a number, can deal with parentheses
function read_operand(tokenArray){ 
    var token = tokenArray.shift();    
    if(token == "("){
        return evaluate(tokenArray);
    }else if(token == "-"){
     token = tokenArray.shift();
     var num = parseFloat(token);
     num *= -1;
    }else{
        var num = parseFloat(token);
    }
    if(isNaN(num))
        throw "number expected";
    return num;
}

//Evaluates a parsed string (tokenArray), returns numeric value after arithmetic applied
function evaluate(tokenArray){
    if(tokenArray.length == 0)
        throw "missing operand";
    var value = read_operand(tokenArray);
    while(tokenArray.length !== 0){
        var operator = tokenArray.shift();
        if (operator == ")")
            return value;
        if(['+', '-', '*', '/'].indexOf(operator) < 0)
            throw "unrecognized operator";
        if(tokenArray.length == 0)
            throw "missing operand";
        var temp = read_operand(tokenArray);
        if(operator == "+"){
            value = value + temp;
        }else if (operator == "-"){
            value = value - temp;
        }else if (operator == "*"){
            value = value*temp;
        }else if (operator == "/"){
            value = value/temp;
        }
    }
    return value;
}

//applies code each time "calculator" is used in the html file
$(document).ready(function(){
   $('.calculator').each(function(){
       setup_calc(this);
   })
});