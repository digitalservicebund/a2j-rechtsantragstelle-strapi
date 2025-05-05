"use strict";

/**
 * Rename the component Header to Hero
 */

async function up(knex) {
  try {
    // Rename table
    await knex.schema.renameTable(
      "components_page_headers_cmps",
      "components_page_hero_cmps",
    );

    // Rename table
    await knex.schema.renameTable(
      "components_page_headers",
      "components_page_hero",
    );

    const pagesCmps = knex("pages_cmps");
    const pagesCmpsHeader = pagesCmps.where({
      component_type: "page.header",
    });

    const changes = await pagesCmpsHeader.update({
      component_type: "page.hero",
    });

    console.log(`Updated ${changes} pages with header to hero`);
  } catch (error) {
    console.error(error);
    console.warn("Error occurred during migration. Skipping...");
  }
}

module.exports = { up };
