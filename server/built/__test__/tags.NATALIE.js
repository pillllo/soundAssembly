"use strict";
const express = require('express'); // added
const router = require('../router'); // added
const supertest = require('supertest');
// const createServer = require('./test-app.js');
const Library = require('../model/librarySchema.js');
const mongoose = require('mongoose');
const databaseName = 'sound-assembly-test'; // added
require('dotenv').config({ path: '.env.test' });
// const { DB_NAME } = process.env;
// console.log(`using DB_NAME: ${DB_NAME}`);
describe('Tags integration test', () => {
    const app = express();
    app.use(express.json());
    app.use(router);
    // const app = createServer();
    // app.listen(PORT, () => {
    //   console.log(`Test server running on port: ${PORT}`);
    // });
    const request = supertest(app);
    beforeAll(async () => {
        const url = `mongodb://localhost:27017`;
        await mongoose.connect(url, { dbName: databaseName });
    });
    beforeEach(async () => {
        const userLibrary = await Library.create({
            username: "TEST USER",
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
                }
            ],
        });
    });
    afterEach(async () => {
        await Library.deleteMany();
    });
    it('should save a tag to the database', async () => {
        const tag = { name: 'Classic' };
        const res = await request.post('/tags').send(tag);
        await supertest(app)
            .post('/tags');
        // console.log(updatedTags);
        // const { tags: updatedTags } = await Library.findOne({username: "TEST USER"})
        // expect(updatedTags.length).toEqual(3)
        // done()
    });
});
//# sourceMappingURL=tags.NATALIE.js.map