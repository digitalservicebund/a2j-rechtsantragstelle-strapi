const request = require("supertest");

it("should return users data for authenticated user", async () => {
  const defaultRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({}, []);

  const mockUserData = {
    username: "tester",
    email: "tester@strapi.com",
    provider: "local",
    password: "1234abc",
    confirmed: true,
    blocked: null,
    role: defaultRole.id,
  };

  /** Creates a new user and push to database */
  const user = await strapi.plugins["users-permissions"].services.user.add(
    mockUserData
  );
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  const paragraphs = [{ id: 1, text: "asd" }];
  const data = {
    publishedAt: new Date(),
    paragraphs,
  };
  await strapi.entityService.create("api::footer.footer", { data });

  await request(strapi.server.httpServer)
    .get("/api/footer?populate=deep&locale=all")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.data[0].attributes).toBeDefined();
      expect(data.body.data[0].attributes.paragraphs).toEqual(paragraphs);
    });
});
