# Team Kepler: Visualization on Satellites Data

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Visualization on Satellites Data
- Group name: Kepler
- Team names: [Yuning Zhu (zhuyunin@usc.edu), Yukang Tian (yukangti@usc.edu), Chen Lou (chenlou@usc.edu)]

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~zhuyunin/demo/)
- [Presentation PDF](https://github.com/INF554Fall18/project-kepler/blob/master/presentation/slides.pdf) and [transcript](https://github.com/INF554Fall18/project-kepler/blob/master/presentation/PRESENTATION_TRANSCRIPT.md)
- [Article](https://github.com/INF554Fall18/project-kepler/blob/master/final_report.pdf) and [Overleaf URL](https://www.overleaf.com/7768316887pcpjwfhdccqr)
- [YouTube video](https://youtu.be/BL6xRM94YDw)

## INTRODUCTION
Have you ever wondered how space science has improved over years? Which country has most satellites? Where are these satellites? What're their uses?
This visualization project, with three visualization parts, presents information about universal satellites in multi-dimensional aspects, in order to interest non-specialists and help them understand more about it.
## DATA SOURCE
- Data is obtained from [UCS Satellite Database](https://www.ucsusa.org/nuclear-weapons/space-weapons/satellite-database#.W9z4f3pKhTb)
- Detailed, massive information, including 26 features on 1886 working satellites
- Map data is from [Nature Earth](https://www.naturalearthdata.com/downloads/)

## CONTENT SUMMARY
### ON EARTH
- Combination of choropleth and proportional symbol map
- A time slider to show data on different years

### IN SPACE
- Dot map of satellite distribution orbiting Earth
- Zoom-in/out, color by country/purpose/user
- Corresponding stacked bar cahrt based on color rule

### MORE STORY
- Combination of pie chart, bar chart and line chart to tell more story


## DEV SETUP

### NODE AND NPM
- Make sure you have latest Node and npm
- Use `npm install` to install all necessary packages before running the project

### D3 and JS
- For first part, d3.map is used to draw the world map
- For second part, satellites are projected on their orbits, d3 stack layout is used.
- For third part, d3 pie layout and other charts are used 
- d3 basic tools like axes, scales and transitions are applied through the project.

### ANGULAR
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.
- Auglar used for consistent development and maintenance.
- Three components are created for three separate functional parts.

### BOOTSTRAP
- Bootstrap is applied to design the page layout.
- Bootstrap helps when some common and satisfactory style and functions like colored and styled buttons are applied, so that not much time would be used on that. 
- Also it helps with responsive page.

### GIT
- Git is used for collaborative development. 

### COVER AND NAVIGATION
- The cover is basically an introduction, with a start button to jump to next section. 
- The navigator contains four buttons to navigate the user to four parts of the page
- It's fixed on top of the page to help user navigate through the page easily.

### FIRST VISUALIZATION PART
- Geojson mentioned above is used along with D3 to draw the map. 
- The accumulated number of satellites of countries and launch sites each year are used to draw the choropleth and symbol proportional map. 
- A slider is developed to let user adjust time.
- Detailed number and name can be shown with mouse over corresponding area.

### SECOND VISUALIZATION PART
- A dot map of satellite distribution. 
- Every satellite is projected on their orbits as a circle using perigee as "r" and a random number between 0 to pi to decide "cx" and "cy" on the page. 
- Zoom-in and out "Choose Orbit" function is developed with different scale and animation between each state is smooth. 
- Each satellite can be colored by country/purpose/user based on user choice.
- Meanwhile a stacked bar chart with mouse-over tooltip is developed showing detailed information

### THIRD VISUALIZATION PART
- The third part includes interactive charts using D3 layouts.
- D3 pie chart is developed with buttons to jump to different views.
- Selected line can be highlighted when mouse over.
- Tooltips are developed to help users get more information.
### STYLE
- Responsive via Bootstrap
- Consistent color scheme via well designed D3 color scheme
- Smooth animated transitions via D3 transition function


## DEPLOYMENT
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
- Deploy on USC SCF
- [Link to Published Page](http://www-scf.usc.edu/~zhuyunin/demo/)


## About Team
We are Team Kepler. Team members are Yuning, Yukang, Chen.

- Yuning is responsible for design, development of second visualization part, cover and navigator, and paper.

- Yukang is responsible for data selection, development of first visualization part and video.

- Chen is responsible for evaluation, development of the third visualization part.