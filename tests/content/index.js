const request = require("supertest");

describe("strapi app", () => {
  let jwt;
  let testUser;

  beforeAll(async () => {
    /** Creates a new user and push to database */
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

    const testUser =
      await strapi.plugins["users-permissions"].services.user.add(mockUserData);
    jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: testUser.id,
    });
  });

  afterAll(async () => {
    if (testUser) {
      await strapi.plugins["users-permissions"].services.user.delete(
        "plugin::users-permissions.user",
        testUser.id,
      );
    }
  });

  it("returns single type with pLevel and locale=de for authenticated users", async () => {
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
      .get("/api/footer?populate=*&pLevel=3")
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

  it("returns deeply nested forms", async () => {
    const contentEntry = {
      __component: "basic.heading",
      text: "heading",
      tagName: "h1",
      size: "large",
    };

    const errorEntry = {
      name: "errorName",
      errorCodes: [{ code: "errorCode", text: "errorText" }],
    };

    const errorEntity = await strapi.documents("api::error.error").create({
      data: errorEntry,
      status: "published",
    });

    await strapi.documents("api::vorab-check-page.vorab-check-page").create({
      data: {
        pageTitle: "pageTitle",
        stepId: "stepId",
        pre_form: [contentEntry],
        form: [
          {
            __component: "form-elements.textarea",
            name: "fieldName",
            errors: [errorEntity.id],
          },
        ],
      },
      status: "published",
    });

    await request(strapi.server.httpServer)
      .get("/api/vorab-check-pages?populate=*&pLevel=5")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + jwt)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        const entry = body.data[0];
        expect(entry.pageTitle).toBe("pageTitle");
        expect(entry.stepId).toBe("stepId");
        expect(entry.pre_form[0]).toMatchObject(contentEntry);
        expect(entry.form[0].errors[0]).toMatchObject(errorEntry);
      });
  });
});
