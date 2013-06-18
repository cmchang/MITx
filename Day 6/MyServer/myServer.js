var sys = require("sys"),  
my_http = require("http");  
url = require("url"); //adds URL parser library

var questionObj = [{"questionText": "Sam thinks y = 2x is going to ____ as x goes from 1 to 10", 
                      "options": ["increase", "decrease", "increase then decrease", "decrease then increase"], 
                      "solutionIndex": 0},
                       {"questionText": "Sam thinks y = 2x^2 is going to ____ as x goes from 1 to 10", 
                      "options": ["increase", "decrease", "increase then decrease", "decrease then increase"], 
                      "solutionIndex": 0},
                       {"questionText": "Sam thinks y = -2x is going to ____ as x goes from 1 to 10", 
                      "options": ["increase", "decrease", "increase then decrease", "decrease then increase"], 
                      "solutionIndex": 1},
                       {"questionText": "Sam thinks y = x^2 is going to ____ as x goes from -5 to 5", 
                      "options": ["increase", "decrease", "increase then decrease", "decrease then increase"], 
                      "solutionIndex": 3}
                      ]; 
                    //contains questionText, options, solutionIndex

my_http.createServer(function(request,response){
    var URLstring = request.url;
    console.log(request.url);
    var correct = checkAnswer(URLstring);
    sys.puts("Server visited.");  //terminal prompt
    response.writeHeader(200, {"Content-Type": "text/plain",
                              "Access-Control-Allow-Origin": '*'
                              });  
    response.write("correct: " + correct);  
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");


function testParse(urlStr){ //testing the parser, getting  specific values
    var parseObj = url.parse(urlStr, true ,true);
    console.log("Parse object: ");
    console.log(parseObj);
    console.log("Parse object, query: ");
    console.log(parseObj.query);
    console.log("Parse object, query, index: ");
    console.log(parseObj.query.index);
}

function checkAnswer(urlStr){
    var parseObj = url.parse(urlStr, true ,true);
    var index = parseObj.query.index;
    var answer = parseObj.query.answer;
    console.log("index: " + index);
    console.log("answer: " + answer);
    
    return questionObj[index].options[questionObj[index].solutionIndex] == answer;

}
