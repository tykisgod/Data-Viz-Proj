arc.on("mousemove", function(d) {
    d3.select(this)
        .attr("stroke","#fff")
        .attr("stroke-width","2px")
        .style("filter", "url(#drop-shadow)");
    d3.select(this)
      //.transition()
      //.duration(150)
      .attr('transform',function(d:any){
        var dist = 1;
        d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
        var x = Math.sin(d.midAngle) * dist;
        var y = Math.cos(d.midAngle) * dist;
        return 'translate(' + x + ',' + y + ')';
      });

var mousePos = d3.mouse(divNode);
d3.select("#mainTooltip")
  .style("left", mousePos[0] - 40 + "px")
  .style("top", mousePos[1] - 70 + "px")
  .select("#value")
  .attr("text-anchor", "middle")
  .html(d.data['Country'] + " own " + d.data['value']+" satellites <br>"+Math.round(d.data['value']*100/1886.0)+"% of world ");
d3.select(".card-body").selectAll("p").remove()
d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
d3.select(".card-body").append("p").text(d.data['Country']+ " has "+Math.round(d.data['value']*100/1886.0) + "% satellites in world!")
d3.select("#mainTooltip").classed("hidden", false);
})
.on("mouseout", function(d){
d3.select(this)
 .attr("stroke","none")
 .style("filter","none");
d3.select(this)
.transition()
.duration(500)
.attr('transform','translate(0,0)');
d3.select(".card-body").selectAll("p").remove()
d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
d3.select(".card-body").append("p").text("Pieces show the country and its percent of satellites and detail will show when you point on.")
d3.select("#mainTooltip").classed("hidden", true);
});
