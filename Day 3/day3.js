$(document).ready(function(){
    $('.graphcalc').each(function(){
        setup_calc(this);
    });
});

function setup_calc(div) {
    var graph = $('<canvas width="400" height="300">test</canvas>', {id: 'canvas'});
    var input = $('<input></input>',{type: 'text', id: 'input1'});
    var xmin = $('<input></input>',{type: 'text', id: 'input2'});
    var xmax = $('<input></input>',{type: 'text', id: 'input2'});
    var plot = $('<button>Plot</button>');
    var mouse = $('<button>Mouse</button>');

    var text0 = $('<text>f(x): </text>');
    var text1 = $('<text>min x: </text>');
    var text2 = $('<text>max x: </text>');
    plot.bind("click", function(){
        graphFunct(graph,input,xmin,xmax);
    });
    mouse.bind("click", function(){
        thing_mouse(graph);
    });
    var graphDiv = $('<div></div>');
    var equationDiv = $('<div></div>');
    var xDiv = $('<div></div>');
    var buttonDiv = $('<div></div>');
    
    graphDiv.append(graph);
    equationDiv.append(text0, input);
    xDiv.append(text1, xmin,text2, xmax);
    buttonDiv.append(plot, mouse);
    
    $(div).append(graphDiv,equationDiv,xDiv,buttonDiv);

}


function graphFunct(graph,input,xmin,xmax){
    var DOMgraph = graph[0];
    var ctx = DOMgraph.getContext('2d');
    
    ctx.clearRect(0,0,400,300);
    ctx.beginPath();

    var xstart = parseFloat(xmin.val());
    var xend = parseFloat(xmax.val());
    
    var yvalues = [];
    
    try{
        var equat = calculator.parse(input.val());
        var ymax = -1000;
        var ymin = 1000;
        for(var x=0; x<=graph.width(); x++) {
            var y = calculator.evaluate(equat,{'x':fromX(x,xstart,xend,graph)});
            yvalues.push(y);
            ymax = Math.max(ymax,y);
            ymin = Math.min(ymin,y);
        }
        var padding = 0.1*(ymax-ymin);
        ymax += padding;

        ymin -= padding;
        for(var x=0; x<=graph.width(); x++) {
            var y = toY(yvalues[x],ymin,ymax,graph);
            ctx.lineTo(x,y);
            ctx.moveTo(x,y);
        }
    }
    catch(err){
        ctx.fillStyle = "black";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(err,200,200);   
    }
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    
}

function thing_mouse(graph) {
    var jqcanvas = graph;
    var domcanvas = jqcanvas[0];
    var ctx = domcanvas.getContext("2d");
    var bgImage = $('<canvas></canvas>')[0];
    bgImage.width = 400;
    bgImage.height = 300;
    var bctx = bgImage.getContext('2d');
    ctx.drawImage(bgImage,0,0);
    jqcanvas.on("mousemove",function(event){
        var mx = event.pageX;
        var my = event.pageY;
        var offset = jqcanvas.offset();
        mx = Math.round(mx-offset.left);
        my = Math.round(my-offset.top);
        ctx.drawImage(bgImage,0,0);
        ctx.beginPath();
        ctx.moveTo(mx,0);
        ctx.lineTo(mx,300);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    jqcanvas.on("mouseout",function(event){
        jqcanvas.off();
    });
}

function fromX(x,xmin,xmax, graph) {
    return x*(xmax-xmin)/graph.width()+xmin;
}

function toY(y,ymin,ymax, graph) {
    return (ymax-y)*graph.height()/(ymax-ymin);
}

function toX(x,xmin,xmax, graph) {
    return (x-xmin)*graph.width()/(xmax-xmin);
}