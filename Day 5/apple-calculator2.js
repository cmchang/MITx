/*
    evaluates arithmetic expression in the input field
    executed when calculate button is clicked
*/


function calculate(text){
    var pattern = /\d+\.?\d*|\.\d+|\+|\-|\*|\/|\(|\)/g;//this pattern will match numbers, +-*/, and ()
    var tokens = text.match(pattern); //returns an array
    if (tokens.length===0) return " ";
    try{
        var val=evaluate(tokens);
        if (tokens.length!==0) throw "ill-formed expression";
        return String(val);
    } catch (err){
        return err;
    }
    
    return JSON.stringify(tokens); //converts any data structure into string
}

/*
    reads the next item in the array of tokens and returns it as a number
    assumes the item is a number. if not, throws error
    handles negative numbers
    if it gets a (, evaluates expression inside and returns that
*/
function read_operand(tokens){
    try{
        var num = tokens.shift();
        if (num == '('){
            num = evaluate(tokens);
            if(tokens.shift() != ')') throw "mismatched";
            return num;
        }
        else if(num == '-'){
            var next = tokens.shift();
            tokens.unshift('(','0','-',next,')');
            num = read_operand(tokens);
            return num;
        }
        else if(num == "sin("){
            num = Math.sin(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num;
        }
        else if(num == "log("){
            num = Math.log(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num; 
        }
        else if(num == "sqrt("){
            num = Math.sqrt(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num; 
        }
        else{
            num = parseFloat(num,10);
            if(isNaN(num)) throw "number expected";
            return num;
        }
    }
    catch(err){
        return err;
    }
}

function read_term(tokens){
    if (tokens.length===0){
        throw "missing operand";
    }
    var val1= read_operand(tokens);
    while (tokens.length!==0){
        var operator=tokens[0];//tokens.shift();
        var operatorPattern=/\+|\-|\*|\//g;
        if (operator == ")") break;
        if (operator.match(operatorPattern) === null ) throw "unrecognized operator";
        if (operator == "+" || operator =="-") break;
        else tokens.shift();
        
        if (tokens.length===0) throw "missing operand";
        var val2=read_operand(tokens);
        if (operator == "*") val1=val1*val2;
        else if (operator =="/") val1=val1/val2;
    }
    return val1;
}

/*
    actually evaluates the function
*/
function evaluate(tokens){
    if (tokens.length===0){
        throw "missing operand";
    }
    //var val1 = read_operand(tokens);
    var val1 = read_term(tokens);
    var ans;
    while (tokens.length!==0){
        var operator = tokens.shift();
        var operatorPattern=/\+|\-|\*|\//g;
        if (operator.match(operatorPattern) === null ) throw "unrecognized operator";
        if (tokens.length===0) throw "missing operand";
        var val2=read_term(tokens);
        if (operator == "+") ans= parseFloat(val1) + parseFloat(val2);
        else if (operator == "-") ans= val1 - val2;

        val1=ans;
        if (tokens[0]==")") break;
    }
    return val1;
}

function setup_calc(div){
    var buttonMC=$('<button>sin(</button>');
    var buttonMplus=$('<button>log(</button>');
    var buttonMminus=$('<button>sqrt(</button>');
    var buttonMR=$('<button>C</button>');
    var divRow1=$('<div></div>',{class:"row"});
    $(divRow1).append(buttonMC,buttonMplus,buttonMminus,buttonMR);
    
    var buttonC=$('<button>(</button>');
    var buttonPlusMinus=$('<button>)</button>');
    var buttonDivide=$('<button>&divide</button>');
    var buttonTimes=$('<button>x</button>');
    var divRow2=$('<div></div>',{class:"row"});
    $(divRow2).append(buttonC,buttonPlusMinus,buttonDivide,buttonTimes);
    
    var button7=$('<button>7</button>');
    var button8=$('<button>8</button>');
    var button9=$('<button>9</button>');
    var buttonMinus=$('<button>-</button>');
    var divRow3=$('<div></div>',{class:"row"});
    $(divRow3).append(button7,button8,button9,buttonMinus);
    
    var button4=$('<button>4</button>');
    var button5=$('<button>5</button>');
    var button6=$('<button>6</button>');
    var buttonPlus=$('<button>+</button>');
    var divRow4=$('<div></div>',{class:"row"});
    $(divRow4).append(button4,button5,button6,buttonPlus);
    
    var button1=$('<button>1</button>');
    var button2=$('<button>2</button>');
    var button3=$('<button>3</button>');
    var buttonEquals=$('<button class="equals">=</button>');
    var divRow5=$('<div></div>',{class:"row"});
    $(divRow5).append(button1,button2,button3,buttonEquals);
    
    var buttonZero=$('<button class="zero">0</button>');
    var buttonDec=$('<button>.</button>');
    var divRow6=$('<div></div>',{class:"row"});
    $(divRow6).append(buttonZero,buttonDec);

    //var input = $('<div class="input"></div>');
    //var inputText= $('<input></input>',{type:"Text]"});
    //$(input).append(inputText);
    var input = $('<input></input>',{type:"Text", id: "expression"});
    
    var output = $('<span class="output"></span>');
    $(div).append(input,output,divRow1,divRow2,divRow3,divRow4,divRow5,divRow6);
}

function read_operand(tokens){
    try{
        var num = tokens.shift();
        if (num == '('){
            num = evaluate(tokens);
            if(tokens.shift() != ')') throw "mismatched";
            return num;
        }
        else if(num == '-'){
            var next = tokens.shift();
            tokens.unshift('(','0','-',next,')');
            num = read_operand(tokens);
            return num;
        }
        else if(num == "sin("){
            num = Math.sin(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num;
        }
        else if(num == "log("){
            num = Math.log(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num; 
        }
        else if(num == "sqrt("){
            num = Math.sqrt(evaluate(tokens));
            if(tokens.shift() != ')') throw "mismatched";
            return num; 
        }
        else{
            num = parseFloat(num,10);
            if(isNaN(num)) throw "number expected";
            return num;
        }
    }
    catch(err){
        return err;
    }
}

function evaluate(tokens){
        if(tokens.length === 0) throw "missing operand";
        var value = read_term(tokens);
        var operator = 0;
        var temp = 0;
        while(tokens.length > 0){
            if(tokens[0] == ')') return value;
            operator = tokens.shift();
            if(['+','-','×','÷'].indexOf(operator) < 0) throw "unrecognized operator";
            if(tokens.length === 0) throw "missing operand";
            temp = read_term(tokens);
            if(operator === '+'){
                value = value+temp;
            } 
            if(operator === '-'){
                value = value-temp;
            }
        }
    return value;
}

function read_term(tokens){
    var value = read_operand(tokens);
    var operator = 0;
    var temp = 0;
    while(tokens.length >0){
        if(tokens[0] == ')') return value;
        operator = tokens.shift();
        if(['+','-'].indexOf(operator) > -1){
            tokens.unshift(operator);
            break;
        }
        temp = read_operand(tokens);
        if(operator === '×'){
            value = value*temp;
        }
        if(operator === '÷'){
            value = value/temp;
        }
    }
    return value;
}

$(document).ready(function(){
    $('.Calculator').each(function(){
       setup_calc(this);
   });
    
     $('.equals').bind('click', function(){
        var expression = $('#expression');
         
        var expTrim = expression.val().trim();
         console.log(expTrim);
         
         expression.val(String(calculator.evaluate(calculator.parse((expTrim.replace("x", "*").replace("&divide", "/"))))));
    });
    
    $('button').bind('click',function() {
        var func = $(this).html();
        switch (func) {
            case "C":
                $('#expression').val("");
                break;
            case "=":
                break;
            default:
                var expression = $('#expression');
                var input = expression.val();
                expression.val(input.concat(func));
        }
    });
});
