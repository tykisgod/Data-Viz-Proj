# Project Kepler

## PROJECT SUMMARY

### PROJECT INFORMATION

- Project title: Visualization on Satellites Data
- Group name: Kepler
- Team names: [Yuning Zhu (zhuyunin@usc.edu), Yukang Tian (yukangti@usc.edu), Chen Lou (chenlou@usc.edu)]

### PROJECT ARTIFACTS

- [Demonstration URL](http://www-scf.usc.edu/~zhuyunin/draft_demo/)
- [Presentation PDF](<presentation-pdf-url>) and [transcript](https://github.com/INF554Fall18/project-kepler/blob/master/presentation/PRESENTATION_TRANSCRIPT.md)
- [Article](<article-pdf-url>) and [Overleaf URL](https://www.overleaf.com/7768316887pcpjwfhdccqr)
- [YouTube video](<youtube-video-url>)

## INTRODUCTION
Have you ever wondered how space science has improved over years? Which country has most satellites? Where are these satellites? What're their uses?
The Visualization presents information about universal satellites in multi-dimensional aspects

## DATA SOURCE
- Data is obtained from [UCS Satellite Database](https://www.ucsusa.org/nuclear-weapons/space-weapons/satellite-database#.W9z4f3pKhTb)
- Detailed, massive information on every working satellite

## CONTENT SUMMARY
### LAUNCH MAP
- Choropleth
- Different filters: number of satellites of countries, number of satellites launched by countries, 

### ORBIT
- Three main orbits: LEO, MEO, GEO ; some interesting elliptical orbits
- Can be filtered by country

### INSIGHT
- Combination of several basic charts
- For example: line chart: year and number of satellites; Pie chart: percentage of number of satellites of different countries/ others


## DEV SETUP (Not finished)

### NODE AND NPM
- Make sure you have latest Node and npm
- Use `npm install` to install necessary packages for running the project

### D3 and JS
- For first part, d3.map is used to draw the world map
- For second part, satellites are projected on their orbits
- For third part, a combination of d3 layout and charts are used 

### ANGULAR
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

### BOOTSTRAP
- Bootstrap is used to save effort when some common elements are needed like buttons.

## DEPLOYMENT
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
- Deploy on USC SCF
- [Link to Published Page](http://www-scf.usc.edu/~zhuyunin/kepler/index.html) (not yet)