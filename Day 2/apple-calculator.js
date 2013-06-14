/*
    evaluates arithmetic expression in the input field
    executed when calculate button is clicked
*/
function calculate(text){
    var pattern = /\d+\.?\d*|\.\d+|\+|\-|\*|\/|\(|\)/g; //this pattern will match numbers, +-*/, and ()
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
    var num= tokens.shift();
    var neg = false;
    if (num=="-") {
        neg=true; //it's negative
        num=tokens.shift(); //grab the number
    }
    else if (num=="("){
        var operandInParen=evaluate(tokens);
        if (tokens[0]==")"){
            tokens.shift(); //remove close parenthesis
            return operandInParen;
        }
        else throw "parenthesis not closed";
    }
    
    try{
        var numInt=parseFloat(num);
        if (isNaN(numInt)) throw "number expected";
        if(neg) numInt=0-numInt; //if it's negative, make the number reflect that
        return numInt;
    } catch (err){
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
    var buttonMC=$('<button>MC</button>');
    var buttonMplus=$('<button>M+</button>');
    var buttonMminus=$('<button>M-</button>');
    var buttonMR=$('<button>MR</button>');
    var divRow1=$('<div></div>',{class:"row"});
    $(divRow1).append(buttonMC,buttonMplus,buttonMminus,buttonMR);
    
    var buttonC=$('<button>C</button>');
    var buttonPlusMinus=$('<button>&plusmn</button>');
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
    var input = $('<input></input>',{type:"Text"});
    
    var output = $('<span class="output"></span>');
    
    
    ///////////////// Button Functions////////////////////////
    
    input.keyup(function(event){
        if (event.keyCode==13){ //clicks "=" button if someone presses enter
            buttonEquals.click();
        }
    });
    
    buttonEquals.bind("click", function(){
        output.text(String(calculate(input.val())));
    });
    
    buttonC.bind("click",function(){
        input.val("");
    });
    
    buttonZero.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"0");
    });
    
    button1.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"1");
    });
    
    button2.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"2");
    });
    
    button3.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"3");
    });
    
    button4.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"4");
    });
    
    button5.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"5");
    });
    
    button6.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"6");
    });

    button7.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"7");
    });
    
    button8.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"8");
    });
    
    button9.bind("click",function(){
        var oldInput=input.val();
        input.val(oldInput+"9");
    });
    $(div).append(input,output,divRow1,divRow2,divRow3,divRow4,divRow5,divRow6);
}

$(document).ready(function(){
   $('.Calculator').each(function(){
       setup_calc(this);
   })
});
