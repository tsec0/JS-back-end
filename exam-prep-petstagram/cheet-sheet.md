#Cheat sheet for exam prep
1. Initialize project
    1.1 create folder - src
    1.2 create file - index.js

2. Install nodemon -> npm install nodemon
    2.1 configure package.json
        2.1.1 add command "start": "nodemon src/index.js" to "scripts" object

3. Install express -> npm install express
    3.1 modify index.js file to use express
    3.2 add static middleware
    3.3 add urlencoded (bodyparser)
    3.4 add routes.js -> configure routes.js
        3.4.1 add controller routes
    
4. Add static resources
    4.1 Inside public folder put css files and images
    4.2 Inside views folder put html files

5. Add view engine
    5.1 set up express handlebars
        5.1.1 install express handlebars -> npm install express-handlebars
    5.2 add to express -> modify index.js
    5.3 configure engine
    5.4 configure views folder (only for src)
    5.5 set up main layout
    5.6 add partials folder
        5.6.1 render home page
        5.6.2 fix stylesheet and images -> const path = require('path');
    
6. Add controllers folder with home controller folder
    6.1 create folder conntrollers in src 
    6.2 create controllers ex. homeController.js and configure the file
    6.3 in routs.js import the controller and set route to load page

7. Add database
    7.1 install mongoose
    7.2 connect database
