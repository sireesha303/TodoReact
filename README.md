# Todo Tracker

## About
### Functional
* Todo Tracker which helpful user to track the list of todos.
* Authenticated users only can access the app.
* Once user signedup into the system, user can login into the system.
* User can create the todos and update the todo once it is completed as well as can delete if want.


### Technical
* Vercel Deployed Single page responsive web application.
* Implemented different routes like login, home, jobs, job details using react
components, lists, hooks,event handlers.
* Persisted user login in system by storing the jwt token in one of client side storage mechanisam cookies.
* Added protected routes to ensure authenticated user is only can access the app and doing
authorized HTTP Api calls.
* Added loaders to indicate network call is in progress.
* Onclick of logout removed JWT Token from cookie and navigated user to login page.


## Key Learnings
* Routing in React app using react-router-dom
* JWT authentication handling in frontend.
* Local storage Cookies usage.
* Media Queries for responsiveness.
* Spinner Implementation on network calls.
* Sending HTTP Request to get backend data as response using Fetch API Js.
* Adding React Icons for Attractive UI.
* Based on User Selected Filter updating the query parameters of API and fetching data from backend with updated inputs.


## Technologies Used
* React Js
* CSS
* react-router-dom
* js-cookies
* CSS - Media queries


## Checkout URL
* [Todo Tracker](https://todo-tracker-react.vercel.app/)


