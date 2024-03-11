"use strict";

/**
what this migration is doing:
It copies the title to the breadcrumb in components_page_meta_page_infos
*/

async function up(knex) {
  try {
    let counter = 0;

    const metaPageInfosWithoutBreadcrumb = await knex(
      "components_page_meta_page_infos"
    ).select("id", "title");

    if (
      await knex.schema.hasColumn(
        "components_page_meta_page_infos",
        "breadcrumb"
      )
    ) {
      metaPageInfosWithoutBreadcrumb.whereNull("breadcrumb");
      console.log(
        "Selecting non-null breadcrumb rows from components_page_meta_page_infos"
      );
    } else {
      await knex.schema.alterTable(
        "components_page_meta_page_infos",
        (table) => {
          table.string("breadcrumb").notNullable().defaultTo("");
        }
      );
      console.log("Added breadcrumb column to components_page_meta_page_infos");
    }

    for (const { id, title } of metaPageInfosWithoutBreadcrumb) {
      const breadcrumb = title || "";
      await knex("components_page_meta_page_infos").where({ id }).update({
        breadcrumb,
      });
      console.log(`Updated breadcrumb with value ${breadcrumb} for id ${id}`);
      counter++;
    }
    console.log(`Updated ${counter} rows`);
  } catch (error) {
    console.log("error occured during migration. Skipping migration");
    console.log(error);
  }
}

module.exports = { up };
