const { previewConfig } = require("./preview");

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('API_TOKEN_SALT'),
    },
  },
  preview: previewConfig(env("CLIENT_URL"), env("PREVIEW_SECRET")),
});
