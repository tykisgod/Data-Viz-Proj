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

  
    var winheight = window.innerHeight*0.8;
    var winwidth = window.innerWidth*0.8;
    var svg = d3.select("#chart-svg1")
    .attr('height',winheight)
    .attr('width',winwidth)
    //width = +svg.attr("width");
    //height = +svg.attr("height");
    var radius = Math.min(winwidth/2, winheight/2);

   var g = svg.append("g").attr("transform", "translate(" + winwidth/2 + "," + winheight/2 + ")");
    var color = d3.scaleOrdinal(["#f44242", "#f4eb41", "#43f441", "#41f4e5", "#5241f4"]);


    var divNode:any = d3.select("body").node();
    var defs = svg.append("defs");
    var filter = defs.append("filter")
                    .attr("id", "drop-shadow")
                    .attr("height","130%");
    
    filter.append("feGaussianBlur")
            .attr("in","SourceAlpha")
            .attr("stdDeviation", 3)
            .attr("result", "blur");
    
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 3)
        .attr("dy", 3)
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
      .outerRadius(radius - 10)
      .innerRadius(0); //make != 0 for a donut chart
        
    var label = d3.arc()
      .outerRadius(radius - 70)
      .innerRadius(radius - 70);
        
    d3.csv("src/assets/third_data.csv",function(d:any){
      d.value = +d.value;
      return d;
      }).then(function(data){
      //console.log(data)



      var arc = g.selectAll(".arc")
      .data(pie(data)) //use pie generator to create the data needed for the each slice of the pie
      .enter().append("g")
      .attr("class", "arc");


      arc.append("path") //for each slide use arc path generator to draw the pie
      .attr("d", <any>path)
      .attr("fill", function(d:any) {//console.log(d.data); 
        return color(d.data.country);}) //get data from node (select and $0.__data__ in console)
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
            .style("left", mousePos[0] - 40 + "px")
            .style("top", mousePos[1] - 70 + "px")
            .select("#value")
            .attr("text-anchor", "middle")
            .html(d.data['country'] + " own " + d.data['value']+" satellites <br>"+Math.round(d.data['value']*100/1886.0)+"% of world ");
          d3.select(".card-body").selectAll("p").remove()
          d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
          d3.select(".card-body").append("p").text(d.data['country']+ " has "+Math.round(d.data['value']*100/1886.0) + "% satellites in world!")
          d3.select("#mainTooltip").classed("hidden", false);
      })
    .on("mouseout", function(d){
        d3.select(this)
            //.attr("stroke","none")
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

      
      
      arc.append("text") 
      .attr("transform", function(d:any) { return "translate(" +label.centroid(d) + ")"; })
      .attr("dy", "0em")
      .text(function(d:any) { return d.data.country; })
      .style("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px");








      })

    
      
    this.draw();
    this.draw2();
    this.draw3();
    this.draw4();
    


    

  }

  onResize(){
    this.draw();

  }

  private draw():void{

    var margin = {top:40,right:60,bottom:60,left:40};
    var winheight = window.innerHeight*0.8;
    var winwidth = window.innerWidth*0.8;
    //var flag = -1;
    d3.select("#linechart").remove();
    d3.select('#line_chart').append('svg')
        .attr('id','linechart')
        .attr('height',winheight)
        .attr('width',winwidth)
    var width = parseInt(d3.select("#linechart").attr("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#linechart").attr("height")) - margin.top - margin.bottom;

    //console.log(width)

    


    var line = d3.line()
        .x(function(d:any){
          //console.log(d['YearOfLaunch']);
          return xScale(d['YearOfLaunch']);}) 
        .y(function(d:any){
          //console.log(d['Number']);
          return yScale(+d['Number']);})

    
    var svg = d3.select("#linechart")
    .style('background-color', 'lightgrey')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    var color =d3.scaleOrdinal(d3.schemeCategory10);var xScale = d3.scalePoint()   ////// 
            .range([0,width])
           .padding(0.1)

    var yScale = d3.scaleLinear()
           //.base(5) 
           //nice
           .range([height, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    xAxis.ticks(5);
    var countries;    ///////////////// think these later

    d3.csv("src/assets/third_data2.csv").then( function(data) {
      
    //console.log(data);

    xScale.domain(data.map(function(d) { 
      //console.log(d['YearOfLaunch'])
      return d['YearOfLaunch']; }));
    var y_min = +d3.min(data.map(d=>+d.Number));
    var y_max = +d3.max(data.map(d=>+d.Number));
    // console.log(y_min);
    // console.log(y_max);
    yScale.domain([y_min,y_max])

    // console.log("123123: "+xScale("2000"))
    

    svg.append("g")
          .attr("class", "xAxis")
          .attr("transform", "translate(0," + height + ")")
          //.attr("transform", "rotate(-90)")
          .call(xAxis);
    svg.selectAll(".xAxis .tick text")
      .attr("transform", "rotate(-90)")
      .attr("dx", "-2em")
      .attr("dy", "-0.5em")
      .attr("font-size", "15px")


      
    svg.append("g")
          .attr("class", "yAxis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          //.attr("x",2)
          .attr("y", 4)
          .attr("dy", "0.7em")
          .attr("fill", "#000")
          .style("text-anchor", "end")
          .attr("font-size", "25px")
            .text("number of Satellite per year");

          
    svg.selectAll(".yAxis .tick text")
          // .attr("transform", "rotate(-90)")
          // .attr("dx", "-2em")
          // .attr("dy", "-0.5em")
           .attr("font-size", "15px")

    var counLine = svg
          .append('g')

          .datum(data)
          .attr('class','country');

    counLine.append('path')
          // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
           .attr("class", "line")
           .attr("stroke-width","3px")
           .attr("fill", "none") 
           .attr("d", function(d:any) { 
             //console.log("123")
            //console.log(d);
             return line(d); 
            })
           //.attr("data-legend",function(d:any) { return d.name})
           .style("stroke","#f44242")
           .on('mouseover',function(d,i){
             //flag = i;
               //console.log(flag);
              // d3.selectAll(".line").style("stroke-width", function(d,i){
                // return i == flag?"5px":"2.5px";
               //})
   
           })
      
    var pointCircle = counLine.append('g')
           .datum(data)
           .selectAll('.pointCirle')
           .data(function(d:any){return d;})
           .enter()
           .append('g')
           .append('circle')
           .attr("cx", function(d:any){
             return xScale(d['YearOfLaunch']);})
           .attr("cy",function(d,i){
             return yScale(d['Number']);
           })
           .attr('r',4)
           .style('fill','#f44242')
           .style("fill-opacity", 0)
           .on("mouseover", function(d){
             d3.select(this)
             .style("fill-opacity",0.8)
             var odate = d['YearOfLaunch'];
             var ovalue = d['Number'];
             //Get this bar's x/y values, then augment for the tooltip
             var xPosition = parseFloat(d3.select(this).attr("cx")) +2.5;
             //console.log(xPosition)
             var yPosition = parseFloat(d3.select(this).attr("cy")) -10;
             //console.log(yPosition)
             //Create the tooltip label
             svg//.append("g")
                 .append("text")
                 .attr("id", "tooltip")
                 .attr("x", xPosition)
                 .attr("y", yPosition)
                 .attr("text-anchor", "middle")
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "25px")
                 .style("fill","#f44242")
                 .text(ovalue)
           })
           .on("mouseout", function() {
             //Remove the tooltip
             d3.select("#tooltip").remove();
             //Set opacity to 0
             d3.select(this)
               .style("fill-opacity",0)
             })

  
  })
  // d3.csv("src/assets/third_data3.csv").then(function(data) {

  // })


  }


  private draw2():void{
    var d;
    d3.csv("src/assets/third_3.csv").then(function (data) {
    var colors = ["#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#2ECC40", "#01FF70", "#FFDC00", "#FF4136", "#FF851B", "#7F4145", "#BD3D3A", "#3F69AA", "#D5AE41", "#E47A2E", "#F1EA7F", "#485167", "#ECDB54", "#944743", "#00A591"];
    drawBarChart(data);
    // drawSlopeGraph(data, country);

    function drawBarChart(data) {
      var top10Data = data.slice(0);
      var bot10Data = data.slice(0);
      var dataForSortAlfa = data.slice(0).sort(); 
      var dataForSortAsc = data.slice(0).sort(compare).reverse();

      var compare = function (x, y) {
        if (+x.Count < +y.Count) {
            return 1;
        } else if (+x.Count > +y.Count) {
            return -1;
        } else {
            return 0;
        }
      }

      
      var compareAlpha = function (a, b) {
        var textA = a.Country.toUpperCase();
        var textB = b.Country.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

    var top5 = false;

    var margin = { top: 60, right: 40, bottom: 100, left: 50 }; //step1: set margin

    var winwidth = window.innerWidth;
    var winheight = winwidth/2.5;

    // var width = 1000 - margin.left - margin.right, //step2: set width and height
    //     height = 300 - margin.top - margin.bottom;





    var svg = d3.select("#p2")
        .append("svg") //step3: set-up svg
        .attr("id", "svg0")
        .attr('height',winheight)
        .attr('width',winwidth)
        .style('background-color', 'lightgrey')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var width = parseInt(d3.select("#svg0").attr("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#svg0").attr("height")) - margin.top - margin.bottom;


    var xScale = d3.scaleBand()
        //.domain(d3.range(0, 10))
        .range([0, width])
        .paddingInner(0.05)
        .paddingOuter(0.1);
    var xAxis = d3.axisBottom(xScale);

    xScale.domain(data.map(function(d,i) { 
      //console.log(d['Vehicle'])
      return d['Vehicle']; }));


    svg.append("g")
      .attr("class", "axis-x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    svg.selectAll(".axis-x .tick text")
      .attr("transform", "rotate(-75)")
      .attr("dx", "-4.5em")
      .attr("dy", "-0.9em")


    //console.log(data)

    //console.log(d3.max(data, function (d:any) { return +d['Count'] }))
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d:any) { return +d['Count'] })])
      .range([height, 0]);


    var y2 = d3.scaleLinear()
      .domain([0, d3.max(data, function (d:any) { return +d['Count'] })])
      .range([0, height]);
    
    var yAxis = d3.axisLeft(y)
      //.scale(y);

    svg.append("g")
      .attr("class", "yAxis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      //.attr("x",2)
      .attr("y", 4)
      .attr("dy", "0.7em")
      .attr("fill", "#000")
      .style("text-anchor", "end")
      .attr("font-size", "10.5px")
      .text("number of Satellite");


    
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
          return xScale(d['Vehicle']);
      })
      .attr('y', function (d) { return y(d['Count']); })
      .attr('width', xScale.bandwidth)
      .attr('height', function (d) { return y2(d['Count']); })
      .attr('fill', '#FF4136')
      .style("fill-opacity",0.8)

    svg.append("text")      // text label for the x axis
      .attr("id", "title")
      .attr("x", 450)
      .attr("y", -30)
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text(" The number of satellites launched by Satellite sites");

      d3.select("#top5").on("click", function(){

        var tmpData = Array.from(Object.create(data))
        var curTop10 = tmpData.sort(compare).slice(0,10);
            //console.log(data)
            //console.log(data.sort(compare))
            console.log("10")
            console.log(curTop10)

            
            xScale.domain(curTop10.map(function(d,i){
              return d['Vehicle'];

            }));


              
             d3.select(".axis-x")
                 .transition()
                 .duration(500)
                 .call(<any> xAxis);
             var svg = d3.select("#svg0 g");

             var rects = svg.selectAll("rect")
                 .data(curTop10);

             rects.exit()
                 .transition()
                 .duration(500)
                 .style("opacity", 0)
                 .remove(); //style here!remove();

             rects.transition() //UPDATE
                 .duration(500)
                 .attr('x', function (d, i) {
                     return xScale(d['Vehicle']);
                 })
                .attr('y', function (d) { return y(d['Count']); })
                .attr('width', xScale.bandwidth)
                 .attr('height', function (d) { return y2(d['Count']); })
                 .attr('fill', '#FF4136')
                 .style("fill-opacity",0.8);

             rects.enter()
                 .append("rect")
                 .transition() //UPDATE
                 .duration(500)
                 .attr('x', function (d, i) {
                    return xScale(d['Vehicle']);
                })
                .attr('y', function (d) { return y(d['Count']); })
                 .attr('width', xScale.bandwidth)
                 .attr('height', function (d) { return y2(d['Count']); })
                 .attr('fill', '#FF4136');

            // svg.selectAll(".axis-x text")
            //     .data(curTop5.slice(0, 5))
            //     .transition() //UPDATE
            //     .duration(500)
            //     .text(function (d) {
            //         console.debug(d.Country);
            //         return d.Country;
            //     });

             svg.select("#title")
                 .attr("x", 450)
                 .attr("y", -30)
                 .style("font-size", "20px")
                 .style("text-anchor", "middle")
                 .text("The number of satellites launched by Satellite sites");


      });
   



      d3.select("#third_reset").on("click", function(){
        console.log(100)
        console.log(data);

        xScale.domain(data.map(function(d,i){
          return d['Vehicle'];
        }));
        d3.select(".axis-x")
                 .transition()
                 .duration(500)
                 .call(<any> xAxis);
        
        svg.selectAll(".axis-x .tick text")
                 .attr("transform", "rotate(-75)")
                 .attr("dx", "-4.5em")
                 .attr("dy", "-0.9em")

                 var svg0 = d3.select("#svg0 g");

                 var rects = svg0.selectAll("rect")
                     .data(data);
    
                 rects.exit()
                     .transition()
                     .duration(500)
                     .style("opacity", 0)
                     .remove(); //style here!remove();
    
                 rects.transition() //UPDATE
                     .duration(500)
                     .attr('x', function (d, i) {
                         return xScale(d['Vehicle']);
                     })
                    .attr('y', function (d) { return y(d['Count']); })
                    .attr('width', xScale.bandwidth)
                     .attr('height', function (d) { return y2(d['Count']); })
                     .attr('fill', '#FF4136');
    
                 rects.enter()
                     .append("rect")
                     .transition() //UPDATE
                     .duration(500)
                     .attr('x', function (d, i) {
                        return xScale(d['Vehicle']);
                    })
                    .attr('y', function (d) { return y(d['Count']); })
                     .attr('width', xScale.bandwidth)
                     .attr('height', function (d) { return y2(d['Count']); })
                     .attr('fill', '#FF4136')
                     .style("fill-opacity",0.8);
    
                // svg.selectAll(".axis-x text")
                //     .data(curTop5.slice(0, 5))
                //     .transition() //UPDATE
                //     .duration(500)
                //     .text(function (d) {
                //         console.debug(d.Country);
                //         return d.Country;
                //     });
    
                 svg.select("#title")
                     .attr("x", 450)
                     .attr("y", -30)
                     .style("font-size", "20px")
                     .style("text-anchor", "middle")
                     .text("Top 5 countries of Gender parity index for gross enrolment ratio out of 10 countries in 2014");
      });



    }
});
  }


  private draw3():void{

    var flag = -1;
    var margin = {top:40,right:100,bottom:60,left:60};
    var winheight = window.innerHeight * 0.8;
    var winwidth = window.innerWidth*0.8;
    d3.select("#linechart_2").remove();
    d3.select('#chart3').append('svg')
        .attr('id','linechart_2')
        .attr('height',winheight)
        .attr('width',winwidth)
        .style('background-color', 'lightgrey')

    var width = parseInt(d3.select("#linechart_2").style("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#linechart_2").style("height")) - margin.top - margin.bottom;


    var xScale = d3.scalePoint()   ////// 
            .range([0,width-20])
           .padding(0.1)

    var yScale = d3.scaleLinear()
           //.base(5) 
           //nice
           .range([height, 0]);
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var line = d3.line()
        .x(function(d:any){return xScale(d['Year']);}) 
        .y(function(d:any){return yScale(d['rate']);})

    var svg = d3.select("#linechart_2")
        .append('g')
        .style('background-color', 'lightgrey')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      //////

    var color =d3.scaleOrdinal(d3.schemeCategory10);

    var countries;
         d3.csv("src/assets/third_line_countries.csv").then( function(data) {
          data.forEach(function(d) {
          d.Years = d.Years;
          });  
        console.log(data);

        color.domain(d3.keys(data[0]).filter(function(key) { return key !=="Years"; }));//.filter(function(key) { return key !=="year"; }));
        countries = color.domain().map(function(name) {
          return {
            name: name,
            values: data.map(function(d) {
            return {Year: d.Years, rate: +d[name]};
            })

          };
        });

        console.log(countries);
        console.log(data);
        xScale.domain(data.map(function(d) { return d['Years']; }));



        var y_min = +d3.min(countries, function(c:any) { return d3.min(c['values'], function(v:any) { return +v['rate']; }); });//-10;
        var y_max = +d3.max(countries, function(c:any) { return d3.max(c['values'], function(v:any) { return +v['rate']; }); })+5;
        yScale.domain([y_min,y_max])
        yAxis.ticks(5);  //// ticksµÄ×÷ÓÃ
        xAxis.ticks(5);
  
        //console.log(xScale.domain);
        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    

            svg.selectAll(".xAxis .tick text")
            .attr("transform", "rotate(-90)")
            .attr("dx", "-2em")
            .attr("dy", "-0.5em")
            .attr("font-size", "15px")


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
            .attr("font-size", "25px")
            .text("number of Satellite per year");

          svg.selectAll(".yAxis .tick text")
            // .attr("transform", "rotate(-90)")
            // .attr("dx", "-2em")
            // .attr("dy", "-0.5em")
             .attr("font-size", "15px")


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
            .on('mouseover',function(d,i){
              flag = i;
                //console.log(flag);
                d3.selectAll(".line").style("stroke-width", function(d,i){
                  return i == flag?"5px":"2.5px";
                })
    
            })
    
            counLine.append('circle')
              .attr('class','cirlegend')
              .attr('cx', width-50)
              // .attr('cy',100)
              .attr('cy', function (d, i) { return (i+1) * height* 0.03; })
              .attr('r' ,'10')
              .attr('fill', function(d:any) { return color(d.name); })
      
            counLine.append('text') 
              .attr('class','llegend')
              .attr("style","font-size:20px")
              .attr('x', width-30)
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
                d3.select(this)
                .style("fill-opacity",0.8)
                var odate = d['Year'];
                var ovalue = d['rate'];
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = parseFloat(d3.select(this).attr("cx")) + 5;
                var yPosition = parseFloat(d3.select(this).attr("cy")) -10;
                //Create the tooltip label
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "35px")
                    .style("fill","#f44242")
                    .text(ovalue)
              })
              .on("mouseout", function() {
                //Remove the tooltip
                d3.select("#tooltip").remove();
                //Set opacity to 0
                d3.select(this)
                  .style("fill-opacity",0)
                })
    

      });



   
  }

  private draw4():void{
    var margin = {left:40, right:40, buttom:40, top:40};
    var winwidth = window.innerWidth;
    var w = winwidth;
    var h = w/2;
    d3.csv("src/assets/third_3_1.csv").then(function(dataset:any){
      var stack = d3.stack().keys(["USA", "United Kingdoms", "India", "Japan", "Others"]);
      var series = stack(dataset);
      var xScale = d3.scaleBand()
      .domain(<any>d3.range(dataset.length))
      .range([margin.left, winwidth-margin.right])
      .padding(0.05);
      
      var yScale = d3.scaleLinear()
      .domain([0,    
          d3.max(dataset, function(d) {
              return +d["USA"] + +d["United Kingdoms"] + +d["India"] + +d["Japan"] + +d["Others"];
          })
      ])
      .range([h-margin.buttom, margin.top]);
      //var vehicle_list = ["", "", "", "", "", ""];
      var colors = d3.scaleOrdinal(d3.schemeCategory10)
      console.log("???????")
      var svg = d3.select("#line_chart_1")
      .style('background-color', 'lightgrey')
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
  
      var groups = svg.selectAll("g")
          .data(series)
          .enter()
          .append("g")
          .style("fill", function(d, i) {
              return <any>colors(i+"");
          });
  
      // Add a rect for each data value
      var rects = groups.selectAll("rect")
          .data(function(d) { 
              return d; 
          })
          .enter()
          .append("rect")
          .attr("x", function(d, i) {
              return xScale(<any>i);
          })
          .attr("y", function(d) {
              return yScale(d[1]);
          })
          .attr("height", function(d) {
              return yScale(d[0]) - yScale(d[1]);
          })
          .attr("width", xScale.bandwidth());
      svg.append('g')
          .attr('class', 'x axis')
          .attr("transform", "translate(0," + (h-margin.buttom) + ")")
          .call(d3.axisBottom(xScale))

      svg.append('g')
          .attr("class", "y axis")
          .attr("transform", "translate(" + (margin.left) + ",0)")
          .call(d3.axisLeft(yScale))

          
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("x",-50)
          .attr("y", 4)
          .attr("dy", "0.7em")
          .attr("fill", "#000")
          .style("text-anchor", "end")
          .attr("font-size", "10.5px")
          .text("number of Satellite");
  
  })
  }

}
