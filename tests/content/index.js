const request = require("supertest");

it("returns single type with pLevel and locale=de for authenticated users", async () => {
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
  const user =
    await strapi.plugins["users-permissions"].services.user.add(mockUserData);
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  const paragraph = { text: "asd" };
  const link = { text: "Click Me", url: "http://test.link" };
  const categorizedLinks = [{ title: "Test Title", links: [link] }];

  await strapi.documents("api::footer.footer").create({
    data: {
      paragraphs: [paragraph],
      links: [link],
      categorizedLinks,
    },
    status: "published",
  });

  const response = await request(strapi.server.httpServer)
    .get("/api/footer?pLevel")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.data.paragraphs[0]).toMatchObject(paragraph);
      expect(data.body.data.categorizedLinks[0]).toMatchObject(
        categorizedLinks[0],
      );
    });
});
