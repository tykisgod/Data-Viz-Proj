import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { color } from 'd3';

export interface valueofone { date: string; value: number }
export interface trade { country: string; trade_2017: number; latitude: number, longtitude: number }

@Component({
  selector: 'app-firstpart',
  templateUrl: './firstpart.component.html',
  styleUrls: ['./firstpart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstpartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createChart();
  }
  ngOnChanges(): void {
    this.createChart();
  }
  onResize() {
    this.createChart();
  }

  private createChart(): void {
    var tooltip_first = d3.select(".tooltip_first");
    var show_launch_site = true;
    var show_country_lauch = true;
    var temp_country_jsonfeatures
    var temp_country_valuearray
    var temp_country_countryArray
    var temp_site_data
    d3.selectAll('input').property('checked', true);
    d3.selectAll(".first").remove()
    var status = 0;
    var svg = d3.select("#worldmap")
      .append("svg")
      .attr("class", "first")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight * 0.7),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    function draw_rect_label() {
      var legend = d3.select(".first")
        .append("g")
        .attr("class", "num_country_legend")
        .attr("width", 140)
        .attr("height", 200)
        .selectAll("g")
        .data([10, 30, 50, 70, 90, 110])
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return "translate(" + (width / 10) + "," + (height / 2 + i * 25) + ")"; });

      legend.append("rect")
        .data([d3.rgb(8, 53, 114), d3.rgb(65, 143, 197), d3.rgb(101, 169, 211), d3.rgb(142, 193, 222), d3.rgb(191, 216, 236), d3.rgb(219, 233, 246)])
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d: any) {
          return d
        });

      legend.append("text")
        .data(['200 or above', '101 to 200', '51 to 100', '21 to 50', '6 to 20', 'Under 5'])
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function (d) { return d; });

    }

    function draw_circle_label() {
      // svg.selectAll('.num_site_legend').remove()
      var legend = d3.select(".first")
        .append("g")
        .attr("class", "num_site_legend")
        .attr("width", 140)
        .attr("height", 200)
        .selectAll("g")
        .data([0, -5, -5, 0, 5, 25])
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return "translate(" + (width * 8 / 10) + "," + (height / 2 + i * 50 - d) + ")"; });

      legend.append("circle")
        .data([25.8, 24, 20, 17, 13, 10])
        .attr("r", function (d) { return d })
        .style("opacity", "0.7")
        .style("fill", 'red');

      legend.append("text")
        .data(['200 or above', '101 to 200', '51 to 100', '21 to 50', '6 to 20', 'Under 5'])
        .attr("x", 30)
        .attr("y", 9)
        .attr('alignment-baseline', 'ideographic')
        .attr("dy", ".35em")
        .text(function (d) { return d; });

    }



    function adapt_site_data(x) {
      if (x > 0) {
        return (Math.log(Math.pow(x, 4) * 100))
      } else {
        return x
      }
    }

    function adapt_country_data(x) {
      if (x > 0) {
        return Math.pow(Math.log(x * 100), 3)
      } else {
        return x
      }
    }

    var gg = svg.append("g")
    var path
    var colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 1500]);
    d3.json("src/assets/world_geojson.json").then(function (json: any) {
      svg.selectAll('.num_site_legend').remove()
      d3.selectAll(".num_country_legend").remove()
      d3.selectAll("#slider").remove()
      var projection = d3.geoMercator().fitSize([width, height * 1.4], json);
      path = d3.geoPath().projection(projection);

      gg.selectAll("path")
        .data(json.features)  //data join with features
        .enter()
        .append("path")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("d", path);  //generate geographic path

      // //这一大段要加到后面的dragmove里面，要用前面的checkbox改变的两个bool参数来判断是否进行这两个映射。这个可以不用函数表示。。就写在外面
      // function slide_for_launch_site() {
      //   d3.json("src/assets/world_geojson.json").then(function (json: any) {
      //     var projection = d3.geoMercator().fitSize([width, height * 1.4], json);
      //   });
      // }

      d3.json("src/assets/num_by_site_data/site_all_in_one_1996.json").then(function (site_num: any) {
        d3.json("src/assets/num_by_site_data/site_long_lat_data.json").then(function (site_long_lat: any) {
          var site_long_lat_data = site_long_lat
          var site_num_data = site_num
          // console.log(site_num_data)
          // console.log(site_long_lat_data)
          var site_data = new Array()
          site_long_lat_data.forEach(site_location_ele => {
            site_num_data.forEach(site_num_ele => {
              if (site_location_ele["site"] == site_num_ele["site"]) {
                var location_array = new Array()
                var single_site_data = new Array()
                location_array.push(site_location_ele["long"], site_location_ele["lat"])
                single_site_data.push(site_location_ele["site"], site_num_ele["num"], location_array)
                site_data.push(single_site_data)
              }
            })
          });

          temp_site_data = site_data
          svg.selectAll(".site_circle")
            .data(site_data)
            .enter()
            .append("circle")
            .attr("class", "site_circle")
            .attr("cx", function (d: any, i) {
              return projection(d[2])[0]
            }
            )
            .attr("cy", function (d: any, i) {
              return projection(d[2])[1]
            }
            )
            .attr("r", function (d: any, i) {
              return adapt_site_data(d[1])
            }
            )
            .attr("fill", "red")
            .attr("opacity", "0.7")
            .on("mouseover", function (d: any, i) {
              return tooltip_first.style("hidden", false).html("<p>Site: " + d[0] + '</p><p>' + 'Num of Launch:' + d[1] + "</p>");
            })
            .on("mousemove", function (d: any) {
              tooltip_first.classed("hidden", false)
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX + 10) + "px")
                .html("<p>Site: " + d[0] + '</p><p>' + 'Num of Launch:' + d[1] + "</p>");
            })
            .on("mouseout", function (d: any, i) {
              tooltip_first.classed("hidden", true);
            })
        });
      });

      d3.json("src/assets/num_by_owner_data/num_by_owner_1996.json").then(function (country: any) {
        var countryArray = new Array();
        countryArray = country.map(d => d.country);
        var valueArray = country.map(d => d.num);
        temp_country_valuearray = valueArray
        temp_country_countryArray = countryArray
        // var jsonValueArray = new Array();

        // var jsonCountryArray = new Array();
        // for (var j = 0; j < countryArray.length; j++) {
        //   for (var i = 0; i < json.features.length; i++) {
        //     if (json.features[i]["properties"]["NAME"] == countryArray[j]) {
        //       jsonCountryArray.push(json.features[i]);
        //       jsonValueArray.push(valueArray[j]);
        //     }
        //   }
        // }
        temp_country_jsonfeatures = json.features
        gg.selectAll(".states")
          .data(json.features)
          .enter()
          .append("path")
          .attr("class", "states")
          .attr("fill", function (d, i) {
            var index = countryArray.indexOf(d["properties"]["NAME"]);
            if (index >= 0) {
              // console.log(d["properties"]["NAME"] + " " + jsonValueArray[index]+" , "+index);
              // console.log(d["properties"]["NAME"]+":color: "+colorScale(jsonValueArray[index]))
              return (colorScale(adapt_country_data(valueArray[index])));
            } else {
              return "white";
            }
          })
          .attr("stroke", "black")
          .attr("d", path)
          .on("mouseover", function (d: any, i) {
            d3.select(this).attr("stroke-width", 2);
            var num_of_owned
            if (typeof temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])] != "undefined") {
              num_of_owned = temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])]
            } else {
              num_of_owned = 0
            }
            return tooltip_first.style("hidden", false).html("<p>Country: " + d["properties"]["NAME"] + '</p><p>' + 'Num of Owned:' + num_of_owned + "</p>");
          })
          .on("mousemove", function (d: any) {
            var num_of_owned
            if (typeof temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])] != "undefined") {
              num_of_owned = temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])]
            } else {
              num_of_owned = 0
            }
            tooltip_first.classed("hidden", false)
              .style("top", (d3.event.pageY) + "px")
              .style("left", (d3.event.pageX + 10) + "px")
              .html("<p>Country: " + d["properties"]["NAME"] + '</p><p>' + 'Num of Owned:' + num_of_owned + "</p>");
          })
          .on("mouseout", function (d: any, i) {
            d3.select(this).attr("stroke-width", 1);
            tooltip_first.classed("hidden", true);
          });
      });

      draw_circle_label()
      draw_rect_label()
      slide_for_total_num()


      function slide_for_total_num() {

        // slide_for_launch_site()

        var radius = 20;
        var margin = 100;

        var x1 = margin;
        var x2 = width - margin;
        var y = height / 2;

        var drag: any = d3.drag()
          .on("drag", dragmove);

        var svg_slider = d3.select("#worldmap")
          .append("svg")
          .attr("id", "slider")
          .attr("class", "first")
          .attr("width", width)
          .attr("height", 200)
          .append("g")
          .attr("transform", "translate(0, -50)")
          // .attr("transform", "translate(0 -300)")
          // .attr("width", width)
          // .attr("height", 200)
          .datum({
            x: width / 2,
            y: height / 2
          });
        var possible_year_list: any = [1974, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

        var tick_range: any = d3.range(1974, 2019)
        var line = svg_slider.append("line")
          .attr("x1", x1)
          .attr("x2", x2)
          .attr("y1", 100)
          .attr("y2", 100)
          .style("stroke", "black")
          .style("stroke-linecap", "round")
          .style("stroke-width", 5);

        var xaxisx = d3.scaleBand().range([x1, x2]).domain(tick_range).paddingInner(0.99);



        d3.select("#slider")
          .append("g")
          .attr("class", "slideraxis")
          .attr("transform", "translate(0," + 50 + ")")
          .call(d3.axisBottom(xaxisx));

        d3.selectAll('g.slideraxis g.tick text')
          .attr("transform", "rotate(-75)")
          .attr("font-size","12")
          .attr("dy", "-0.2em")
          .attr("dx", "-2.5em")
        // var xAxis = d3.axisBottom().scale(x);

        // svg.append("g")
        //   .attr("transform", "translate(0," + height + ")")
        //   .call(xAxis);

        var circle = svg_slider.append("circle")
          .attr("id", "slider_circle")
          .attr("r", radius)
          .attr("cy", 100)
          .attr("cx", function (d) { return d.x; })
          .style("cursor", "ew-resize")
          .call(drag);

        var last_time = -1;


        var all_in_one_by_year_data = Array()
        d3.json("src/assets/num_by_owner_data/all_in_one_by_year_data.json").then(function (json: any) {
          all_in_one_by_year_data = json
        })

        var site_all_in_one_by_year_data = Array()
        d3.json("src/assets/num_by_site_data/site_all_in_one_by_year_data.json").then(function (json: any) {
          site_all_in_one_by_year_data = json
        })

        function get_year(d) {
          var percent = (d - 100) / (width - 2 * margin)
          return 1974 + Math.floor(44 * percent);
        }
        function dragmove(d) {
          // var date_now = new Date();
          // var origin_time = date_now.getTime();
          // var now_time = date_now.getTime();
          // console.log("start_time" + now_time)
          // console.log(all_in_one_by_year_data)
          var x = d3.event.x;
          x = x < x1 ? x1 : x > x2 ? x2 : x;
          d.x = x;
          circle.attr("cx", x);
          var x_value_of_circle: any = svg_slider
            .select('#slider_circle')
            .attr("cx")
          x_value_of_circle = get_year(x_value_of_circle)
          // var date_now = new Date();
          // var original_time = date_now.getTime();
          if (possible_year_list.includes(x_value_of_circle) && show_country_lauch) {
            if (last_time != x_value_of_circle) {
              d3.json("src/assets/world_geojson.json").then(function (json: any) {
                temp_country_jsonfeatures = json.features
                var country = all_in_one_by_year_data[possible_year_list.indexOf(x_value_of_circle)][x_value_of_circle]
                var countryArray = new Array();
                countryArray = country.map(d => d.country);
                var valueArray = country.map(d => d.num);
                temp_country_valuearray = valueArray
                temp_country_countryArray = countryArray

                gg.selectAll(".states")
                  .data(json.features)
                  .transition()
                  .duration(150)
                  .attr("fill", function (d, i) {
                    var index = countryArray.indexOf(d["properties"]["NAME"]);
                    if (index >= 0) {
                      // console.log(d["properties"]["NAME"] + " " + valueArray[index]);
                      if (valueArray[index] == 0) {
                        return "white"
                      } else {
                        return (colorScale(adapt_country_data(valueArray[index])));
                      }
                    } else {
                      return "white";
                    }
                  });


                // .attr("stroke", "black")
                // .attr("d", path);

                // var third_count = date_now.getTime();
                // console.log("after redraw" + third_count)
              });
            }
          }
          if (possible_year_list.includes(x_value_of_circle) && show_launch_site) {
            if (last_time != x_value_of_circle) {
              var projection = d3.geoMercator().fitSize([width, height * 1.4], json);
              d3.json("src/assets/num_by_site_data/site_long_lat_data.json").then(function (site_long_lat: any) {
                var site_num_data = site_all_in_one_by_year_data[possible_year_list.indexOf(x_value_of_circle)][x_value_of_circle]
                // console.log(site_num_data)
                var site_long_lat_data = site_long_lat
                // console.log(site_num_data)
                // console.log(site_long_lat_data)
                var site_data = new Array()

                site_long_lat_data.forEach(site_location_ele => {
                  site_num_data.forEach(site_num_ele => {
                    if (site_location_ele["site"] == site_num_ele["site"]) {
                      var location_array = new Array()
                      var single_site_data = new Array()
                      location_array.push(site_location_ele["long"], site_location_ele["lat"])
                      single_site_data.push(site_location_ele["site"], site_num_ele["num"], location_array)
                      site_data.push(single_site_data)
                    }
                  })
                });
                temp_site_data = site_data
                svg.selectAll(".site_circle")
                  .data(site_data)
                  .attr("cx", function (d: any, i) {
                    return projection(d[2])[0]
                  }
                  )
                  .attr("cy", function (d: any, i) {
                    return projection(d[2])[1]
                  }
                  )
                  .attr("r", function (d: any, i) {
                    return adapt_site_data(d[1])
                  }
                  )
                  .attr("fill", "red")
                  .attr("opacity", "0.7")
                  .on("mouseover", function (d: any, i) {
                    return tooltip_first.style("hidden", false).html("<p>Site: " + d[0] + '</p><p>' + 'Num of Launch:' + d[1] + "</p>");
                  })
                  .on("mousemove", function (d: any) {
                    tooltip_first.classed("hidden", false)
                      .style("top", (d3.event.pageY) + "px")
                      .style("left", (d3.event.pageX + 10) + "px")
                      .html("<p>Site: " + d[0] + '</p><p>' + 'Num of Launch:' + d[1] + "</p>");
                  })
                  .on("mouseout", function (d: any, i) {
                    tooltip_first.classed("hidden", true);
                  })
              });
            }
          }
          last_time = x_value_of_circle
          // var timecosume = date_now.getTime() - origin_time;
          // console.log("update use " + timecosume + " ms")
        }

      }

      //deal with checkbox
      d3.select("#by_launch_site").on("change", update_by_launch_site);
      d3.select("#by_country").on("change", update_by_country);

      function update_by_launch_site() {
        if (d3.select("#by_launch_site").property("checked")) {
          var projection = d3.geoMercator().fitSize([width, height * 1.4], json);
          console.log("by_launch_site: true")
          show_launch_site = true;
          svg.selectAll("circle")
            .data(temp_site_data)
            .enter()
            .append("circle")
            .attr("class", "site_circle")
            .attr("cx", function (d: any, i) {
              return projection(d[2])[0]
            }
            )
            .attr("cy", function (d: any, i) {
              return projection(d[2])[1]
            }
            )
            .attr("r", function (d: any, i) {
              return adapt_site_data(d[1])
            }
            )
            .attr("fill", "red")
            .attr("opacity", "0.7")
            .on("mouseover", function (d: any, i) {
              return tooltip_first.style("hidden", false).html("<p>Site: " + d[0] + '</p><p>' + 'Num of Launch:' + d[1] + "</p>");
            })
            .on("mousemove", function (d: any) {
              tooltip_first.classed("hidden", false)
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX + 10) + "px")
                .html("<p>Site: " + d[0] + '</p><p>' + 'Num of Launch:' + d[1] + "</p>");
            })
            .on("mouseout", function (d: any, i) {
              tooltip_first.classed("hidden", true);
            })
          draw_circle_label()
        } else {
          console.log("by_launch_site: false")
          svg.selectAll('.num_site_legend').remove()
          show_launch_site = false;
          svg.selectAll(".site_circle").remove()
        }
      }

      function update_by_country() {
        if (d3.select("#by_country").property("checked")) {
          console.log("show_country_lauch: true")
          draw_rect_label()
          show_country_lauch = true;
          gg.selectAll(".states")
            .data(temp_country_jsonfeatures)
            .enter()
            .append("path")
            .attr("class", "states")
            .attr("fill", function (d, i) {
              var index = temp_country_countryArray.indexOf(d["properties"]["NAME"]);
              if (index >= 0) {
                // console.log(d["properties"]["NAME"] + " " + valueArray[index]);
                if (temp_country_valuearray[index] == 0) {
                  return "white"
                } else {
                  return (colorScale(adapt_country_data(temp_country_valuearray[index])));
                }
              } else {
                return "white";
              }
            })
            .attr("stroke", "black")
            .attr("d", path)
            .on("mouseover", function (d: any, i) {
              d3.select(this).attr("stroke-width", 2);
              var num_of_owned
              if (typeof temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])] != "undefined") {
                num_of_owned = temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])]
              } else {
                num_of_owned = 0
              }
              return tooltip_first.style("hidden", false).html("<p>Country: " + d["properties"]["NAME"] + '</p><p>' + 'Num of Owned:' + num_of_owned + "</p>");
            })
            .on("mousemove", function (d: any) {
              var num_of_owned
              if (typeof temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])] != "undefined") {
                num_of_owned = temp_country_valuearray[temp_country_countryArray.indexOf(d["properties"]["NAME"])]
              } else {
                num_of_owned = 0
              }
              tooltip_first.classed("hidden", false)
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX + 10) + "px")
                .html("<p>Country: " + d["properties"]["NAME"] + '</p><p>' + 'Num of Owned:' + num_of_owned + "</p>");
            })
            .on("mouseout", function (d: any, i) {
              d3.select(this).attr("stroke-width", 1);
              tooltip_first.classed("hidden", true);
            })

        } else {
          console.log("show_country_lauch: false")
          d3.selectAll(".num_country_legend").remove()
          gg.selectAll(".states").remove()
          // gg.selectAll(".states")
          //   .attr("fill", "white")
          show_country_lauch = false;
        }
      }
    });
  }
}
