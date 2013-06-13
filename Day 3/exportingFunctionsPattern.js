/*JavaScript pattern to create a module
	This prevents the variables inside of the function to be accessible 
	Allows variables inside module to be hidden
	Helps
*/
var calculator = (function(){
	var exports = {};
	
	//this function not accessible from the outside of the module
	
	function bar(a){
		return a+1;
	} 
	
	function foo(a,b){ 
		return bar(a)+b;
	}
	
	//make foo accessible outside of the function
	exports.foo = foo;
	
	return exports;
	
}();


/////////////////////////////////////
//loading the module
<script src = "calculator.js"></script>

//using the element of the module
...calculator.foo(3,4)...