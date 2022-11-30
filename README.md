This project is a food ordering app, named Burger App, designed with Schwarzmuller's well known tutorial in mind.

The project is done in [Next.js](https://nextjs.org/) and the UI is designed with [tailwind.css](https://tailwindcss.com/). 

A user of this application can register and then login with the credentials he sumbited. He is then allowed to place an order of his liking. The order is then posted to an API and using the sendgrid email sender service it is sent to the owner of the app via email. 

In the current project the user's credentials are saved in a local json file. The following tutorial served as a model for this: [Next.js 11 - User Registration and Login Tutorial with Example App](https://jasonwatmore.com/post/2021/08/19/next-js-11-user-registration-and-login-tutorial-with-example-app)

Another version of this repository will allow storing the users in Firebase and also authenticating them by cross checking with the Firebase.

To run this project in development mode, clone the repository in a local folder and run the command: 

```
npm install
```

After that run the command: 

```
npm run dev 
```

and open http://localhost:3000 in your browser to see the result.

Before you can access the index.jsx page you will be redirected to the login and registration pages.