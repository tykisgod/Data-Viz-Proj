# Presentation Transcript

## Cover
- Project name: Visualization on orbiting satellite data
- Group name: Kepler
- Member name and email:
    - Yukang Tian, yukangti@usc.edu
    - Yuning Zhu, zhuyunin@usc.edu
    - Chen Lou, chenlou@usc.edu
    
## Slide 1 - Introduction and Audience
- 10 words on what our visualization is about ： The Visualization presents information about universal satellites in multi-dimensional aspects.
- We want attract non-specialists' interest on satellites and space science.

## Slide 2 - Topic and Why Interesting
- There are more than 1800 active satellites orbiting earth right now, taking pictures, broadcasting communication and navigation data, spying on every one living on the earth.  
- However, despite the fact that people are being served and observed every day, actually not many are familiar with the topic and have the concept like what most satellites' uses and purposes are, how many satellites a given country have in orbit.

## Slide 3 - Data
- The data is from UCS Satellite Database.  It includes in-depth details on the 1,886 satellites currently orbiting Earth. 
- It's available online and free
- It contains 26 types of data for each satellite, including aunch date, orbit information as well as ownership
- World map data from Nature Earth is also used.

## Slide 4 - What Others have done
- First is to use a time shaft to show and compare on map the satellite number and ability to launch of countries in year 1966 and year 2016
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
- Stroy: show num of launch by country/site.
- Use d3 map, and it's interactable.

## Slide 8 - First: Timeline Slider
- Includes D3 animated transitions.
- Show data changing from 1974 to 2018.

## Slide 9 - First: Additional Function
- Check Box: change states between by country and by site.
- Tool Tips.

## Slide 10 - First: TODO
- Label
- Color choosing
- Title

## Slide 11 - Second: Overview
- A simulated orbit projection, from inside to outside: earth, low earth orbit LEO, medium earth orbit MEO and geosynchronous Orbit GEO
- Orbit altitudes, number of satellites on each orbit are shown to enhance imagnation
- Each circle represents a satellite


## Slide 12 - Second: Zoom
- Can choose orbit to zoom-in/out: low earth, medium earth or geosynchronous
- Low earth is crowded, and can be explored by zooming in.

## Slide 13 - Second: Color Rule
- Choose color rule: By owner, purpose or user
- Corresponding legends will show up on the right

## Slide 14 - Second: Original Function
- Donut-like function
- coordiantes limited by value percentage of country ownership on different orbits
- The button is disabled untio color rule is applied

## Slide 15 - Second: Reset and Tooltip
- Reset to get back to original state
- Additional information when mouse over satellites


## Slide 16 - Third: Pie chart: Satellites of countries

- Show ratio of each country's satellites
- Additional information when mouse over satellites

## Slide 17 - Third: Line chart: Trend of Lauching Satellites

- Show trend of lauching satellites in years
- Additional information when mouse over line 

## Slide 18 - Third: Line chart: Trend(country part)

- Show trend of lauching satellites in years for each country
- Additional information when mouse over line 

## Slide 19 - Third: Bar chart: Launch site

- Show number of satellites launched by each launch site
- Additional information when mouse over line 

## Slide 20 - Third: Bar chart: Top 10 Launch site

- Show number of satellites launched by Top 10 launch site 
- Additional information when mouse over line 

  ​