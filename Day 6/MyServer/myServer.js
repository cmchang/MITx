var sys = require("sys"),  
my_http = require("http");  
url = require("url"); //adds URL parser library

my_http.createServer(function(request,response){
    var URLstring = request.url;
    console.log(request.url);
    testParse(URLstring);
    sys.puts("Server visited.");  //terminal prompt
    response.writeHeader(200, {"Content-Type": "text/plain",
                              "Access-Control-Allow-Origin": '*'
                              });  
    response.write("Hello World");  
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");

function testParse(urlStr){
    var test = url.parse(urlStr, true ,true);
    console.log(test);
}
