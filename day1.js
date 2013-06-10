 /*
        Calculate: evaluate the value of an arithmetic expression
    */
    function calculate(){
        var input = $('#text1:first'); //get input field from DOM
        var val = input.val(); //get contents/val of object, return string
        var output = $('#text1_out:first');
        output.text(val);
        //output.html(val);
        //console.log(val);
    }