"use strict";

/**
Table result_pages has an id which has a foreign key entity_id in result_pages_cmps.
components_page_meta_page_infos has an id which has a foreign key cmp_id in result_pages_cmps.

This migration copies the content of column title from components_page_meta_page_infos
to the column pageTitle in table result_pages.
*/

async function up(knex) {
  const flowPageTableNames = [
    "form_flow_pages",
    "result_pages",
    "vorab_check_pages",
  ];

  try {
    console.time("Copy meta fields in flow pages - migration execution time");

    for (const flowPageTable of flowPageTableNames) {
      const columnTitleExists = await knex.schema.hasColumn(
        flowPageTable,
        "page_title",
      );
      if (!columnTitleExists) {
        await knex.schema.alterTable(flowPageTable, function (table) {
          table.string("page_title");
        });
      }

      const flowPageComponentTableName = `${flowPageTable}_cmps`;

      await knex.raw(`
        UPDATE ${flowPageTable} f
        SET page_title = m.title
        FROM ${flowPageComponentTableName} c
        JOIN components_page_meta_page_infos m ON c.cmp_id = m.id
        WHERE f.id = c.entity_id
      `);
    }
    console.timeEnd(
      "Copy meta fields in flow pages - migration execution time",
    );
  } catch (error) {
    console.log("error occured during migration. Skipping migration");
    console.error(error);
  }
}
module.exports = { up };
