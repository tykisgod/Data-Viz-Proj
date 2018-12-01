import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import * as d3 from 'd3';
import { arc } from 'd3';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SecondComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createChart();
  }
  ngOnChanges():void{
    this.createChart();
  }
  onResize(){
    this.createChart();
  }
  private createChart(): void{
    var flag = 0;
    var orbit_flag = "geo";
    var winwidth = window.innerWidth;
    var margin = {left:winwidth*0.02, top:winwidth*0.02, bottom:winwidth*0.02, right:winwidth*0.05}
    d3.select(".second").remove();
    var svg = d3.select("#orbits").append("svg") 
      .attr("class", "second")
      .attr("width", winwidth)
      .attr("height", winwidth/2),
      width = +svg.attr("width")-margin.left-margin.right,
      height = +svg.attr("height")-margin.top-margin.bottom,
      label_padding = height * 0.05;
    svg.append("rect")
    .attr("width", winwidth)
    .attr("height", winwidth/2)
    .attr("fill", "#4B4B4B")
    svg.append("text")
    .attr("x", width/2)
    .attr("y", height+0.7*margin.bottom)
    .text("Satellite Dot Distribution Map")
    .attr("fill", "white")
    .attr("font-size", winwidth * 0.02)
    .attr('alignment-baseline', 'center')
    .attr("text-anchor", "middle")
    svg.append("text")
    .attr("id", "stack_title")
    .attr("x", winwidth/8*6.5)
    .attr("y", height+0.7*margin.bottom)
    .text("")
    .attr("fill", "white")
    .attr("font-size", winwidth * 0.0135)
    .attr('alignment-baseline', 'center')
    .attr("text-anchor", "middle")
    svg.append('g')
    .attr('class', 'x axis')
    svg.append('g')
    .attr('class', 'y axis')
    var earth_radius = 6400;
    var low_earth_radius = 2000;
    var medium_earth_radius = 25000;
    var geosynchronous_radius = 40000;
    var country_list = ["United States", "China", "Russia", "Japan", "Others"];
    var purpose_list = ["Communications", "Earth Observation", "Technology Development", "Navigation/Global Positioning", "Space Science", "Others"];
    var user_list = ["Commercial", "Government", "Military", "Civil", "Multiple"];
    var orbit_list =  ["Low Earth", "Medium Earth", "Geosynchronous", "Elliptical"];

    var radius_scale_earth = d3.scaleLinear().domain([0,earth_radius]).range([0,height]);
    var radius_reverse_earth = d3.scaleLinear().range([0,earth_radius]).domain([0,height]);
    var radius_scale_leo = d3.scaleLinear().domain([0,low_earth_radius+earth_radius]).range([0,height]);
    var radius_scale_meo = d3.scaleLinear().domain([0,medium_earth_radius+earth_radius]).range([0,height]);
    var radius_scale_geo = d3.scaleLinear().domain([0,geosynchronous_radius+earth_radius]).range([0,height]);
    var radius_reverse_geo = d3.scaleLinear().range([0,geosynchronous_radius+earth_radius]).domain([0,height]);
    svg.append('g')
    .attr("class", "altitude")
    .attr("transform", "translate(" + (width/2) + ",0)")
    .call(d3.axisRight(radius_scale_geo))
    svg.selectAll(".altitude .tick text")
    .text(function(d,i){
        return +d-6400 + "KM";
    })
    .attr("font-size", winwidth * 0.0115)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    svg.select(".altitude .domain")
    .attr("stroke", "none")
    svg.selectAll(".altitude .tick line")
    .attr("stroke", "none")


    var color_scale_country = d3.scaleOrdinal(d3.schemeCategory10);
    var color_scale_purpose = d3.scaleOrdinal(d3.schemeCategory10);
    var color_scale_user = d3.scaleOrdinal(d3.schemeCategory10);
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

    function country_number(country){
      if (country == "USA") 
        {return 0}
      else if (country == "China")
        {return 1}
      else if (country == "Russia")
        {return 2}
      else if (country == "Japan")
        {return 3}
      else
        {return 4}
    }
    function purpose_number(purpose){
      if (purpose == purpose_list[0]) 
        {return 0}
      else if (purpose == purpose_list[1])
        {return 1}
      else if (purpose == purpose_list[2])
        {return 2}
      else if (purpose == purpose_list[3])
        {return 3}
      else if (purpose == purpose_list[4])
        {return 4}
      else
        {return 5}
    }
    function user_number(user){
      if (user == user_list[0]) 
        {return 0}
      else if (user == user_list[1])
        {return 1}
      else if (user == user_list[2])
        {return 2}
      else if (user == user_list[3])
        {return 3}
      else
        {return 4}
    }

    svg.append("image")
    .attr("class", "earth")
    .attr("xlink:href", "src/assets/earth.svg")
    .attr("x", width/2 - radius_scale_earth(6400))
    .attr("y", -radius_scale_earth(6400))
    .attr("width", radius_scale_earth(6400)*2)
    .attr("height", radius_scale_earth(6400)*2)
    .transition()
    .delay(500)
    .duration(2000)
    .attr("x", width/2 - radius_scale_geo(6400))
    .attr("y", -radius_scale_geo(6400))
    .attr("width", radius_scale_geo(6400)*2)
    .attr("height", radius_scale_geo(6400)*2)

    svg.append("circle") //LEO, 187 - 1498 km, (187+1498)/2 = 936, 1498-187 = 1311
    .attr("id", "leo")
    .attr("cx", width/2)
    .attr("r", radius_scale_earth(6400+936))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", radius_scale_geo(1311))
    .transition()
    .delay(500)
    .duration(2000)
    .attr("r", radius_scale_geo(6400+936))

    var arc2 = d3.arc()  // MEO: 7815-23551km
    .outerRadius(radius_scale_earth(6400+7815))
    .innerRadius(radius_scale_earth(6400+23551))
    .startAngle(Math.PI * 0.5)
    .endAngle(Math.PI*1.5);

    var meo = svg.append("g")
    .attr("transform", "translate(" + (width / 2) + "," +0 + ")")
    .append("path")
    .attr("id", "meo")
    .attr("d",arc2)

    arc2.outerRadius(radius_scale_geo(6400+7815))
    .innerRadius(radius_scale_geo(6400+23551))
    .startAngle(Math.PI * 0.5)
    .endAngle(Math.PI*1.5);

    meo.transition()
    .delay(500)
    .duration(2000)
    .attr("d", arc2);

    svg.append("circle") //GEO: 32618-37782 km, (37782+32618)/2 = 35200, 37782-32618=5162
    .attr("id", "geo")
    .attr("cx", width/2)
    .attr("cy", 0)
    .attr("r", radius_scale_earth(6400+35200))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", radius_scale_geo(5162))
    .transition()
    .delay(500)
    .duration(2000)
    .attr("r", radius_scale_geo(6400+35200))
    var count_g = svg.append("g")
    .attr("transform", "translate(" + (width / 2) + "," +0 + ")")

    count_g.append("text")
    .attr("id", "leo_count")
    .attr("class", "orbit_count")
    .attr("radius", earth_radius+1700)
    .attr("x", function(){
      return radius_scale_earth(+d3.select(this).attr("radius"))
    })
    .attr('alignment-baseline', 'hanging')
    .text("←Number:1186")
    .attr("font-size", winwidth * 0.0115)
    .transition()
    .delay(500)
    .duration(2000)
    .attr("x", function(){
      return radius_scale_geo(+d3.select(this).attr("radius"))
    })

    count_g.append("text")
    .attr("id", "meo_count")
    .attr("class", "orbit_count")
    .attr("radius", earth_radius+24000)
    .attr("x", function(){
      return radius_scale_earth(+d3.select(this).attr("radius"))
    })
    .attr('alignment-baseline', 'hanging')
    .text("←Number:112")
    .attr("font-size", winwidth * 0.0115)
    .transition()
    .delay(500)
    .duration(2000)
    .attr("x", function(){
      return radius_scale_geo(+d3.select(this).attr("radius"))
    })
    count_g.append("text")
    .attr("id", "geo_count")
    .attr("class", "orbit_count")
    .attr("radius", earth_radius+38000)
    .attr("x", function(){
      return radius_scale_earth(+d3.select(this).attr("radius"))
    })
    .attr('alignment-baseline', 'hanging')
    .text("←Number:548")
    .attr("font-size", winwidth * 0.0115)
    .transition()
    .delay(500)
    .duration(2000)
    .attr("x", function(){
      return radius_scale_geo(+d3.select(this).attr("radius"))
    })
    count_g.selectAll(".orbit_count")
    .attr("fill", "white")


    d3.csv("src/assets/full_data.csv").then(function(data){
      svg.selectAll(".satellites")
      .data(data)
      .enter()
      .append("circle")
      .attr("class","satellites")
      .attr("transform", "translate(" + (width / 2) + "," +0 + ")")
      .attr("r", function(){
        if (winwidth>720){
          return 3;
        }
        else{
          return 1.5;
        }
      })
      .attr("fill", "gold")
      .attr("saved_x", function(d:any){
        return (6400 + +d.Perigee) * Math.cos(Math.random()* Math.PI);
      })
      .attr("saved_y", function(d:any){
        return Math.sqrt(Math.pow((6400 + +d.Perigee),2) - Math.pow(+d3.select(this).attr("saved_x"), 2));;
      })
      .attr("cx", function(d:any){
        return radius_scale_earth(+d3.select(this).attr("saved_x"));
      })
      .attr("cy", function(d:any){
        return radius_scale_earth(+d3.select(this).attr("saved_y"));
      })
      .attr("id", function(d:any){
        return d["Class of Orbit"]
      })
      .attr("opacity", 0.6)
      .transition()
      .delay(500)
      .duration(2000)
      .attr("cx", function(d:any){
        return radius_scale_geo(+d3.select(this).attr("saved_x"));
      })
      .attr("cy", function(d:any){
        return radius_scale_geo(+d3.select(this).attr("saved_y"));
      })

      d3.select("#show_low")
      .on("click", function(){
        orbit_flag = "leo";
        d3.selectAll("#chooseorbit").text("Low Earth Orbit");
        svg.select(".altitude")
        .transition()
        .delay(500)
        .duration(2000)
        .call(<any>d3.axisRight(radius_scale_leo))
        svg.selectAll(".altitude .tick text")
        .transition()
        .delay(501)
        .duration(2000)
        .attr("text-anchor", "middle")
        .text(function(d,i){
            return +d-6400 + "KM";
        })
        .attr("font-size", winwidth*0.0135)
        .attr("fill", "white")
        .attr("dy", 10)
        svg.select(".altitude .domain")
        .attr("stroke", "none")
        svg.selectAll(".altitude .tick line")
        .attr("stroke", "none")

        svg.selectAll(".orbit_count")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", function(){
          return radius_scale_leo(+d3.select(this).attr("radius"))
        })

        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("id", function(d:any){
          return +d3.select(this).attr("cx");
        })
        .attr("cx", function(d:any){
          return radius_scale_leo(+d3.select(this).attr(flag?"saved_x2":"saved_x"));
        })
        .attr("cy", function(d:any){
          return radius_scale_leo(+d3.select(this).attr(flag?"saved_y2":"saved_y"));
        })
        .attr("opacity", function(d, i){
          if(d["Class of Orbit"] == "LEO"){
            return 0.85;
          }
          else{
            return 0.2;
          }
        })

        svg.selectAll(".earth")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", width/2 - radius_scale_leo(6400))
        .attr("y", -radius_scale_leo(6400))
        .attr("width", radius_scale_leo(6400)*2)
        .attr("height", radius_scale_leo(6400)*2)

        svg.select("#leo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("stroke-width", radius_scale_leo(1311))
        .attr("r", radius_scale_leo(6400+936))
        .attr("opacity", 1)

        arc2.outerRadius(radius_scale_leo(6400+7815))
        .innerRadius(radius_scale_leo(6400+23551))
        

        svg.select("#meo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("d", arc2)
        .attr("opacity", 0.5)

  
        svg.select("#geo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("r", radius_scale_leo(6400+35200))
        .attr("opacity", 0.5)
      })

      d3.select("#show_medium")
      .on("click", function(){
        orbit_flag = "meo";
        d3.selectAll("#chooseorbit").text("Medium Earth Orbit");

        svg.select(".altitude")
        .transition()
        .delay(500)
        .duration(2000)
        .call(<any>d3.axisRight(radius_scale_meo))
        svg.selectAll(".altitude .tick text")
        .transition()
        .delay(501)
        .duration(2000)
        .attr("text-anchor", "middle")
        .text(function(d,i){
            return +d-6400 + "KM";
        })
        .attr("font-size", winwidth*0.0135)
        .attr("fill", "white")

        svg.select(".altitude .domain")
        .attr("stroke", "none")
        svg.selectAll(".altitude .tick line")
        .attr("stroke", "none")
        
        svg.selectAll(".orbit_count")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", function(){
          return radius_scale_meo(+d3.select(this).attr("radius"))
        })

        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("id", function(d:any){
          return +d3.select(this).attr("cx");
        })
        .attr("cx", function(d:any){
          return radius_scale_meo(+d3.select(this).attr(flag?"saved_x2":"saved_x"));
        })
        .attr("cy", function(d:any){
          return radius_scale_meo(+d3.select(this).attr(flag?"saved_y2":"saved_y"));
        })
        .attr("opacity", function(d, i){
          if(d["Class of Orbit"] == "MEO"){
            return 1;
          }
          else{
            return 0.2;
          }
        })


        svg.selectAll(".earth")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", width/2 - radius_scale_meo(6400))
        .attr("y", -radius_scale_meo(6400))
        .attr("width", radius_scale_meo(6400)*2)
        .attr("height", radius_scale_meo(6400)*2)

        svg.select("#leo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("stroke-width", radius_scale_meo(1311))
        .attr("r", radius_scale_meo(6400+936))
        .attr("opacity", 0.5)

        arc2.outerRadius(radius_scale_meo(6400+7815))
        .innerRadius(radius_scale_meo(6400+23551))

        svg.select("#meo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("d", arc2)
        .attr("opacity", 1)

  
        svg.select("#geo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("r", radius_scale_meo(6400+35200))
        .attr("opacity", 0.5)
      })

      d3.select("#show_g")
      .on("click", function(){
        orbit_flag = "geo";
        d3.selectAll("#chooseorbit").text("Geosynchronous Orbit");

        svg.select(".altitude")
        .transition()
        .delay(500)
        .duration(2000)
        .call(<any>d3.axisRight(radius_scale_geo))
        svg.selectAll(".altitude .tick text")
        .transition()
        .delay(501)
        .duration(2000)
        .attr("text-anchor", "middle")
        .text(function(d,i){
            return +d-6400 + "KM";
        })
        .attr("font-size", winwidth*0.0135)
        .attr("fill", "white")

        svg.select(".altitude .domain")
        .attr("stroke", "none")
        svg.selectAll(".altitude .tick line")
        .attr("stroke", "none")
        
        svg.selectAll(".orbit_count")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", function(){
          return radius_scale_geo(+d3.select(this).attr("radius"))
        })

        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("id", function(d:any){
          return +d3.select(this).attr("cx");
        })
        .attr("cx", function(d:any){
          return radius_scale_geo(+d3.select(this).attr(flag?"saved_x2":"saved_x"));
        })
        .attr("cy", function(d:any){
          return radius_scale_geo(+d3.select(this).attr(flag?"saved_y2":"saved_y"));
        })
        .attr("opacity", function(d, i){
          if(d["Class of Orbit"] == "GEO"){
            return 0.85;
          }
          else{
            return 0.2;
          }
        })


        svg.selectAll(".earth")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", width/2 - radius_scale_geo(6400))
        .attr("y", -radius_scale_geo(6400))
        .attr("width", radius_scale_geo(6400)*2)
        .attr("height", radius_scale_geo(6400)*2)

        svg.select("#leo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("stroke-width", radius_scale_geo(1311))
        .attr("r", radius_scale_geo(6400+936))
        .attr("opacity", 0.5)

        arc2.outerRadius(radius_scale_geo(6400+7815))
        .innerRadius(radius_scale_geo(6400+23551))

        svg.select("#meo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("d", arc2)
        .attr("opacity", 0.5)

  
        svg.select("#geo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("r", radius_scale_geo(6400+35200))
        .attr("opacity", 1)
      })

      d3.select("#second_by_country")
      .on("click", function(){

        d3.select("#colorby").text("Color by Owner")
        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(1000)
        .attr("fill", function(d,i):any{
          return color_scale_country(""+country_number(d["Country of Operator/Owner"]))
        })
        d3.select("#donut")
        .attr("class", "btn btn-info")

        svg.selectAll(".legend_circles")
        .data(country_list)
        .enter()
        .append("circle")
        .attr("class", "legend_circles")
        .attr("cx", width+width)
        .attr("cy", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("r", function(){
          if (winwidth > 700){
            return 5;
          }
          else{
            return 2.5;
          }
        })
        .attr("fill", function(d,i){
          return color_scale_country(""+i);
        })
        svg.selectAll(".legend_labels")
        .data(country_list)
        .enter()
        .append("text")
        .attr("class", "legend_labels")
        .attr("x", width+width)
        .attr("y", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("fill", function(d,i){
          return color_scale_country(""+i);
        })
        .attr('alignment-baseline', 'middle')
        .attr("font-size", winwidth * 0.0125)
        .text(function(d){
          return d;
        })
        svg.selectAll(".legend_circles")
        .data(country_list)
        .exit()
        .transition()
        .delay(300)
        .duration(1300)
        .attr("cx", width+width)
        .remove()
        svg.selectAll(".legend_labels")
        .data(country_list)
        .exit()
        .transition()
        .delay(300)
        .duration(1300)
        .attr("x", width+width)
        .remove()
        svg.selectAll(".legend_circles")
        .data(country_list)
        .transition()
        .delay(300)
        .duration(1500)
        .attr("cx", winwidth*0.9125)
        .attr("fill", function(d,i){
          return color_scale_country(""+i);
        })
        svg.selectAll(".legend_labels")
        .data(country_list)
        .transition()
        .delay(300)
        .duration(1500)
        .attr("x", winwidth*0.916)
        .attr("fill", function(d,i){
          return color_scale_country(""+i);
        })
        .attr("font-size", winwidth * 0.0125)
        .text(function(d, i){
          return d;
        })

        svg.selectAll(".legend_circles")
        .on("mouseover", function(dd,ii){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(d,i){
            if (+country_number(d["Country of Operator/Owner"]) != ii){
              return "none";
            }
            else{
              return color_scale_country(""+ii);
            }
          })
        })
        .on("mouseout", function(d,i){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(dd,ii):any{
            return color_scale_country(""+country_number(dd["Country of Operator/Owner"]))
          })
        })        
        svg.selectAll(".legend_labels")
        .on("mouseover", function(dd,ii){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(d,i){
            if (+country_number(d["Country of Operator/Owner"]) != ii){
              return "none";
            }
            else{
              return color_scale_country(""+ii);
            }
          })
        })
        .on("mouseout", function(d,i){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(dd,ii):any{
            return color_scale_country(""+country_number(dd["Country of Operator/Owner"]))
          })
        })

        d3.csv("src/assets/stacked_country.csv").then(function(dataset:any){
          var stack = d3.stack().keys(["USA", "China", "Russia", "Japan", "Others"]);
          var series = stack(dataset);
          var xScale = d3.scaleBand()
          .domain(<any>d3.range(<any>dataset.length))
          .range([winwidth*0.95, winwidth*0.7])
          .paddingInner(0.1)
          var yScale = d3.scaleLinear()
          .domain([0,    
              d3.max(dataset, function(d) {
                  return +d["USA"] + +d["China"] +  +d["Russia"] + +d["Japan"] + +d["Others"];
              })
          ]).range([height/2, 0])
          svg.selectAll(".stack_g2,.stack_g3")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("transform", "translate(" + 2*winwidth / 8 * 7.1 + "," + 0 + ")")
          .remove()
          svg.select("#stack_title")
          .text("Owner Distribution on Different Orbits")
          var groups = svg.selectAll(".stack_g")
              .data(series)
              .enter()
              .append("g")
              .attr("class", "stack_g")
              .style("fill", function(d, i) {
                  return color_scale_country(""+i);
              });
      
          // Add a rect for each data value
          var rects = groups.selectAll("rect")
              .data(function(d) { 
                  return d; 
              })
              .enter()
              .append("rect")
              .attr("x", function(d, i) {
                  return xScale(""+i)+width;
              })
              .attr("y", function(d) {
                  return height* 1/2 - margin.bottom + yScale(d[1]);
              })
              .attr("height", function(d) {
                  return yScale(d[0]) - yScale(d[1]);
              })
              .attr("width", xScale.bandwidth());
          groups.selectAll("rect")
          .transition()
          .delay(501)
          .duration(2000)
          .attr("x", function(d, i) {
            return xScale(""+i);
          })
          svg.select(".x.axis")
              .attr("transform", "translate(0," + (height- margin.bottom) + ")")
              .call(d3.axisBottom(xScale))
          svg.selectAll(".x.axis .tick text")
          .text(function(d,i){
              return orbit_list[i];
          })
          .attr("fill", "white")
          .attr("font-size", winwidth * 0.008)
          svg.select(".y.axis")
              .attr("transform", "translate(" + winwidth*0.95 + "," + (height*1/2 - margin.bottom) + ")")
              .call(d3.axisRight(yScale))
          svg.selectAll(".y.axis .tick text")
          .attr("fill", "white")
          svg.selectAll(".axis path")
          .attr("stroke", "white")
          svg.selectAll(".axis line")
          .attr("stroke", "white")

          svg.selectAll(".stack_g rect")
          .on("mouseover",function(d:any, i){
            var mousePos = d3.mouse(divNode);
            var tooltip = d3.select("#tooltip")
          .style("left", mousePos[0] - 200 + "px")
          .style("top", mousePos[1] - 100 + "px");
          tooltip.select("#cate_key")
          .text("Country: ");
          tooltip.select("#cate_value")
          .text(function(){
            return country_list[Math.floor(i/4)];
          })
          tooltip.select("#value_value")
          .text(function(){
            return d[1]-d[0];
          })
          tooltip.select("#ratio_value")
          .text(function(){
            return ((d[1]-d[0])/(+d.data["USA"] + +d.data["China"] +  +d.data["Russia"] + +d.data["Japan"] + +d.data["Others"])*100).toFixed(2) + "%";
          })
          //Show the tooltip
          d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function(d:any){
          //Hide the tooltip
          d3.select("#tooltip").classed("hidden", true);
        })
      
      })

      })

      d3.select("#second_by_purpose")
      .on("click", function(){
        d3.select("#colorby").text("Color by Purpose")
        d3.select("#donut")
        .attr("class", "btn btn-info disabled")
        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(1000)
        .attr("fill", function(d,i):any{
          return color_scale_purpose(""+purpose_number(d["Purpose"]))
        })
        svg.selectAll(".legend_circles")
        .data(purpose_list)
        .enter()
        .append("circle")
        .attr("class", "legend_circles")
        .attr("cx", width+width)
        .attr("cy", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("r", 5)
        .attr("fill", function(d,i){
          return "black";
        })
        svg.selectAll(".legend_labels")
        .data(purpose_list)
        .enter()
        .append("text")
        .attr("class", "legend_labels")
        .attr("x", width+width)
        .attr("y", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("fill", function(d,i){
          return "black";
        })
        .attr('alignment-baseline', 'middle')
        .attr("font-size", winwidth * 0.0125)
        .text(function(d){
          return "";
        })
        svg.selectAll(".legend_circles")
        .data(purpose_list)
        .transition()
        .delay(300)
        .duration(1400)
        .attr("cx", winwidth*0.9125)
        .attr("cy", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("r", 5)
        .attr("fill", function(d,i){
          return color_scale_purpose(""+i);
        })

        svg.selectAll(".legend_circles")
        .on("mouseover", function(dd,ii){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(d,i){
            if (+purpose_number(d["Purpose"]) != ii){
              return "none";
            }
            else{
              return color_scale_purpose(""+ii);
            }
          })
        })
        .on("mouseout", function(d,i){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(dd,ii):any{
            return color_scale_purpose(""+purpose_number(dd["Purpose"]))
          })
        })
        svg.selectAll(".legend_labels")
        .data(purpose_list)
        .transition()
        .delay(300)
        .duration(1500)
        .attr("x", winwidth*0.916)
        .attr("y", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("fill", function(d,i){
          return color_scale_purpose(""+i);
        })
        .attr('alignment-baseline', 'middle')
        .attr("font-size", winwidth * 0.0125)
        .text(function(d){
          return d;
        })
        svg.selectAll(".legend_labels")
        .on("mouseover", function(dd,ii){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(d,i){
            if (+purpose_number(d["Purpose"]) != ii){
              return "none";
            }
            else{
              return color_scale_purpose(""+ii);
            }
          })
        })
        .on("mouseout", function(d,i){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(dd,ii):any{
            return color_scale_purpose(""+purpose_number(dd["Purpose"]))
          })
        })

        d3.csv("src/assets/stacked_purpose.csv").then(function(dataset:any){
          var stack = d3.stack().keys(purpose_list);
          var series = stack(dataset);
          var xScale = d3.scaleBand()
          .domain(<any>d3.range(<any>dataset.length))
          .range([winwidth*0.95, winwidth*0.7])
          .paddingInner(0.1)
          var yScale = d3.scaleLinear()
          .domain([0,    
              d3.max(dataset, function(d) {
                  return +d["Communications"] + +d["Earth Observation"] +  +d["Technology Development"] + +d["Navigation/Global Positioning"] + +d["Space Science"]+ +d["Others"];
              })
          ]).range([height/2, 0])
          svg.select("#stack_title")
          .text("Purpose Distribution on Different Orbits")
          svg.selectAll(".stack_g,.stack_g3")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("transform", "translate(" + 2*winwidth / 8 * 7.1 + "," + 0 + ")")
          .remove()
          var groups = svg.selectAll(".stack_g2")
              .data(series)
              .enter()
              .append("g")
              .attr("class", "stack_g2")
              .style("fill", function(d, i) {
                  return color_scale_purpose(""+i);
              });
      
          // Add a rect for each data value
          var rects = groups.selectAll("rect")
              .data(function(d) { 
                  return d; 
              })
              .enter()
              .append("rect")
              .attr("x", function(d, i) {
                  return xScale(""+i)+width;
              })
              .attr("y", function(d) {
                  return height*0.5 - margin.bottom + yScale(d[1]);
              })
              .attr("height", function(d) {
                  return yScale(d[0]) - yScale(d[1]);
              })
              .attr("width", xScale.bandwidth());
          groups.selectAll("rect")
              .transition()
              .delay(501)
              .duration(2000)
              .attr("x", function(d, i) {
                return xScale(""+i);
              })
          svg.select(".x.axis")
              .attr("transform", "translate(0," + (height- margin.bottom) + ")")
              .call(d3.axisBottom(xScale))
          svg.selectAll(".x.axis .tick text")
          .text(function(d,i){
              return orbit_list[i];
          })
          .attr("fill", "white")
          .attr("font-size", winwidth * 0.008)
          svg.select(".y.axis")
              .attr("transform", "translate(" + winwidth*0.95 + "," + (height*0.5- margin.bottom) + ")")
              .call(d3.axisRight(yScale))
          svg.selectAll(".y.axis .tick text")
          .attr("fill", "white")
          svg.selectAll(".axis path")
          .attr("stroke", "white")
          svg.selectAll(".axis line")
          .attr("stroke", "white")

          svg.selectAll(".stack_g2 rect")
          .on("mouseover",function(d:any,i){
            var mousePos = d3.mouse(divNode);
            var tooltip = d3.select("#tooltip")
            .style("left", mousePos[0] - 200 + "px")
            .style("top", mousePos[1] - 100 + "px");
            tooltip.select("#cate_key")
            .text("Purpose: ");
            tooltip.select("#cate_value")
            .text(function(){
              return purpose_list[Math.floor(i/4)];
            })
            tooltip.select("#value_value")
            .text(function(){
              return d[1]-d[0];
            })
            tooltip.select("#ratio_value")
            .text(function(){
              return ((d[1]-d[0])/(+d.data["Communications"] + +d.data["Earth Observation"] +  +d.data["Technology Development"] + +d.data["Navigation/Global Positioning"] + +d.data["Space Science"]+ +d.data["Others"])*100).toFixed(2) + "%";
            })
            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
          })
          .on("mouseout", function(d:any){
            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);
          })
      
      })


      })

      d3.select("#second_by_user")
      .on("click", function(){
        d3.select("#colorby").text("Color by User")
        d3.select("#donut")
        .attr("class", "btn btn-info disabled")
        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(1000)
        .attr("fill", function(d,i):any{
          return color_scale_user(""+user_number(d["Users"]))
        })
        
        svg.selectAll(".legend_circles")
        .data(user_list)
        .enter()
        .append("circle")
        .attr("class", "legend_circles")
        .attr("cx", width+width)
        .attr("cy", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("r", 5)
        .attr("fill", function(d,i){
          return color_scale_user(""+i);
        })
        svg.selectAll(".legend_labels")
        .data(user_list)
        .enter()
        .append("text")
        .attr("class", "legend_labels")
        .attr("x", width+width)
        .attr("y", function(d,i){
          return i*label_padding+label_padding;
        })
        .attr("fill", function(d,i){
          return color_scale_user(""+i);
        })
        .attr('alignment-baseline', 'middle')
        .attr("font-size", winwidth * 0.0125)
        .text(function(d){
          return d;
        })
        svg.selectAll(".legend_circles")
        .data(user_list)
        .exit()
        .transition()
        .delay(300)
        .duration(1300)
        .attr("cx", width+width)
        .remove()
        svg.selectAll(".legend_labels")
        .data(user_list)
        .exit()
        .transition()
        .delay(300)
        .duration(1300)
        .attr("x", width+width)
        .remove()
        svg.selectAll(".legend_circles")
        .data(user_list)
        .transition()
        .delay(300)
        .duration(1500)
        .attr("cx", winwidth*0.9125)
        .attr("fill", function(d,i){
          return color_scale_user(""+i);
        })
        svg.selectAll(".legend_labels")
        .data(user_list)
        .transition()
        .delay(300)
        .duration(1500)
        .attr("x", winwidth*0.916)
        .attr("fill", function(d,i){
          return color_scale_user(""+i);
        })
        .attr("font-size", winwidth * 0.0125)
        .text(function(d, i){
          return d;
        })

        svg.selectAll(".legend_circles")
        .on("mouseover", function(dd,ii){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(d,i){
            if (+user_number(d["Users"]) != ii){
              return "none";
            }
            else{
              return color_scale_user(""+ii);
            }
          })
        })
        .on("mouseout", function(d,i){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(dd,ii):any{
            return color_scale_user(""+user_number(dd["Users"]))
          })
        })        
        svg.selectAll(".legend_labels")
        .on("mouseover", function(dd,ii){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(d,i){
            if (+user_number(d["Users"]) != ii){
              return "none";
            }
            else{
              return color_scale_user(""+ii);
            }
          })
        })
        .on("mouseout", function(d,i){
          d3.selectAll(".satellites")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("fill", function(dd,ii):any{
            return color_scale_user(""+user_number(dd["Users"]))
          })
        })

        d3.csv("src/assets/stacked_user.csv").then(function(dataset:any){
          var stack = d3.stack().keys(user_list);
          var series = stack(dataset);
          var xScale = d3.scaleBand()
          .domain(<any>d3.range(<any>dataset.length))
          .range([winwidth*0.95, winwidth*0.7])
          .paddingInner(0.1)
          var yScale = d3.scaleLinear()
          .domain([0,    
              d3.max(dataset, function(d) {
                  return +d["Commercial"] + +d["Government"] +  +d["Military"] + +d["Civil"] + +d["Multiple"];
              })
          ]).range([height/2, 0])
          svg.select("#stack_title")
          .text("Owner Distribution on Different Orbits")          
          svg.selectAll(".stack_g,.stack_g2")
          .transition()
          .delay(500)
          .duration(2000)
          .attr("transform", "translate(" + 2*winwidth / 8 * 7.1 + "," + 0 + ")")
          .remove()

          var groups = svg.selectAll(".stack_g3")
              .data(series)
              .enter()
              .append("g")
              .attr("class", "stack_g3")
              .style("fill", function(d, i) {
                  return color_scale_user(""+i);
              });
      
          // Add a rect for each data value
          var rects = groups.selectAll("rect")
              .data(function(d) { 
                  return d; 
              })
              .enter()
              .append("rect")
              .attr("x", function(d, i) {
                  return xScale(""+i)+width;
              })
              .attr("y", function(d) {
                  return height*0.5 - margin.bottom + yScale(d[1]);
              })
              .attr("height", function(d) {
                  return yScale(d[0]) - yScale(d[1]);
              })
              .attr("width", xScale.bandwidth());
          groups.selectAll("rect")
              .transition()
              .delay(501)
              .duration(2000)
              .attr("x", function(d, i) {
                return xScale(""+i);
              })
          svg.select(".x.axis")
              .attr("transform", "translate(0," + (height- margin.bottom) + ")")
              .call(d3.axisBottom(xScale))
          svg.selectAll(".x.axis .tick text")
          .text(function(d,i){
              return orbit_list[i];
          })
          .attr("fill", "white")
          .attr("font-size", winwidth * 0.008)
          svg.select(".y.axis")
              .attr("transform", "translate(" + winwidth*0.95 + "," + (height*0.5 - margin.bottom)+ ")")
              .call(d3.axisRight(yScale))
          svg.selectAll(".y.axis .tick text")
          .attr("fill", "white")
          svg.selectAll(".axis path")
          .attr("stroke", "white")
          svg.selectAll(".axis line")
          .attr("stroke", "white")

          svg.selectAll(".stack_g3 rect")
          .on("mouseover",function(d:any, i){
            var mousePos = d3.mouse(divNode);
            var tooltip = d3.select("#tooltip")
            .style("left", mousePos[0] - 200 + "px")
            .style("top", mousePos[1] - 100 + "px");
            tooltip.select("#cate_key")
            .text("User: ");
            tooltip.select("#cate_value")
            .text(function(){
              return user_list[Math.floor(i/4)];
            })
            tooltip.select("#value_value")
            .text(function(){
              return d[1]-d[0];
            })
            tooltip.select("#ratio_value")
            .text(function(){
              return ((d[1]-d[0])/(+d.data["Commercial"] + +d.data["Government"] +  +d.data["Military"] + +d.data["Civil"] + +d.data["Multiple"])*100).toFixed(2) + "%";
            })

            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
          })
          .on("mouseout", function(d:any){
            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);
          })
      
      })
      })

      d3.select("#donut")
      .on("click", function(){
        if (d3.select(this).attr("class") == "btn btn-info disabled") return;
        flag = 1;
        svg.selectAll(".satellites")
        .attr("saved_x2", function(d:any){
          var xrange = Math.random();
          if(d["Country of Operator/Owner"] == "USA"){
            if(+d["Perigee"] <= 1500){
              xrange = Math.random() * 0.51;
            }
            else if (+d["Perigee"] > 7815 && +d["Perigee"] <= 23551){
              xrange = Math.random() * 0.28;
            }
            else if (+d["Perigee"] > 32618 && +d["Perigee"] <= 37782){
              xrange = Math.random() * 0.36;
            }
          }
          else if(d["Country of Operator/Owner"] == "Russia"){
            if(+d["Perigee"] <= 1500){
              xrange = Math.random() * 0.07 + 0.51;
            }
            else if (+d["Perigee"] > 7815 && +d["Perigee"] <= 23551){
              xrange = Math.random() * 0.26 + 0.28;
            }
            else if (+d["Perigee"] > 32618 && +d["Perigee"] <= 37782){
              xrange = Math.random() * 0.05 + 0.36;
            }
          }
          else if(d["Country of Operator/Owner"] == "China"){
            if(+d["Perigee"] <= 1500){
              xrange = Math.random() * 0.16 + 0.58;
            }
            else if (+d["Perigee"] > 7815 && +d["Perigee"] <= 23551){
              xrange = Math.random() * 0.13 + 0.54;
            }
            else if (+d["Perigee"] > 32618 && +d["Perigee"] <= 37782){
              xrange = Math.random() * 0.09 + 0.41;
            }
          }
          else if(d["Country of Operator/Owner"] == "Japan"){
            if(+d["Perigee"] <= 1500){
              xrange = Math.random() * 0.03 + 0.74;
            }
            else if (+d["Perigee"] > 7815 && +d["Perigee"] <= 23551){
              xrange = Math.random() * 0 + 0.67;
            }
            else if (+d["Perigee"] > 32618 && +d["Perigee"] <= 37782){
              xrange = Math.random() * 0.05 + 0.5;
            }
          }
          else{
            if(+d["Perigee"] <= 1500){
              xrange = Math.random() * 0.23 + 0.77;
            }
            else if (+d["Perigee"] > 7815 && +d["Perigee"] <= 23551){
              xrange = Math.random() * 0.34 + 0.66;
            }
            else if (+d["Perigee"] > 32618 && +d["Perigee"] <= 37782){
              xrange = Math.random() * 0.43 + 0.57;
            }
          }
          return (6400 + +d.Perigee) * Math.cos(xrange * Math.PI);
        })
        .attr("saved_y2", function(d:any){
          return Math.sqrt(Math.pow((6400 + +d.Perigee),2) - Math.pow(+d3.select(this).attr("saved_x2"), 2));;
        })
        .attr("id", function(d,i){
          return d["Country of Operator/Owner"]  +"," +d["Class of Orbit"];
        })
        var r_s;
        if(orbit_flag == "leo"){
          r_s = radius_scale_leo;
        }
        else if(orbit_flag == "meo"){
          r_s = radius_scale_meo;
        }
        else if(orbit_flag == "geo"){
          r_s = radius_scale_geo;
        }
        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(1000)
        .attr("cx", function(d:any){
          return r_s(+d3.select(this).attr("saved_x2"));
        })
        .attr("cy", function(d:any){
          return r_s(+d3.select(this).attr("saved_y2"));
        })
      })

      d3.select("#reset")
      .on("click", function(){
        flag = 0;
        orbit_flag = "geo";
        d3.select("#chooseorbit").text("Choose Orbit")
        d3.select("#donut")
        .attr("class", "btn btn-info disabled")
        d3.select("#colorby").text("Color By")

        svg.select(".altitude")
        .transition()
        .delay(500)
        .duration(2000)
        .call(<any>d3.axisRight(radius_scale_geo))
        svg.selectAll(".altitude .tick text")
        .transition()
        .delay(501)
        .duration(2000)
        .attr("text-anchor", "middle")
        .text(function(d,i){
            return +d-6400 + "KM";
        })
        .attr("font-size", winwidth * 0.0135)
        .attr("fill", "white")

        svg.select(".altitude .domain")
        .attr("stroke", "none")
        svg.selectAll(".altitude .tick line")
        .attr("stroke", "none")
        svg.selectAll(".orbit_count")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", function(){
          return radius_scale_geo(+d3.select(this).attr("radius"))
        })

        svg.selectAll(".satellites")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("fill", "gold")
        .attr("cx", function(d:any){
          return radius_scale_geo(+d3.select(this).attr("saved_x"));
        })
        .attr("cy", function(d:any){
          return radius_scale_geo(+d3.select(this).attr("saved_y"));
        })
        .attr("opacity", 0.6)

        svg.selectAll(".earth")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", width/2 - radius_scale_geo(6400))
        .attr("y", -radius_scale_geo(6400))
        .attr("width", radius_scale_geo(6400)*2)
        .attr("height", radius_scale_geo(6400)*2)

        svg.select("#leo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("stroke-width", radius_scale_geo(1311))
        .attr("r", radius_scale_geo(6400+936))
        .attr("opacity", 1)

        arc2.outerRadius(radius_scale_geo(6400+7815))
        .innerRadius(radius_scale_geo(6400+23551))

        svg.select("#meo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("d", arc2)
        .attr("opacity", 1)

        svg.select("#geo")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("r", radius_scale_geo(6400+35200))
        .attr("opacity", 1)

        svg.selectAll(".legend_labels")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("x", width+width)
        .remove()
        svg.selectAll(".legend_circles")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("cx", width+width)
        .remove()

        svg.selectAll(".stack_g,.stack_g2,.stack_g3")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("transform", "translate(" + 2*winwidth / 8 * 7.1 + "," + 0 + ")")
        .remove()
        svg.selectAll(".axis")
        .transition()
        .delay(500)
        .duration(2000)
        .attr("transform", "translate(" + 2*winwidth / 8 * 7.1 + "," + 0 + ")")
        svg.selectAll("#stack_title")
        .transition()
        .delay(500)
        .duration(2000)
        .text("")        
      })
    })
  }
}
