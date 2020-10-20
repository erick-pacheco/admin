# Express-React-BP

This is a boilerplate project using the following technologies:

- [React](https://facebook.github.io/react/) for the frontend
- [Express](http://expressjs.com/) for the backend
- [Webpack](https://webpack.github.io/) for compilation

## Requirements

- [Node.js](https://nodejs.org/en/) 6+

## Running

Install Dependencies
`npm install`

```
{

"scripts": {
    "start": "nodemon server.js",
    "dev": "concurrently  \"nodemon server.js\" \"webpack -w\" ",
    "build": "./node_modules/.bin/webpack --progress --config webpack.config.js"
  }

}
```

Visit [localhost:5000](http://localhost:5000/)
