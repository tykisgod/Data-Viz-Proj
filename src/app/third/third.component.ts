import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ThirdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.piechart();
    //this.draw2();
    this.draw3();
    this.barchart();
 
  }

  onResize(){
    this.draw3();
    this.piechart();
    this.barchart();
  }

  



  private draw3():void{
    
    var divNode:any = d3.select("body").node();
    var flag = -1;
    var winheight = window.innerHeight*1;
    var winwidth = window.innerWidth*1;
    var margin = {top:winheight*0.1,right:winwidth*0.1,bottom:winheight*0.1,left:winwidth*0.1};
    
    d3.select("#linechart_2")
    //.style('background-color', 'lightgrey')
    .remove();   ////////  for resize
    d3.select('#chart3')
    //.style('background-color', 'lightgrey')
    .append('svg')
    .attr('id','linechart_2')
    .attr('height',winheight)
    .attr('width',winwidth)
    //.style('background-color', 'lightgrey')

    d3.select("#linechart_2")
    .append("text")
    .attr("x",winwidth/2.1)
    .attr("y",0.05*winheight)
    .text("line chart for trend of launching satellite between 1966 and 2018")
    .attr("text-anchor", "middle")
    .attr("font-size", winheight*0.02+"px")
    .style("font-weight","bold")

    var width = parseInt(d3.select("#linechart_2").style("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#linechart_2").style("height")) - margin.top - margin.bottom;
    var xScale = d3.scalePoint()   ////// 
            .range([0,width-40])
           .padding(0.1)
    var yScale = d3.scaleLinear()
           .range([height, 0]);
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var line = d3.line()
        .x(function(d:any){return xScale(d['Year']);}) 
        .y(function(d:any){return yScale(d['rate']);})

    var svg = d3.select("#linechart_2")
        .append('g')
        //.style('background-color', 'lightgrey')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      //////

    var color =d3.scaleOrdinal(d3.schemeCategory10);

    var countries;
         d3.csv("src/assets/third_line_countries.csv").then( function(data) {
          data.forEach(function(d) {
          d.Years = d.Years;
          });  
        //console.log(data);

        color.domain(d3.keys(data[0]).filter(function(key) { return key !=="Years"; }));//.filter(function(key) { return key !=="year"; }));
        countries = color.domain().map(function(name) {
          return {
            name: name,
            values: data.map(function(d) {
            return {Year: d.Years, rate: +d[name]};
            })

          };
        });

       // console.log(countries);
       // console.log(data);
        xScale.domain(data.map(function(d) { return d['Years']; }));



        var y_min = +d3.min(countries, function(c:any) { return d3.min(c['values'], function(v:any) { return +v['rate']; }); });//-10;
        var y_max = +d3.max(countries, function(c:any) { return d3.max(c['values'], function(v:any) { return +v['rate']; }); })+5;
        yScale.domain([y_min,y_max])
        yAxis.ticks(5);  //// ticks������
        xAxis.ticks(5);
  
        //console.log(xScale.domain);
        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    
        svg.selectAll(".xAxis .tick text")
            .attr("transform", "rotate(-75)")
            .attr("dx", "-2em")
            .attr("dy", "-0.5em")
            .attr("font-size", winheight*0.02+"px")

          svg.append("g")
            .attr("class", "yAxis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            //.attr("x",2)
            .attr("y", 4)
            .attr("dy", ".7em")
            .attr("fill", "#000")
            .style("text-anchor", "end")
            .attr("font-size", winheight*0.02+"px")
            .text("number of Satellite per year");

          svg.selectAll(".yAxis .tick text")
             .attr("font-size", winheight*0.02+"px")


            var counLine = svg.selectAll(".counLine")
            .data(countries)
            .enter()
            .append('g')
            .attr('class','country');
    
            counLine.append('path')
           // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "line")
            .attr("stroke-width","3px")
            .attr("fill", "none") 
            .attr("d", function(d:any) { return line(d.values); })
            .attr("data-legend",function(d:any) { return d.name})
            .style("stroke", function(d:any) { return color(d.name); })
            .style("opacity","0.8")
            .on('mouseover',function(d,i){
              flag = i;
                //console.log(flag);
                d3.selectAll(".line").style("stroke-width", function(d,i){
                  return i == flag?"5px":"2.5px";
                })
                d3.selectAll(".line").style("opacity",function(d,i){
                  return i == flag?"1.0":"0.1";
                })


              //  var mousePos = d3.mouse(divNode);
                /////////////

            })
            .on('mouseout',function(d,i){
              d3.selectAll(".line").style("stroke-width", function(d,i){
                return "2.5px";
              })
              d3.selectAll(".line").style("opacity",function(d,i){
                return "0.8";

              })
            })
    
            counLine.append('circle')
              .attr('class','cirlegend')
              .attr('cx', 0.8*winwidth)
              // .attr('cy',100)
              .attr('cy', function (d, i) { return (i+1) * height* 0.03; })
              .attr('r' ,winheight*0.010)
              .attr('fill', function(d:any) { return color(d.name); })
      
            counLine.append('text') 
              .attr('class','llegend')
              .attr("font-size", winheight*0.015+"px")
              //.attr("style",winheight*0.01+"px")
              .attr('x', 0.81*winwidth)
              .attr('y', function (d, i) { return (i+1) * height* 0.03;})
              .text(function(d:any) { return d.name})
              .attr('text-anchor','start')
              .attr('alignment-baseline', 'middle')
              //.attr("font-size", "20px")
              .style("fill","black")





            var pointCircle = counLine.append('g')
              .datum(function(d){
                return d['values'];
              })
              .selectAll('.pointCirle')
              .data(function(d:any){return d;})
              .enter()
              .append('g')
              .append('circle')
              .attr("cx", function(d:any){
                return xScale(d['Year']);})
              .attr("cy",function(d,i){
                return yScale(d['rate']);
              })
              .attr('r',4)
              .style('fill','#f44242')
              .style("fill-opacity", 0)
              .on("mouseover", function(d){
                d3.select("#tooltip").remove();
                var mousePos = d3.mouse(divNode);
                /////////////
                
                
                
            d3.select(this)
                .style("fill-opacity",0.8)
                var odate = d['Year'];
                var ovalue = d['rate'];
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = parseFloat(d3.select(this).attr("cx")) + 5;
                var yPosition = parseFloat(d3.select(this).attr("cy")) -10;
                //Create the tooltip label

                d3.select("#mainTooltip")
                .style("left", mousePos[0] + "px")
                .style("top", mousePos[1] -50 + "px")
                .select("#value")
                .attr("text-anchor", "middle")
                .html(" year:     "+odate+" "+"<br> "+" number:      "+ovalue+" ")
                d3.select("#mainTooltip").classed("hidden", false);

                // svg.append("text")
                //     .attr("id", "tooltip")
                //     .attr("x", xPosition)
                //     .attr("y", yPosition)
                //     .attr("text-anchor", "middle")
                //     .attr("font-family", "sans-serif")
                //     .attr("font-size", "15px")
                //     .style("fill","#f44242")
                //     .text(ovalue)
              })
              .on("mouseout", function() {
                //Remove the tooltip
                //d3.select("#tooltip").remove();
                d3.select("#mainTooltip").classed("hidden", true);
                //Set opacity to 0
                d3.select(this)
                  .style("fill-opacity",0)
                })



                
               
    

      });



   
  }



  

  private piechart():void{

    var winheight = window.innerHeight*0.7;
    var winwidth = window.innerWidth*0.7;
    d3.select("#pietitle").remove();
    d3.select("#chart-svg1").remove();

    var svg = d3.select("#pie_chart")
    .append("svg")
    .attr("id","chart-svg1")
    //.style('background-color', 'lightgrey')
    .attr('height',winheight)
    .attr('width',winwidth)

    var radius = Math.min(winwidth/2.5, winheight/2.5);
    var g = svg.append("g").attr("transform", "translate(" + winwidth/2 + "," + winheight/2 + ")");
    var color = d3.scaleOrdinal()
    .range(["#e7b238", "#112140", "#1e4b50", "#5b6a26", "#ef7653"])
    .domain(["United States","Russia","China","Japan","Others"]);

    var divNode:any = d3.select("body").node();
    var defs = svg.append("defs");
    var filter = defs.append("filter")
                    .attr("id", "drop-shadow")
                    .attr("height","130%");
    
    filter.append("feGaussianBlur")
            .attr("in","SourceAlpha")
            .attr("stdDeviation", winheight*0.001) //  3
            .attr("result", "blur");
    
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", winheight*0.001)
        .attr("dy", winheight*0.001)
        .attr("result", "offsetBlur");
        var feMerge = filter.append("feMerge");
    
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
    



    var pie = d3.pie() //pie generator
        .sort(null)
        .value(function(d) { return d['value']; });
  
    var path = d3.arc()
        .outerRadius(radius*0.9)  //  -10
        .innerRadius(0); //make != 0 for a donut chart
    var label = d3.arc()
      .outerRadius(radius*0.5)   //  -70
      .innerRadius(radius*0.5);   // -70
   // d3.select('#pie_chart').append('svg')
    //.attr('id','title')
    //.append("text")
   // .text("dddddd")
   // .attr("fill", "white")
    //  .attr("font-family", "sans-serif")
    //  .attr("font-size", "15px")
    //  .attr("x",winwidth)
  //    .attr("y",winheight*0.05)




    drawPie("src/assets/Allorbit.csv");




    d3.select("#lowOrbit").on("click", function(){
      var src_low = "src/assets/Loworbit.csv";
      drawPie2(src_low,"low orbit",1086,"Low orbit Satellite:     Altitude:187-1498 km  ;   Purpose: Observation ")

    })

    d3.select("#midOrbit").on("click",function(){
      var src_mid = "src/assets/Midorbit.csv";
      drawPie2(src_mid,"medium orbit",117,"Medium orbit Satellite:     Altitude:7815-23551 km  ;   Purpose: Navigation ")
    })

    d3.select("#geoOrbit").on("click",function(){
      var src_geo = "src/assets/Geoorbit.csv";
      drawPie2(src_geo,"geo orbit",548,"Geo orbit Satellite:     Altitude:32618-37782 km  ;   Purpose: Communication ")
    })

    d3.select("#allOrbit").on("click",function(){
      var src_geo = "src/assets/Allorbit.csv";
      drawPie2(src_geo,"",1886,"Satellite Number : 1886")
    })
    
    
    
    
    
    
    function drawPie(src){
      d3.csv(src,function(d:any){
        d.value = +d.value;
        return d;
        }).then(function(data){
          d3.select("#pietitle").remove();

          var arc = g.selectAll(".arc")
            .data(pie(data)) //use pie generator to create the data needed for the each slice of the pie
          

            ///////
            .enter()
            .append("g")
            .attr("class", "arc")
            //.selectAll("path")
            //.data(function(d:any){return d;})
            //.enter()
            arc.append("path") //for each slide use arc path generator to draw the pie
            .attr("d", <any>path)
            .attr("fill", function(d:any) {//console.log(d.data); 
              return String(color(d.data.Country));}) //get data from node (select and $0.__data__ in console)
            .style("opacity",'0.8')
            arc
            .on("mousemove", function(d) {
              d3.select(this)
                  .attr("stroke","#fff")
                  .attr("stroke-width","2px")
                  .style("filter", "url(#drop-shadow)");
              d3.select(this)
                .transition()
                .duration(500)
                .attr('transform',function(d:any){
                  var dist = 1;
                  d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
                  var x = Math.sin(d.midAngle) * dist;
                  var y = Math.cos(d.midAngle) * dist;
                  return 'translate(' + x + ',' + y + ')';
                });

          var mousePos = d3.mouse(divNode);
          d3.select("#mainTooltip")
            .style("left", mousePos[0] - winwidth*0.05 + "px")
            .style("top", mousePos[1] - winheight*0.25 + "px")
            .select("#value")
            .attr("text-anchor", "middle")
            .html(d.data['Country'] + " own " + d.data['value']+" satellites <br>"+Math.round(d.data['value']*100/1886.0)+"% of world ");
         // d3.select(".card-body").selectAll("p").remove()
         // d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
         // d3.select(".card-body").append("p").text(d.data['Country']+ " has "+Math.round(d.data['value']*100/1886.0) + "% satellites in world!")
          d3.select("#mainTooltip").classed("hidden", false);
      })
    .on("mouseout", function(d){
        d3.select(this)
            .attr("stroke","none")
            .style("filter","none");
        d3.select(this)
         // .transition()
         // .duration(500)
          .attr('transform','translate(0,0)');
       // d3.select(".card-body").selectAll("p").remove()
       // d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
       // d3.select(".card-body").append("p").text("Pieces show the country and its percent of satellites and detail will show when you point on.")
        d3.select("#mainTooltip").classed("hidden", true);
    });

    arc.append("text") 
      .attr("transform", function(d:any) { return "translate(" +label.centroid(d) + ")"; })
      .attr("dy", "0em")
      .text(function(d:any) { return d.data.Country; })
      .style("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", winwidth*0.015+"px");

    d3.select("#chart-svg1").append("text")
    .attr("id","pietitle")
    .attr("x",winwidth/2.1)
    .attr("y",winheight*0.95)
    .text("pie chart: satellites of each country")
    .attr("fill", "black")
    .attr("text-anchor"," middle")
    .attr("font-size", winwidth*0.02+"px");

        });


    }


    function drawPie2(src,which,number,descr){
      d3.select("#pietitle").remove();
      // var pie = d3.pie() //pie generator
      //   .sort(null)
      //   .value(function(d) { return d['value']; });
      var sentence = which
      
      d3.select(".card-body").selectAll("p").remove()
      d3.select(".card-body").append("p").text(descr)

      d3.csv(src,function(d:any){
        d.value = +d.value;
        return d;
        }).then(function(data){

          var arc = g.selectAll(".arc")
            .data(pie(data)) //use pie generator to create the data needed for the each slice of the pie
            //arc.transition()
           // .duration(100)
            
          //console.log("here")
          
          d3.select("#chart-svg1").append("text")
          .attr("id","pietitle")
          .attr("x",winwidth/2.1)
          .attr("y",winheight*0.95)
          .text("pie chart: "+ sentence +" satellites of each country")
          .attr("fill", "black")
          .attr("text-anchor"," middle")
          .attr("font-size", winwidth*0.02+"px");
         
          //d3.select("#pietitle").text("pie chart: "+ sentence +" satellites of each country");

          arc
             .select("path") //for each slide use arc path generator to draw the pie
             .attr("d", <any>path)
             .attr("fill", function(d:any) {//console.log(d.data); 
               return String(color(d.data.Country));}) //get data from node (select and $0.__data__ in console)
               .style("opacity",'0.8')
               //.transition()
              //.duration(150)
          .transition()
           .duration(1500)




           arc.select("text") 
      .attr("transform", function(d:any) { return "translate(" +label.centroid(d) + ")"; })
      .attr("dy", "0em")
      .text(function(d:any) { return d.data.Country; })
      .style("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", winwidth*0.015+"px");
              
             arc.on("mousemove", function(d) {
               d3.select(this)
                   .attr("stroke","#fff")
                   .attr("stroke-width","2px")
                   .style("filter", "url(#drop-shadow)");
               d3.select(this)
               .transition()
               .duration(1500)
                 .attr('transform',function(d:any){
                   var dist = 1;
                   d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
                   var x = Math.sin(d.midAngle) * dist;
                   var y = Math.cos(d.midAngle) * dist;
                   return 'translate(' + x + ',' + y + ')';
                 });
 
           var mousePos = d3.mouse(divNode);
           d3.select("#mainTooltip")
             .style("left", mousePos[0] - winwidth*0.05 + "px")
             .style("top", mousePos[1] - winheight*0.25 + "px")
             .select("#value")
             .attr("text-anchor", "middle")
             .html(d.data['Country'] + " own " + d.data['value']+" "+sentence+" satellites <br>"+Math.round(d.data['value']*100/number)+"% of world ");
           //d3.select(".card-body").selectAll("p").remove()
           //d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
           //d3.select(".card-body").append("p").text(d.data['Country']+ " has "+Math.round(d.data['value']*100/number) +"% " + sentence +" satellites in world!")
           d3.select("#mainTooltip").classed("hidden", false);
       })
       .on("mouseout", function(d){
        d3.select(this)
            .attr("stroke","none")
            .style("filter","none");
        d3.select(this)
          .transition()
          .duration(1500)
          .attr('transform','translate(0,0)');
       // d3.select(".card-body").selectAll("p").remove()
       // d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries own.")
       // d3.select(".card-body").append("p").text("The detail will be displayed when you touch each piece.")
        d3.select("#mainTooltip").classed("hidden", true);
    });


        })



    }

  }

  

  private barchart():void{

    var winheight = window.innerHeight*0.9;
    var winwidth = window.innerWidth*0.9;
    d3.select("#bar").remove();  
    var svg = d3.select("#dashboard")
   // .style('background-color', 'lightgrey')
    .append("svg")
    .attr("id","bar")
    .attr('height',winheight)
    .attr('width',winwidth)
    var divNode:any = d3.select("body").node();

    var margin = {top: winheight*0.1, right: winwidth*0.1, bottom: winheight*0.1, left: winwidth*0.1};

    var width = winwidth - margin.right - margin.left;
    var height = winheight - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.1);

    var x1 = d3.scaleBand()
    .padding(0.05);

    var y = d3.scaleLinear()
    .range([height, 0]);

    var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    d3.csv("src/assets/barchart.csv").then(function(data) {

      var keys = data.columns.slice(1);
      //console.log(keys);
      //console.log(data);

      x0.domain(data.map(function(d) { return d.Country; }));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return +d[key]; }); })]).nice();
      color.domain(d3.keys(data[0]));

      g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.Country) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) {return {key: key, value: +d[key]}; }); })
      .enter().append("rect")
      .attr("x", function(d) { //console.log(d) ;
        return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { //console.log(d.key);
        return height - y(d.value); })
      .attr("fill", function(d){return color(d.key).toString()})
      .on('mouseover',function(d,i){
        d3.select(this)
        .attr("fill","#d0743c")
        var mousePos = d3.mouse(divNode);
           d3.select("#mainTooltip")
             .style("left", mousePos[0]+winheight*0.005 + "px")
             .style("top", mousePos[1] - winheight*0.01 + "px")
             .select("#value")
             .attr("text-anchor", "middle")
             .html(" usage :"+d.key+"<br>"+"number :"+d.value.toString())
            d3.select("#mainTooltip").classed("hidden", false);



      })
      .on('mouseout',function(d,i){
        d3.select(this)
        .attr("fill", function(d:any){return color(d.key).toString()})

        d3.select("#mainTooltip").classed("hidden", true);


      })

      g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

      g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", winwidth*0.01)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Number");


      var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", winwidth*0.01)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys)   /////
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * width*0.025 + ")"; });

      legend.append("rect")
      .attr("x", width - width*0.024)
      .attr("width", width*0.024)
      .attr("height", width*0.024)
      .attr("fill", function(d){return color(d).toString()});  ////////

      legend.append("text")
      .attr("x", width - width*0.029)
      .attr("y", width*0.015)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

      svg.append("text")
      .attr("x",0.5*width)
      .attr("y",0.05*height)
      .text("Usage of Satellite for each country")
      .attr("text-anchor","middle")
      .attr("font-size", winwidth*0.015+"px");

    });
     



  }

  
}




