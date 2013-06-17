var quiz = (function(){
    
    function setup(){
        displayQuestion();
        useLocalStorage();
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
                      "solutionIndex": 1}
                      ]; 
    //contains questionText, options, solutionIndex
    
    var currentQdict = questionObj[getCurrentQIndex()];
    var answers = []; // answers from the student
    

    
    function useLocalStorage(){
        if(localStorage['score'] == null)
            localStorage['score'] = 0;
        
        if(localStorage['currentQuestionIndex'] == null)
            localStorage['currentQuestionIndex'] = 0;
        }
    
    function testParse(){
    //testing Parse
        Parse.initialize("K7dWs83taOaSh9tqHqP11JxMNIo7APTub6hqj6xk", "nHmtT3eIrWiLqICJJmmJ15V7T2AI6s4Twvp6Ldqs");
        var TestObject = Parse.Object.extend("TestObject");
        var testObject = new TestObject();
        testObject.save({foo: "bar"}, {
          success: function(object) {
            alert("yay! it worked");
          }
        });
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
        var correct = checkAnswer(answer);
        
        if (checkAnswer(answer)){
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
      
    function incrementScore(){
        if(localStorage['score'] != null)
            localStorage['score']++;
        score++;   
    }
    
    function decreaseScore(){
        if(localStorage['score'] != null)
            localStorage['score']--;
        score--;   
    }
    
    function getCurrentScore(){
        var currentScore = score;
        if(localStorage['score'] != null)
            currentScore = localStorage['score'];
        return currentScore;
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
            addLSButton()
        }
    }
    
    function incrementQIndex(){
        if(localStorage['currentQuestionIndex'] != null)
            localStorage['currentQuestionIndex']++;
        currentQuestionIndex++;
    }
    
    function getCurrentQIndex(){
        var currentIndex = currentQuestionIndex;
        if(localStorage['currentQuestionIndex'] != null)
            currentIndex = localStorage['currentQuestionIndex'];
        return currentIndex;
    }
    
    function addLSButton(){
        var resetLocalStorageBtn = $('<button id = "LSBtn">Reset Local Storage</button>');
        $(".quiz").append(resetLocalStorageBtn);
        $('#LSBtn').on('click', function(){
                                     localStorage['score'] = 0;
                                     localStorage['currentQuestionIndex'] = 0;
                                     });
    }
    
    exports.setup = setup;
    return exports;
})();



$(document).ready(function(){
   quiz.setup(); 
    
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
});