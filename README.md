# Project Kepler

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Visualization on Satellites Data
- Group name: Kepler
- Team names: [Yuning Zhu (zhuyunin@usc.edu), Yukang Tian (yukangti@usc.edu), Chen Lou (chenlou@usc.edu)]

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~zhuyunin/demo/)
- [Presentation PDF](https://github.com/INF554Fall18/project-kepler/blob/master/presentation/slides.pdf) and [transcript](https://github.com/INF554Fall18/project-kepler/blob/master/presentation/PRESENTATION_TRANSCRIPT.md)
- [Article](https://github.com/INF554Fall18/project-kepler/blob/master/final_report.pdf) and [Overleaf URL](https://www.overleaf.com/7768316887pcpjwfhdccqr)
- [YouTube video](<youtube-video-url>)

## INTRODUCTION
Have you ever wondered how space science has improved over years? Which country has most satellites? Where are these satellites? What're their uses?
The Visualization presents information about universal satellites in multi-dimensional aspects

## DATA SOURCE
- Data is obtained from [UCS Satellite Database](https://www.ucsusa.org/nuclear-weapons/space-weapons/satellite-database#.W9z4f3pKhTb)
- Detailed, massive information on 1886 working satellites
- Map data is from [Nature Earth](https://www.naturalearthdata.com/downloads/)
## CONTENT SUMMARY
### ON EARTH
- Combination of choropleth and proportional symbol map
- Two checkbox: owned by countries and launched by sites

### IN SPACE
- Three main orbits: LEO, MEO, GEO ; some interesting elliptical orbits
- Can be filtered by country

### MORE STORY
- Combination of pie chart, bar chart and line chart to tell more story
- For example: line chart: year and number of satellites; Pie chart: percentage of number of satellites of different countries/ others


## DEV SETUP

### NODE AND NPM
- Make sure you have latest Node and npm
- Use `npm install` to install all necessary packages before running the project

### D3 and JS
- For first part, d3.map is used to draw the world map
- For second part, satellites are projected on their orbits, d3 stack layout is used.
- For third part, d3 pie layout and other charts are used 

### ANGULAR
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.
- It's used for consistent development and maintenance.
- Three components are created for three functional parts.

### BOOTSTRAP
- Bootstrap helps when some common and satisfactory style and functions like colored and styled buttons are applied, so that not much time would be used on that. 
- Also it helps with responsive page.

### Git
- Git is used for collaborative development. 

### COVER AND NAVIGATION
- The cover is basically an introduction, with a start button to jump to next section. 
- The navigator contains four buttons to navigate the user to four parts of the page
- It's fixed on top of the page to help user navigate through the page easily.

### FIRST VISUALIZATION PART
- Geojson mentioned above is used along with D3 to draw the map. 
- The accumulated number of satellites of countries and launch sites each year is used to draw the choropleth and symbol proportional map. 
- A slider is developed to let user adjust time.

### SECOND VISUALIZATION PART
- A dot map of satellite distribution. 
- Every satellite is projected on their orbits as a circle using perigee as "r" and a random number between 0 to $\pi$ to decide "cx" and "cy" on the page. Zoom-in and out function is developed with different scale and animation between each state is smooth. Each satellite can be colored by country/purpose/user based on user choice. Meanwhile a stacked bar chart with mouse-over tooltip is developed showing detailed information

### THIRD VISUALIZATION PART
- 

## DEPLOYMENT
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
- Deploy on USC SCF
- [Link to Published Page](http://www-scf.usc.edu/~zhuyunin/demo/)


## About Team
We are Team Kepler. Team members are Yuning, Yukang, Chen.

- Yuning is responsible for design, development of second visualization part, cover and navigator, and paper.

- Yukang is responsible for data selection, development of first visualization part and video.

- Chen is responsible for evaluation, development of the third visualization part.