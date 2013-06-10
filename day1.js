 /*
    Calculate: evaluate the value of an arithmetic expression
*/
function calculate(text){
    var pattern = /\d+|\+|\-|\*|\/|\(|\) /g; //indicates a "regular expression" pattern
    var tokens = text.match(pattern); //returns array
    //tokens = JSON.stringify(tokens); //JSON = type of interchangable data structure
    try{
        var value = evaluate(tokens);
        if (tokens.length != 0)
            throw "ill-formed expression";
        return String(value);
    }catch(err){
        return err;
    }
}

function setup_calc(div){
    var input = $('<input></input>', {type: "Text", size: 50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function(){
        output.text(String(calculate(input.val())));
    });
    
    $(div).append(input, button, output);
}

function read_operand(tokenArray){
    var token = tokenArray.shift();
    var num = parseInt(token);
    if(isNaN(num))
        throw "number expected";
    return num;
}

function evaluate(tokenArray){
    if(tokenArray.length == 0)
        throw "missing operand";
    var value = read_operand(tokenArray);
    while(tokenArray.length !== 0){
        var operator = tokenArray.shift();
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
        }else{
            value = value/temp;
        }
    }
    return value;
}
$(document).ready(function(){
   $('.calculator').each(function(){
       setup_calc(this);
   })
});