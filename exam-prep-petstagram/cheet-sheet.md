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
    5.2 add to express