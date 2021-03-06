README

## Below app description is specification how to use this repository. And how to run this project.

# Weather app for sailors
 This web app was developed across two weeks for educational purposes.
Version 1.0.0 of this app is mostly using external API. It was one of the main educational purpose.
##  Current main features include:
- display of weather data from OpenWeatherMapAPI, based on list with few lakes in Poland
## Technologies used in this project
- JavaScript
- HTML 5
- CSS 3
## In the future version we are planning to add:
- localization based on GPS
- localization based on IP 
- additional animations
- weather for the next days
- additional information about wind and wind direction
 
 
# Project structure:
The repository consists of two main branches:
master - the "production" branch from which the github pages demo of the application can be accessed
develop - the development branch. This branch aggregates the pull requests from working branches
All files are contained in two folders: /src (source files) and /docs (output folder). Most contents of the latter are loaded from /src folder using webpack.





# template project

## WHEN FIRST ACCESSING THE REPOSITORY:
1. Use your preferred method to _**clone the repository**_
2. Install the dependencies with _**npm install**_ (in repository root folder) - this may take a bit of time since, as per usual, the command will download half of the Internet

## STARTING WORK SESSION:
1. Get the webpack running (and watching your files) with _**npm start**_ script (again, in repository root folder)

## REPOSITORY BRANCH POLICY:
1. No direct pushing to master and develop branches is allowed (only Pull Requests that require approval of at least one other contributor to be merged)
2. The branch named _**master**_ is a production branch, only code verified on develop branch can be merged into master
3. The branch named _**develop**_ is the main aggregating branch of the repository, PR from individual task-oriented branches should be made to develop rather than master
4. Contributors should, as a general rule, work on separate task-oriented branches (one person per branch).
5. The naming of task-oriented branches should follow the convention: _**taskType/descriptiveName**_ where taskType is one of the following:
   - _**feat/**_ for branches created to introduce new features and expand the functionality of the application
   - _**bug/**_ for branches created to fix issues with existing features not working as intended
   - _**chore/**_ for branches created with the purpose of improving code organization, configuring something or otherwise perform supporting takss that aren't focused on development of new features or fixing existing ones

## FOLDER STRUCTURE:
* _**docs/**_ - this folder contains the _**index.html**_ file and webpack-generated contents that shouldn't be manually edited or commited to the repository
* _**src/**_ - the folder containing source files of the application, including _**index.js**_ file that serves as the main script of the application (scripts contained within are the ones that are going to be executed within docs/index.html file).
