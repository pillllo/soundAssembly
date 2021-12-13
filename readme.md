<p>
<img src="images/soundAssembly_image.png" />
</p>

Sound Assembly is a web application that allows users to login via Spotify OAuth and tag their followed artists to organise their music collection.

This Project was originally forked from Sound Assembly by Grega Erzen ([Github](https://github.com/GregaE) - [LinkedIn](https://www.linkedin.com/in/erzengrega/))

# Preview

<p>
<img src="images/readMeGif.gif" />
</p>

# Getting started

1. Clone the repo

```
git clone https://github.com/GregaE/soundAssembly.git
```

2. Install backend dependencies and start server

```
cd server
npm install
npm run serve
```

3. Install frontend dependencies and start client

```
cd ..
cd client
npm install
npm start
```

4. Login via your Spotify Account and click on Update Library to import your followed artists

# Built with

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- Dependencies: [Spotify API](https://developer.spotify.com/documentation/web-api/)

# Added functionality from original project

1. Install the updated dependencies in both the client & server folders

```
cd client
npm install

cd server
npm install
```

2. Start the app by running the following command in 2 different terminals

```
cd client
npm start

cd server
npm run dev

```

3. For running e2e tests with Cypress [follow these instructions](https://docs.cypress.io/guides/getting-started/installing-cypress#Direct-download).

# Testing

Unit and integration testing ([JEST](https://jestjs.io/), [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)) , as well as e2e testing ([Cypress](https://www.cypress.io/)), were added to the project to help with development of new features.

# Refactoring

Most parts of the server, and large parts of the client, were refactored to TypeScript.

# Team

- [Natalie Pilling](https://github.com/pillllo)
- [James Foxlee](https://github.com/cortexlock)
