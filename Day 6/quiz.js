var quiz = (function(){
    //set these booleans to choose type of storage
    var localStorageBool = false;
    var parseStorageBool = false;
    var useAJAX = true;
    
    function setup(){
        displayQuestion();
        
        if(localStorageBool)
            useLocalStorage();
        if(parseStorageBool)
            useParseStorage();
    }
    
    var exports = {}
    var score = 0; //score of the student
    var currentQuestionIndex = 0; //index of current question
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
    
    var currentQdict = questionObj[getCurrentQIndex()];
    
    function useParseStorage(){
        Parse.initialize("K7dWs83taOaSh9tqHqP11JxMNIo7APTub6hqj6xk", "nHmtT3eIrWiLqICJJmmJ15V7T2AI6s4Twvp6Ldqs");
        var ParseMem = Parse.Object.extend("QuizMemory");
        var parseMem = new ParseMem();
        parseMem.set("Score", getCurrentScore());
        parseMem.set("CurrentQIndex", getCurrentQIndex());
        parseMem.save();
        
    }
    
    function useLocalStorage(){ //called in the setup()
        if(localStorage['score'] == null)
            localStorage['score'] = 0;
        
        if(localStorage['currentQuestionIndex'] == null )
            localStorage['currentQuestionIndex'] = 0;
        
    }
    
        //displays the current quiz question to the student
    function displayQuestion(){
        currentQdict = questionObj[getCurrentQIndex()];
        var QuestionDiv = $("<div></div>");
        var currentQNum = parseInt(getCurrentQIndex())+1;
        var QuestionText = $("<div class = 'questionText'></div>").append(
            (currentQNum), ". ",  //displays question number
            currentQdict.questionText); //displays question text
        QuestionDiv.append(QuestionText);
        
        //display answer options
        var options = $("<div></div>", {class: "options"});
        for (var i =0; i < currentQdict.options.length; i++){
            var option = $("<div></div>", {class: "option"});
            var radio = $("<input>", {type: "radio",
                                      name: "choice" + getCurrentQIndex(),
                                      value: currentQdict.options[i]
                        });
            //apend options to options
            option.append(radio, " ", currentQdict.options[i]);
            options.append(option);
        
        }
                          
        //add check answer button
        var checkButton = $("<button id = checkButton>Check Answer</buton>");
        var buttonDiv = $("<div id= 'buttonDiv'></div>").append(checkButton);
        checkButton.on('click', getAnswer);
        var ansDiv = $('<div class = "answerDiv'+getCurrentQIndex()+'"></div>');
        
        $('.quiz').append(QuestionDiv, options, buttonDiv, ansDiv);
        //console.log("Question displayed");
    }
    
    function getAnswer(){
        var answer = $('input[name="choice' + getCurrentQIndex()+ '"]:checked').val();
        //console.log(answer);
        
        var correct = false;
        
        if(useAJAX){
            correct = checkAnswerAJAX(answer);
        }else{
            correct = checkAnswer(answer); 
        }
        
        console.log("RESPONSE: " + correct);
                
        if (correct){
            incrementScore();
            $(".answerDiv" +getCurrentQIndex()).text("Correct, " + "Score: " + getCurrentScore() );  
            displayNextButton();
            $("#checkButton").attr("disabled", "disabled");
        }else{
            decreaseScore();
            $(".answerDiv" +getCurrentQIndex()).text("Incorrect, " + "Score: " + getCurrentScore() );        
        }
    }
    
    function checkAnswer(ans){
        return currentQdict.options[currentQdict.solutionIndex] == ans;
    }
    
    function checkAnswerAJAX(ans){
        
        var req = $.ajax({ //ajax communicates with local server
        async: false, //carryout commands in order
        url: "http://localhost:8080/",
            data: {index:getCurrentQIndex(),
                   answer: ans
                  }
        })
        
        var correct = "";
        req.done(function(msg){
                console.log("response: " + msg);
                correct = msg;
            })
        console.log("Running checkAnswerAJAX function.");
        return correct;   
    }
    
    function addLSButton(){ //add local server reset button
        var resetLocalStorageBtn = $('<button id = "LSBtn">Reset Local Storage</button>');
        $(".quiz").append(resetLocalStorageBtn);
        $('#LSBtn').on('click', function(){
                                     localStorage['score'] = 0;
                                     localStorage['currentQuestionIndex'] = 0;
                                     });
    }
    
    function displayNextButton(){
        var nextButton = $("<button>Next Question</button>");
        $('#buttonDiv').append(nextButton);
        nextButton.on('click', displayNextQ);

    }
    
    function displayNextQ(){
        $('.quiz').html("");
        incrementQIndex();
        if(getCurrentQIndex()<questionObj.length){
            displayQuestion();
        }else{
            var endText = $("<text>You are done with the quiz! Your final score is = " + getCurrentScore() +"!</text>");
            $('.quiz').append(endText);
            if(localStorageBool)
                addLSButton()
        }
    }
    
    function incrementScore(){
        if(localStorageBool){
            localStorage['score']++;
        }else{
            score++;
        }
    }
    
    function decreaseScore(){
        if(localStorageBool){
            localStorage['score']--;
        }else{
        score--;   
        }
    }
    
    function getCurrentScore(){
        var currentScore = score;
        if(localStorageBool)
            currentScore = localStorage['score'];
        return currentScore;
    }
    
    function incrementQIndex(){
        if(localStorageBool)
            localStorage['currentQuestionIndex']++;
        currentQuestionIndex++;
    }
    
    function getCurrentQIndex(){
        var currentIndex = currentQuestionIndex;
        if(localStorage['currentQuestionIndex'] != null)
            currentIndex = localStorage['currentQuestionIndex'];
        return currentIndex;
    }
    
    function testParse(){
        Parse.initialize("K7dWs83taOaSh9tqHqP11JxMNIo7APTub6hqj6xk", "nHmtT3eIrWiLqICJJmmJ15V7T2AI6s4Twvp6Ldqs");
        var TestObject = Parse.Object.extend("TestObject");
        var testObject = new TestObject();
        testObject.save({foo: "bar"}, {
          success: function(object) {
            alert("yay! it worked");
          }
        });
    }
    exports.setup = setup;
    return exports;
})();

///////////////////////////////////////////////////////////////////////////////////

function testAjax(){
//when the page loads, contact server, when request is done show message
    var req = $.ajax({ //ajax communicates with local server
        async: false, //carryout commands in order
        url: "http://localhost:8080/",
            data: {id:10,
                  }
    })
    req.done(function(msg){
            console.log(msg);
        })
    console.log("what");
}


$(document).ready(function(){
   quiz.setup(); 
    
    //testAjax();
    
});