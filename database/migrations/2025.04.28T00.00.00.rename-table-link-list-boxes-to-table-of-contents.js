"use strict";

/**
 * Rename the component Link List Box to Table of Contents
 */

async function up(knex) {
  try {
    // Rename table
    await knex.schema.renameTable(
      "components_page_link_list_boxes_cmps",
      "components_page_table_of_contents_cmps",
    );

    // Rename table
    await knex.schema.renameTable(
      "components_page_link_list_boxes",
      "components_page_table_of_contents",
    );

    const pagesCmps = knex("pages_cmps");
    const pagesCmpsLinkListBox = pagesCmps.where({
      component_type: "page.link-list-box",
    });

    const changes = await pagesCmpsLinkListBox.update({
      component_type: "page.table-of-contents",
    });

    console.log(
      `Updated ${changes} pages with link-list-box to table-of-contents`,
    );
  } catch (error) {
    console.error(error);
    console.warn("Error occurred during migration. Skipping...");
  }
}

module.exports = { up };
