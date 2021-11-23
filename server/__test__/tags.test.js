const express = require('express'); // added
const router = require ('../router'); // added
const supertest = require('supertest');
const Library = require('../model/librarySchema.js');

const mongoose = require('mongoose');
const databaseName = 'sound-assembly-test'; // added

describe('Tags integration test', () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://localhost:27017`;
    mongoose.connect(url, { dbName: databaseName });
    const db = mongoose.connection;
    db.on('error', () => console.log('error'));
    db.once('open', () => console.log('connected to DB'))
  });


  beforeEach(async () => {
    const userLibrary = await Library.create({
      username: process.env.USER_NAME,
      tags: [{ name: "Indie" }, { name: "Rock" }, { name: "Pop" }],
      artists: [
        {
          id: 0,
          artistTags: [{ name: "Indie" }, { name: "Rock" }],
          name: "Rick",
          images: [
            {
              url: "https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg",
            },
          ],
        },
        {
          id: 1,
          artistTags: [{ name: "Indie" }],
          name: "Nick",
          images: [
            {
              url: "https://www.sundaypost.com/wp-content/uploads/sites/13/2019/05/5ce7a7c4148740.04326664-e1558705666850-574x372.jpg",
            },
          ],
        }],
    });
  })

  // afterEach(async () => {
  //   await Library.deleteMany();
  // })

  it('should save a tag to the database', async (done) => {
    const tag = {name: 'Classic'}
    const res = await request.post('/tags').send(tag)
    // const res = await request.get('/getlibrary')
    console.log('response', res)
  })

})