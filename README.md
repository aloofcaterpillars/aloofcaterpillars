# aloofcaterpillars
Greenfield Project 

What is this product?

One-for-One spices up the the Hack Reactor student's experience by allowing them to trade meals with their peers. Users can post meals that they have to offer and view and request those offered up by other users. 

Getting Started

To get started with One-for-One, the user simply navigates to the product's homepage, which loads up a static index.html file. Upon arriving at the landing page, the client will be presented with a variety of options in our navigation bar. New users can register, existing users can sign in, and authenticated users can decide to browse meals, post their own available meals, and view and confirm their own pending requests. 

Front-End Layout

Our development team utilized the front-end framework Angular for this project. Therefore, the product is a single-page web app that renders different view templates under the navigation bar described above according the the user's intent. All of our front-end files are contained in the project's client folder. They are essentially divided into three categories, based on different available views: 

	-auth: contains the view templates and functionality for authentication, including signin and register. These are used when a user navigates to signin or register. 

	-browse: contains the templates and functionality for our main browse page and an individual user's dashboard where they can view and select pending requests. These are used when a user navigates to browse.

	-create: contains the templates and functionality for the page where users can generate and post their own meals to the marketplace. These are used when a user navigates to create.

The factories folder holds additional functionality that allows the client-side to communicate with the application's api and back-end features, making various requests to the server regarding user and meal data as well as authentication using Angular's built-in $http service.

The file app.js contains the logic for user intent and routing on the front-end. Using Angular's ngRoutes service, it dictates what template should render and what functionality should be in place based on the user's interaction with the app. 

Back-End Layout

One-for-One makes use of an express server and a database set up with MongoDB that utilizes the Mongoose ORM. The database contains two collections: users and meals. The respective schemas for these collections an be found in the db folder (which resides in the server folder). 

As the client interacts with the application, the front-end controllers interpret the user's intent, and make requests to the server accordingly. The file server-config within the server folder handles the routing between those front-end requests and the database, utilizing functionality implemented in the users and meals controllers (which can be found along with the schemas inside the db folder) and in some cases authorization middleware. 

When a user registers or signs in, they are given a token. This token will be verified using authentication middleware (which is defined in the server-config file in the form of a checkUser helper method) throughout the user's interaction with the client-side of the product. 

While the database setup is relatively simple, the aspect of trading introduces some additional complexity. The meal schema includes a few key properties including consumer, creator, and status. The creator of the meal is the user that posted it, the consumer property is an array of potential consumers (i.e. those who have made reqeusts for that meal), and the status can have one of the following values: "sold", "pending", or "false". The status indicates whether or not a meal has been requested, or if it has been sold altogether. 

When a request for a meal is made, the status of that meal is changed from "false" to "pending" in the database. Additionally, the username of the client that requested the meal is added to that meal's consumer array. Now the owner of that meal can see those consumers in the pending requests section of the view requests template. As the title One-for-One implies, meals cannot be exchanged only one way. Each transaction is a trade. The creator of the requested meal can therefore click on any of the meal's potential consumers to see what they have to offer, select which of their meals they would like in return, and then confirm the trade. 

Upon confirmation, the status of both meals will update from "pending" to "sold" and the consumers array will be cleared to ensure removal from the pending requests view. 

More specific documentation on all back-end functionality can be found within the user and meal controllers. 

Summary

One-for-One is a single-page web application that utilizes MEAN stack and allows users to post, share, and request meals. It also allows for trade confirmations, a process that includes the additional step of a requested meal's creator selecting a desired meal from one of the prospective consumers. While it includes some added complexity in terms of interacting with transactions between the front-end and the back-end, One-for-One remains a relatively straight-forward, intuitive application for users to interact with and use to share meals. 

