# Presentation Transcript

## Cover

## Slide 1
Introduction
- 10 words on what our visualization is about ： The Visualization presents information about universal satellites in multi-dimensional aspects.
## Slide 2
Topic
- There are more than 1800 active satellites orbiting earth right now, taking pictures, broadcasting communication and navigation data, spying on every one living on the earth.  
- However, despite the fact that people are being served and observed every day, actually not many are familiar with the topic and have the concept like what most satellites' uses and purposes are, how many satellites a given country have in orbit.
## Slide 3
Data
- The data is from UCS Satellite Database~\cite{ref_url1}.  It includes in-depth details on the 1,886 satellites currently orbiting Earth. 
- It's available online and free
- The database contains 26 types of data for each satellite, including technical information about each satellite (mass, power, launch date, expected lifetime) and its orbit (apogee, perigee, inclination, and period), as well as information on what the satellite is used for, and who owns, operates, and built the satellite
- World map data from Nature Earth~\cite{ref_url3} is also used.

## Slide 4
Others have done
- First is to use a time shaft to show and compare  on map the satellite number and ability to launch of countries in year 1966 and year 2016

## Slide 5
Responsibility
- Yukang is responsible for data selection, development of first visualization part and video.

- Yuning is responsible for overall design, development of second visualization part, cover and navigator, and paper.

- Chen is responsible for evaluation, development of the third visualization part.



## Slide 6


## Slide 7
- Overview
    - Stroy: show num of launch by country/site.
    - Use d3 map, and it's interactable.

## Slide 8
- Introduce Timeline slider:
    - Includes D3 animated transitions.
    - Show data changing from 1974 to 2018.

## Slide 9
- Check Box: change states between by country and by site.
- Tool Tips.

## Slide 10
- TODO:
    - Label
    - Color choosing
    - Title


## Slide 11 - Second: Overall
- A simulated orbit projection, from inside to outside: earth, low earth orbit LEO, medium earth orbit MEO and geosynchronous Orbit GEO
- Orbit altitudes, number of satellites on each orbit are shown to enhance imagnation
- Each 


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


## Slide 16

## Slide 17

## Slide 18

## Slide 19

## Slide 20
