var myData = [0, 4, 8, 8, 15, 16, 23, 42];
d3Chart3();
function d3Chart3(){ //vertical bar graph
    var chart_width = 300;
    var chart_height = 300;
    var x_scale = d3.scale.ordinal().domain(d3.keys(myData)).rangeBands([0, chart_width]);
    var y_scale = d3.scale.linear().domain([0, d3.max(myData)]).range([0, chart_height]);
    
    var chart = d3.select(".chart-container")
                .append("svg")
                .attr("class", "chart")
                .attr("height", chart_height)
                .attr("width", chart_width);
    
    //create the bar graph
    chart.selectAll("rect").data(myData)
        .enter().append("rect")
        .attr("x", function (d, i){return x_scale(i); })
        .attr("y", function(d){return chart_height - y_scale(d);}) //.attr("y", function(d, i){return 20*i;})
        .attr("width", x_scale.rangeBand())
        .attr("height", y_scale);
    
    //create text labels
    chart.selectAll("text").data(myData)
        .enter().append("text")
        .attr("x", function (d, i){return x_scale(i) + x_scale.rangeBand()/2})
        .attr("y", function(d, i){return chart_height - y_scale(d) + 3;}) 
        .attr("dy", "0.7em")
        .attr("text-anchor", "middle")
        .text(function(d){return d;});

}

///////////////////// Old Code /////////////////////////

function d3Chart2(){ //Horizontal bar graph, using SVG
    var chart_height = 140;
    var x_scale = d3.scale.linear().domain([0, d3.max(myData)]).range(["0%", "100%"]);
    var y_scale = d3.scale.ordinal().domain(d3.keys(myData)).rangeBands([0, chart_height]);
    var chart = d3.select(".chart-container")
                .append("svg")
                .attr("class", "chart");
    //create the bar graph
    chart.selectAll("rect").data(myData)
        .enter().append("rect")
        .attr("y", function(d, i){return y_scale(i)}) //.attr("y", function(d, i){return 20*i;})
        .attr("width", x_scale)
        .attr("height", 20);
    //create text labels
    chart.selectAll("text").data(myData)
        .enter().append("text")
        .attr("x", x_scale)
        .attr("y", function(d,i){ return y_scale(i) + y_scale.rangeBand()/2;})  //.attr("y", function(d,i){ return (i+.5)*20;})
        .attr("dx", -3) 
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .text(function(d){return d;});

}



function jQueryChart(){ //making a horizontal bar graph without d3
    var chart = $("<div></div>)").addClass("chart");
    $(".chart-container").append(chart);
    data.forEach(function(d){ //forEach: for loop
        chart.append($("<div></div>").css("width", d*10 + "px").text(d));
                            
    });
}

function d3Chart(){ //making a simple d3 horizontal bar graph
    var chart = d3.select(".chart-container")
                .append("div")
                .attr("class", "chart");
    chart.selectAll("div").data(myData)
        .enter().append("div")
        .style("width", x_scale)
        //.style("width", function(d){return d*10 + "px";})
        .text(function(d){return d}); 
    /*
    ////associates each div in chart with data
    -binds data to divs not created yet, then enter them, then in the placeholders for div, add a real div
        -selectAll/data return: selection of all divs
        -enter return: only a selection
    */
}