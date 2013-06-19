var myData = [0, 4, 8, 8, 15, 16, 23, 42];
d3Chart();

function jQueryChart(){ //making a chart without d3
    var chart = $("<div></div>)").addClass("chart");
    $(".chart-container").append(chart);
    data.forEach(function(d){ //forEach: for loop
        chart.append($("<div></div>").css("width", d*10 + "px").text(d));
                            
    });
}

function d3Chart(){
    var x_scale = d3.scale.linear()
                    .domain([0, d3.max(myData)]).range(["0%", "100%"]);
    
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