const {
  getFullPopulateObject,
} = require("strapi-v5-plugin-populate-deep/server/helpers");

module.exports = (plugin) => {
  // add pLevel parameter
  plugin.register = ({ strapi }) => {
    strapi.contentAPI.addQueryParams({
      pLevel: { schema: (z) => z.string().max(3).optional() },
    });
  };

  plugin.bootstrap = ({ strapi }) => {
    // Fetch config on startup
    const defaultDepth =
      strapi.plugin("strapi-v5-plugin-populate-deep")?.config("defaultDepth") ??
      5;

    strapi.db.lifecycles.subscribe((event) => {
      const { action, model, params } = event;

      // Skip if not matching db interaction
      if (!["beforeFindMany", "beforeFindOne"].includes(action)) return;
      // Skip if db query isn't targeting api::
      if (!model.uid.startsWith("api::")) return;
      // Skip if request url isn't api call
      const ctx = strapi.requestContext.get();
      if (!ctx?.request?.url?.startsWith("/api/")) return;

      const pLevel = params?.pLevel ?? ctx.query?.pLevel;
      if (pLevel === undefined) return;

      const depth = pLevel ? parseInt(pLevel, 10) : defaultDepth;
      params.populate = getFullPopulateObject(model.uid, depth, []).populate;
    });
  };
  return plugin;
};
