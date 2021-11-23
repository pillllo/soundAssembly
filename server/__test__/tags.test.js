const dotenv = require("dotenv");

const dotEnvOutcome = dotenv.config({ path: ".env.test" });
if (dotEnvOutcome.error) {
  throw dotEnvOutcome.error;
}
// console.log(dotEnvOutcome.parsed);
const { DB_NAME, DB_URL, PORT } = process.env;

const supertest = require("supertest");
const mongoose = require("mongoose");
const createServer = require("./test-app.js");
const db = require("../src/model/dbaccess.js");
const Library = require("../src/model/librarySchema.js");

const app = createServer();
const request = supertest(app);
app.listen(PORT, () => {
  console.log(`Test server running on port: ${PORT}`);
});

describe("Tags integration test", () => {
  const testTag = { name: "TEST_TAG" };

  beforeEach(async () => {
    const userLibrary = await Library.create({
      username: "natpil",
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
        },
      ],
    });
  });

  afterEach(async () => {
    await Library.deleteMany();
  });

  it("should save a tag to the database", async () => {
    const tag = { name: "Classic" };
    const res = await request.post("/tags").send(tag);
    expect(res.body.length).toEqual(4);
    expect(res.body[3].name).toBe(tag.name);
  });
});
