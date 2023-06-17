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

8. Add user model
    9.1 folder model -> User.js

9. Add user manager
    * folder managers -> userManager.js
    * add login and register methods (empty)
    * validate repeat password
    * validate if user already exists

10. Authentication
    8.1 add auth user controller
    8.2 add controller to routes
    8.3 fix header navigation to login and register
        8.3.1 home
        8.3.2 login
        8.3.3 register
    8.4 render login page
    8.5 add unique index for username

11. Modify login and register
    * we dont need the action because action posts on the same page 
    * if we want to post on the same page and another route
    * the action equals the route we want to go 
    * and the data can be caught in the router behind the server

12. Add login and register post actions
    * pass in ass object user login and register data

13. Implement user login and register
    * require in user controller
    * add register method
    * add login method

14. Hash password
    * install bcrypt
    * set-up bcrypt
    * hash password
    * validate hash password

15. Login
    * Find user by username
    * Validate password with hash

16. Generate token
    * install jsonwebtoken
    * promisify jsonwebtoken (optional)
    * create secret
    * generate token in manager.login

17. Return token in cookie
    * npm install cookie-parser
    * config cookie parser
    * create secret
    * set cookie with token

18. Log out

19. Authentication middleware
    * create base middleware
    * use middleware
    * implement
    * attach decoded token to request
    * handle invalid token

20. Dynamic navigation
    * add conditional in main layout
    * add res.locals

21. Error handling
    * add 404 page
    * redirect missing route to 404
    * add global error handler (optional)
    * use global error handler after routes (optional)
    * add error message extractor

22. Show error notifications
    * add error container to main layout
    * show error constainer conditionally
    * add error to render
    * pass erroe to render
    * add local error handler
