"use strict";

/**
Table result_pages has an id which has a foreign key entity_id in result_pages_cmps.
components_page_meta_page_infos has an id which has a foreign key cmp_id in result_pages_cmps.

This migration copies the content of columns title and breadcrumb
from components_page_meta_page_infos to the columns pageTitle and breadcrumb in table result_pages.
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
      const columnBreadcrumbExists = await knex.schema.hasColumn(
        flowPageTable,
        "breadcrumb",
      );
      if (!columnBreadcrumbExists) {
        await knex.schema.alterTable(flowPageTable, function (table) {
          table.string("breadcrumb");
        });
      }

      const flowPageComponentTableName = `${flowPageTable}_cmps`;

      await knex(flowPageTable).update({
        page_title: knex("components_page_meta_page_infos")
          .select("components_page_meta_page_infos.title")
          .join(
            flowPageComponentTableName,
            "components_page_meta_page_infos.id",
            flowPageComponentTableName + ".cmp_id",
          )
          .whereRaw(
            `${flowPageComponentTableName}.entity_id = ${flowPageTable}.id`,
          )
          .limit(1),
      });

      await knex(flowPageTable).update({
        breadcrumb: knex("components_page_meta_page_infos")
          .select("components_page_meta_page_infos.breadcrumb")
          .join(
            flowPageComponentTableName,
            "components_page_meta_page_infos.id",
            flowPageComponentTableName + ".cmp_id",
          )
          .whereRaw(
            `${flowPageComponentTableName}.entity_id = ${flowPageTable}.id`,
          )
          .limit(1),
      });
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
