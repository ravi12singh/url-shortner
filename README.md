## Repo Features
- [x] Node 10.9 or above
- [x] Angular 8.2
- [x] Bootstrap
- [x] Lazy Loaded Routes
- [x] Angular Material
- [x] PWA Ready
- [x] Server Side TypeScript
- [x] Node.js Express API written in TypeScript
- [x] Production Ready Build
- [x] Established Dev Environment
- [x] Server Side Rendering (Angular Universal)

### Url Shortner

This application is a simple application that just gives users a short url after entering a long string url.

The application takes a long string Url then adds it to a MongoDB.

User gets a short Url in return that is also stored in the DB corresponding to the original long Url.

We track clicks each time a user clicks on the short url that routes to a new tab.

If user enters duplicate url that already exists in the database we return back error message on UI.

The API can be accessed from postman as well as command line.

The purpose of this application is to show all sides of creating angular components as well as having server side rendering with
Express. Storing the data in mongodb and creating REST APIs

## Setup
Get node version 10.9

After cloning, run `npm install`

## Development server

Run `npm run start` to spin front end code,

Run `npm run post-dev` to start the Node server in development mode

Navigate to `http://localhost:4200/`. 

You can now seamlessly watch your changes reflect in realtime everytime you hit save (Client + Server code).

## Production Build

Run `npm run build:prerender`

Then `npm run serve:ssr` to start the server

This spins up a SSRed Node server on http://localhost:3015





