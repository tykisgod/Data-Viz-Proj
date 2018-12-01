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
    //this.piechart();

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
    
    var divNode:any = d3.select("body").node();
    var flag = -1;
    var margin = {top:40,right:100,bottom:60,left:60};
    var winheight = window.innerHeight * 0.8;
    var winwidth = window.innerWidth*0.8;
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
    .attr("x",winwidth/2)
    .attr("y",0.05*winheight)
    .text("line chart for trend of launching satellite between 1966 and 2018")
    .attr("text-anchor", "middle")

    var width = parseInt(d3.select("#linechart_2").style("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#linechart_2").style("height")) - margin.top - margin.bottom;
    var xScale = d3.scalePoint()   ////// 
            .range([0,width-40])
           .padding(0.1)
    var yScale = d3.scaleLinear()
           .range([height, 0]);
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // ���� x ��  y ��

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
              .attr('cx', width-50)
              // .attr('cy',100)
              .attr('cy', function (d, i) { return (i+1) * height* 0.03; })
              .attr('r' ,'5')
              .attr('fill', function(d:any) { return color(d.name); })
      
            counLine.append('text') 
              .attr('class','llegend')
              .attr("style","font-size:15px")
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


  // private draw5():void{
  //   var freqData=[
  //     {State:'AL',freq:{low:4786, mid:1319, high:249}}
  //     ,{State:'AZ',freq:{low:1101, mid:412, high:674}}
  //     ,{State:'CT',freq:{low:932, mid:2149, high:418}}
  //     ,{State:'DE',freq:{low:832, mid:1152, high:1862}}
  //     ,{State:'FL',freq:{low:4481, mid:3304, high:948}}
  //     ,{State:'GA',freq:{low:1619, mid:167, high:1063}}
  //     ,{State:'IA',freq:{low:1819, mid:247, high:1203}}
  //     ,{State:'IL',freq:{low:4498, mid:3852, high:942}}
  //     ,{State:'IN',freq:{low:797, mid:1849, high:1534}}
  //     ,{State:'KS',freq:{low:162, mid:379, high:471}}
  //     ];
      
  //     dashboard('#dashboard',freqData);

  //     function dashboard(id, fData){
  //       var barColor = 'steelblue';
  //       function segColor(c){ return {low:"#807dba", mid:"#e08214",high:"#41ab5d"}[c]; }
  //       fData.forEach(function(d){d.total=d.freq.low+d.freq.mid+d.freq.high;});
    
  //       function histoGram(fD){
  //         var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
  //         var width = 500 - hGDim.l - hGDim.r; 
  //         var height = 300 - hGDim.t - hGDim.b;
    
    
  //         var hGsvg = d3.select(id).append("svg")
  //               .attr("width", width + hGDim.l + hGDim.r)
  //               .attr("height", height + hGDim.t + hGDim.b).append("g")
  //               .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");
  //         var xScale = d3.scaleBand()
  //               .domain(fD.map(function(d) { return d[0];}))
  //               .range([0,width])
    
  //          var xAxis = d3.axisBottom(xScale);
    
  //         hGsvg.append("g").attr("class", "dash_x_axis")
  //               .attr("transform", "translate(0," + height + ")")
  //               .call(xAxis);
    
  //         var yScale = d3.scaleLinear()
  //             .domain([0, d3.max(fD, function(d) { return +d[1]; })])
  //             .range([height, 0])
          
  //         var bars = hGsvg.selectAll(".bar").data(fD).enter()
  //             .append("g").attr("class", "bar");
    
    
  //         bars.append("rect")
  //             .attr("x", function(d) { return xScale(d[0]); })
  //             .attr("y", function(d) { return yScale(d[1]); })
  //             .attr('width', xScale.bandwidth())
  //             .attr("height", function(d) { return height  - yScale(d[1]); })
  //             .attr('fill',barColor)
  //             .on("mouseover",mouseover)// mouseover is defined below.
  //             .on("mouseout",mouseout);// mouseout is defined below.
    
  //         bars.append("text").text(function(d){ return d3.format(",")(d[1])})
  //             .attr("x", function(d) { return xScale(d[0])+xScale.bandwidth()/2; })
  //             .attr("y", function(d) { return yScale(d[1])-5; })
  //             .attr("text-anchor", "middle");
    
    
  //         function mouseover(d){  // utility function to be called on mouseover.
  //               // filter for selected state.
  //               var st = fData.filter(function(s){ return s.State == d[0];})[0],
  //                   nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});
                   
  //               // call update functions of pie-chart and legend.    
  //               pC=Object.create(nD); //
  //               leg=Object.create(nD);//
  //         }
    
  //         function mouseout(d){    // utility function to be called on mouseout.
  //           // reset the pie-chart and legend.    
  //           pC.update(tF);
  //           leg.update(tF);
  //         }
    
  //         hG= Object.create(function(nD, color){
  //           // update the domain of the y-axis map to reflect change in frequencies.
  //           yScale.domain([0, d3.max(nD, function(d) { return +d[1]; })]);
            
  //           // Attach the new data to the bars.
  //           var bars = hGsvg.selectAll(".bar").data(nD);
            
  //           // transition the height and color of rectangles.
  //           bars.select("rect").transition().duration(500)
  //               .attr("y", function(d) {return yScale(d[1]); })
  //               .attr("height", function(d) { return height - yScale(d[1]); })
  //               .attr("fill", color);
    
  //           // transition the frequency labels location and change value.
  //           bars.select("text").transition().duration(500)
  //               .text(function(d){ return d3.format(",")(d[1])})
  //               .attr("y", function(d) {return yScale(d[1])-5; });            
  //       });        
  //       return hG;
  //   }
    
  //   function pieChart(pD){
  //     var pC ={},    pieDim ={w:250, h: 250};
  //     var radius = Math.min(pieDim.w, pieDim.h) / 2;
              
  //     // create svg for pie chart.
  //     var piesvg = d3.select(id).append("svg")
  //         .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
  //         .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
      
  //     // create function to draw the arcs of the pie slices.
  //     var arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
    
  //     // create a function to compute the pie slice angles.
  //     var pie = d3.pie().sort(null).value(function(d:any) { return +d.freq; });
    
  //     // Draw the pie slices.
  //     piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", <any>arc)
  //         //.each(function(d) { this._current = d; })  //......................
    
  //         .style("fill", function(d:any) { return segColor(d.data.type); })
  //         .on("mouseover",mouseover).on("mouseout",mouseout);
    
  //     // create function to update pie-chart. This will be used by histogram.
  //     pC = Object.create(function(nD){
  //         piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
  //             .attrTween("d", arcTween);
  //     });      
  //     // Utility function to be called on mouseover a pie slice.
  //     function mouseover(d){

  //       console.log(fData.map(function(v){ 
  //         return [v.State,v.freq[d.data.type]];}),segColor(d.data.type))
  //         // call the update function of histogram with new data.    Object.create(fData.map(function(v){ 
  //             //return [v.State,v.freq[d.data.type]];}),segColor(d.data.type))
  //         hG=Object.create(fData.map(function(v){ 
  //           return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
  //     }
  //     //Utility function to be called on mouseout a pie slice.
  //     function mouseout(d){
  //         // call the update function of histogram with all data.
  //         hG=Object.create
          
  //         (fData.map(function(v){
  //             return [v.State,v.total];}), <any>barColor);
  //     }
  //     // Animating the pie-slice requiring a custom function which specifies
  //     // how the intermediate paths should be drawn.
  //     function arcTween(a) {
  //         var i = d3.interpolate(this._current, a);
  //         this._current = i(0);
  //         return function(t) { return arc(i(t));    };
  //     }    
  //     return pC;
  //   }
    
    
    
    
  //   // function to handle legend.
  //   function legend(lD){
  //     var leg = {};
          
  //     // create table for legend.
  //     var legend = d3.select(id).append("table").attr('class','legend');
      
  //     // create one row per segment.
  //     var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
          
  //     // create the first column for each segment.
  //     tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
  //         .attr("width", '16').attr("height", '16')
  //   .attr("fill",function(d:any){ return segColor(d.type); });
          
  //     // create the second column for each segment.
  //     tr.append("td").text(function(d:any){ return d.type;});
    
  //     // create the third column for each segment.
  //     tr.append("td").attr("class",'legendFreq')
  //         .text(function(d:any){ return d3.format(",")(d.freq);});
    
  //     // create the fourth column for each segment.
  //     tr.append("td").attr("class",'legendPerc')
  //         .text(function(d){ return getLegend(d,lD);});
    
  //     // Utility function to be used to update the legend.
  //     leg=Object.create(function(nD){
  //         // update the data attached to the row elements.
  //         var l = legend.select("tbody").selectAll("tr").data(nD);
    
  //         // update the frequencies.
  //         l.select(".legendFreq").text(function(d:any){ return d3.format(",")(d.freq);});
    
  //         // update the percentage column.
  //         l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
  //     })
      
  //     function getLegend(d,aD){ // Utility function to compute percentage.
  //         return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
  //     }
    
  //     return leg;
  //   }
    
  //   // calculate total frequency by segment for all state.
  //   var tF = ['low','mid','high'].map(function(d){ 
  //     return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))}; 
  //   });    

  //   //console.log(tF[0]);
    
  //   // calculate total frequency by state for all segment.
  //   var sF = fData.map(function(d){return [d.State,d.total];});
  //   //console.log(sF)
  //   var hG = histoGram(sF);// create the histogram.
  //   console.log(hG)
  //    var pC = pieChart(tF);// create the pie-chart.
  //    var leg= legend(tF);  // create the legend.
    
    
    
    
        
  //   }
    
  // }

  private piechart():void{

    var winheight = window.innerHeight*0.6;
    var winwidth = window.innerWidth*0.6;
    var svg = d3.select("#chart-svg1")
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
      drawPie2(src_low,"low orbit",1086)

    })

    d3.select("#midOrbit").on("click",function(){
      var src_mid = "src/assets/Midorbit.csv";
      drawPie2(src_mid,"medium orbit",117)
    })

    d3.select("#geoOrbit").on("click",function(){
      var src_geo = "src/assets/Geoorbit.csv";
      drawPie2(src_geo,"geo orbit",548)
    })

    d3.select("#allOrbit").on("click",function(){
      var src_geo = "src/assets/Allorbit.csv";
      drawPie2(src_geo,"",1886)
    })
    
    
    
    
    
    
    function drawPie(src){
      d3.csv(src,function(d:any){
        d.value = +d.value;
        return d;
        }).then(function(data){

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
         // .transition()
         // .duration(500)
          .attr('transform','translate(0,0)');
        d3.select(".card-body").selectAll("p").remove()
        d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
        d3.select(".card-body").append("p").text("Pieces show the country and its percent of satellites and detail will show when you point on.")
        d3.select("#mainTooltip").classed("hidden", true);
    });

    arc.append("text") 
      .attr("transform", function(d:any) { return "translate(" +label.centroid(d) + ")"; })
      .attr("dy", "0em")
      .text(function(d:any) { return d.data.Country; })
      .style("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px");

    d3.select("#chart-svg1").append("text")
    .attr("id","pietitle")
    .attr("x",winwidth/2)
    .attr("y",winheight*0.95)
    .text("pie chart: satellites of each country")
    .attr("fill", "black")
    .attr("text-anchor"," middle")

        });


    }


    function drawPie2(src,which,number){
      // var pie = d3.pie() //pie generator
      //   .sort(null)
      //   .value(function(d) { return d['value']; });
      var sentence = which


      d3.csv(src,function(d:any){
        d.value = +d.value;
        return d;
        }).then(function(data){

          var arc = g.selectAll(".arc")
            .data(pie(data)) //use pie generator to create the data needed for the each slice of the pie
            //arc.transition()
           // .duration(100)
            
          console.log("here")
          
         
          d3.select("#pietitle").text("pie chart: "+ which +" satellites of each country");

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
      .attr("font-size", "12px");
              
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
             .style("left", mousePos[0] - 40 + "px")
             .style("top", mousePos[1] - 70 + "px")
             .select("#value")
             .attr("text-anchor", "middle")
             .html(d.data['Country'] + " own " + d.data['value']+" "+sentence+" satellites <br>"+Math.round(d.data['value']*100/number)+"% of world ");
           d3.select(".card-body").selectAll("p").remove()
           d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries percent own.")
           d3.select(".card-body").append("p").text(d.data['Country']+ " has "+Math.round(d.data['value']*100/number) +"% " + sentence +" satellites in world!")
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
        d3.select(".card-body").selectAll("p").remove()
        d3.select(".card-body").append("p").text("The pie chart showing  how many satellites these 5 countries own.")
        d3.select(".card-body").append("p").text("The detail will be displayed when you touch each piece.")
        d3.select("#mainTooltip").classed("hidden", true);
    });


        })



    }

      
      



    
    
            

       
        
    
  }

  private linechart():void{
    d3.select("#linechart_2").remove();
    var margin = {top:40,right:100,bottom:60,left:60};
    var winheight = window.innerHeight * 0.8;
    var winwidth = window.innerWidth*0.8;

    d3.select('#chart3').append('svg')
        .attr('id','linechart_2')
        .attr('height',winheight)
        .attr('width',winwidth)
        .style('background-color', 'lightgrey')
    
    var color =d3.scaleOrdinal(d3.schemeCategory10);

    var width = parseInt(d3.select("#linechart_2").style("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#linechart_2").style("height")) - margin.top - margin.bottom;
    d3.csv("src/assets/third_data2.csv").then( function(data) {
      

    })
  
  
   
  }

  private barchart():void{

    var winheight = window.innerHeight*0.6;
    var winwidth = window.innerWidth*0.6;
    d3.select("#bar").remove();  
    var svg = d3.select("#dashboard")
   // .style('background-color', 'lightgrey')
    .append("svg")
    .attr("id","bar")
    .attr('height',winheight)
    .attr('width',winwidth)
    var divNode:any = d3.select("body").node();

    var margin = {top: 20, right: 20, bottom: 30, left: 40};

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
      console.log(keys);
      console.log(data);

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
      .attr("x", function(d) { console.log(d) ;return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { console.log(d.key);return height - y(d.value); })
      .attr("fill", function(d){return color(d.key).toString()})
      .on('mouseover',function(d,i){
        d3.select(this)
        .attr("fill","#d0743c")
        var mousePos = d3.mouse(divNode);
           d3.select("#mainTooltip")
             .style("left", mousePos[0]+5 + "px")
             .style("top", mousePos[1] - 10 + "px")
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
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Number");


      var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys)   /////
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function(d){return color(d).toString()});  ////////

      legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

      svg.append("text")
      .attr("x",0.5*width)
      .attr("y",0.05*height)
      .text("Usage of Satellite for each country")
      .attr("text-anchor","middle");

    });
     



  }

  
}




