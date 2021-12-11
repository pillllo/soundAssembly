# Sound Assembly

<p>
<img src="soundAssembly_image.png" />
</p>

Sound Assembly is an app for Spotify users which allows you to tag your followed artists and organise your music collection.

This Project was originally forked from Sound Assembly by Grega Erzen ([Github](https://github.com/GregaE) - [LinkedIn](https://www.linkedin.com/in/erzengrega/))

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
