const fs = require("fs");
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

beforeAll(async () => {
  console.log(`Running tests in NODE_ENV: ${process.env.NODE_ENV}`);
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});
require("./content");
