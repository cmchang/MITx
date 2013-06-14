//Create the button layout
function setup_calc(div){
    //List of button labels
    var buttonList = [["sin(", "log(", "sqrt(", "C"],
                      ["()", ")", "&divide", "*"],
                      ["7", "8", "9", "-"],
                      ["4", "5", "6", "+"],
                      ["1", "2", "3", "="],
                      ["0", ".", "x"]
                     ];
    
    //creating a list of strings containing the html to create buttons on the corresponding row
    //string index = row index
    var buttonStr = ["","","","","",""];
    for(var row = 0; row < buttonList.length; row++){
        for(var x = 0; x < buttonList[row].length; x++){
            if(buttonList[row][x] == "="){
                buttonStr[row] = buttonStr[row].concat('<button class="equals">=</button>');
            }else{
                buttonStr[row] = buttonStr[row].concat("<button>"+buttonList[row][x]+"</button>"); 
            }
        }
    }
    
    //convert buttons to jQuery format, create divs for each row
    var buttonsJQ = ["", "", "", "", "", ""];
    var divRows = ["", "", "", "", "", ""];
    for (var x = 0; x < buttonStr.length; x++){
        buttonsJQ[x] = $(buttonStr[x]);
        divRows[x] = $('<div></div>',{class:"row"});
        divRows[x].append(buttonsJQ[x]);
    }
    
    var input = $('<input></input>',{type:"Text", id: "expression"});
    $(div).append(input,divRows[0], divRows[1],divRows[2],divRows[3],divRows[4],divRows[5]);
}


function evaluate(tokens){
    if (tokens.length===0){
        throw "missing operand";
    }
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

function read_term(tokens){
    if (tokens.length===0){
        throw "missing operand";
    }
    var val1= read_operand(tokens);
    while (tokens.length!==0){
        var operator=tokens[0];
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

$(document).ready(function(){
    $('.Calculator').each(function(){
       setup_calc(this);
    });
    
     $('.equals').bind('click', function(){
        var expression = $('#expression');
         
        var expTrim = expression.val().trim();
         console.log(expTrim);
         
         expression.val(String(calculator.evaluate(calculator.parse((expTrim.replace(/\xF7/g, "/"))))));
         //used RegEx so that all the x's and divion signs are changed (without it, only replaces the first instance)
    });
    
    $('button').bind('click',function() {
        var func = $(this).html();
        switch (func) {
            case "C":
                $('#expression').val("");
                break;
            case "=":
                break;
            case "Plot": 
                break;
            default:
                var expression = $('#expression');
                var input = expression.val();
                expression.val(input.concat(func));
        }
    });
});
