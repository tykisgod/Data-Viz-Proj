# Presentation Transcript

## Cover
- Project name: Visualization on orbiting satellite data
- Group name: Kepler
- Member name and email:
    - Yukang Tian, yukangti@usc.edu
    - Yuning Zhu, zhuyunin@usc.edu
    - Chen Lou, chenlou@usc.edu
- Link to demo: [Demo](www-scf.usc.edu/~zhuyunin/demo/)
    
## Slide 1 - Introduction and Audience
- 10 words on what our visualization is about ： The Visualization presents information about universal satellites in multi-dimensional aspects.
- We want to attract non-specialists' interest on satellites and space science, help them understand more about the topic.

## Slide 2 - Topic and Why Interesting
- There are more than 1800 active satellites orbiting earth right now, taking pictures, broadcasting communication and navigation data, spying on every one living on the earth.  
- However, despite the fact that people are being served and observed every day, actually not many are familiar with the topic and have the concept like what most satellites' uses and purposes are, how many satellites a given country have in orbit.

## Slide 3 - Data
- The data is from UCS Satellite Database.  It includes in-depth details on the 1,886 satellites currently orbiting Earth. 
- It's available online and free
- It contains 26 types of data for each satellite, including aunch date, orbit information as well as ownership
- World map data from Nature Earth is also used.

## Slide 4 - What Others have done
- First is to use a time shaft to show and compare on map the satellite number and ability to launch of countries in year 1966 and year 2016.
- Second is to projects satellites based on orbits. It inspires us and we fix many problems we found.

## Slide 5 - Responsibility
- Yukang is responsible for data selection, development of first visualization part and video.

- Yuning is responsible for overall design, development of second visualization part, cover and navigator, and paper.

- Chen is responsible for evaluation, development of the third visualization part.

## Slide 6 - Design Process
- Turn massive, unreadable satellite data into expressive, clear visualizations
- Multiple perspectives
- Responsive, interactive
- d3.map, d3 charts, d3 layout, animated transition are used

## Slide 7 - First: Overview
- A combined map of choropleth map and proportional symbol map with a slide bar.  
- D3 map and geojson is used to darw this map.
- The map tells users about the total number of launch according to the color of country and the radius of circle, by year. 

## Slide 8 - First: Timeline Slider
- This makes it easy to compare the num of launch times of each country in the same year on this map or the launch situation in different years of same country.
- The slide bar is easy to use ,and you can see the // color and radius change immediately and you can see the difference directly between these two status.

## Slide 9 - First: Additional Function
- If user hovers mouse on the country when by country checkbox is checked, you will see the infomation of country name and launch time in that year. It's similar when another checkbox is checked.
- I also use log funtion to map the value of country to the color and also the radius of circle, because the max number of launch is around 800 and the second one is 300, and most of other counties’ are no greater than 50.  

## Slide 10 - Second: Overview
- A satellite dot distribution map, simulating orbit projection, from inside to outside: earth, low earth orbit, medium earth orbit and geosynchronous Orbit.
- Orbit altitudes, number of satellites on each orbit are shown to enhance imagnation.
- Each circle represents a satellite.

## Slide 11 - Second: Zoom
- "Choose Orbit" function to zoom-in/out: low earth, medium earth or geosynchronous
- For example, Low earth is crowded, and can be explored by zooming in.

## Slide 12 - Second: Color Rule
- "Color By" function, color by owner, purpose or user.
- Corresponding legends will show up on the right.


## Slide 13 - Second: Stacked Bar Chart
- A stackd bar chart shows detailed distribution by the category on each orbit.
- Detailed number when mouse over.

## Slide 14 - Second: Original Function and Reset
Donut-like function
- coordiantes limited by value percentage of country ownership on different orbits
- The button is disabled untio color rule is applied
- Reset to get back to original state

## Slide 15 - Third: Bar Chart: Comparision 
- The bar chart compares number of satellites on different orbits
- Information on different orbits is shown above.
- Detailed number information is shown with mouse over.

## Slide 16 - Third: Bar Chart: Detailed Usage
- The bar chart can show the detailed usage of satellites owned by each country

## Slide 17 - Third: Line Chart: Point Info

- This is a line chart showing number trend of satellites launched every year by countries.
- The overall number is climbing.
- Mouse over each point can show detailed number.
## Slide 18 - Third: Line Chart: Highlight

- Many lines on the page can be distractive.
- As a solution, selected line can be highlighted, to look into the trend.

## Slide 19 - Responsive
- Responsive is considered along the whole project
- As shown here, many parts are developed with responsive features.

  ​