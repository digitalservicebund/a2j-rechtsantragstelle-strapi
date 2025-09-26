"use strict";

/**
This migration will do the following:
- create table if it doesn't exist: components_page_meta_page_info_flows
- identify the cpm_id in the above tables where the component_type field is page.meta-page-info
- for every cpm_id, get the data of fields title and breadcrumb from table componnents_page_meta_page_infos
- copy this data to componnents_page_meta_page_info_flows
- insert the new cpm_id into the above tables and replace the component_type field with page.meta-page-info-flows
- delete the old etries in the above tables
*/

async function up(knex) {
  const flowPageTableNames = [
    "form_flow_pages_cmps",
    "result_pages_cmps",
    "vorab_check_pages_cmps",
  ];

  try {
    console.time("Remove meta fields in flow pages - migration execution time");

    const tableExists = await knex.schema.hasTable(
      "components_page_meta_page_info_flows",
    );
    if (!tableExists) {
      await knex.schema.createTableIfNotExists(
        "components_page_meta_page_info_flows",
        (table) => {
          table.increments("id").primary();
          table.string("title");
          table.text("breadcrumb");
        },
      );
    }

    for (const flowPageTable of flowPageTableNames) {
      let counter = 0;
      const cmpIds = await knex(flowPageTable)
        .select("cmp_id")
        .where({ component_type: "page.meta-page-info" });

      for (const { cmp_id } of cmpIds) {
        const oldData = await knex("components_page_meta_page_infos")
          .select("title", "breadcrumb")
          .where({ id: cmp_id })
          .first();

        if (oldData) {
          const [newCmpId] = await knex("components_page_meta_page_info_flows")
            .insert(oldData)
            .returning("id");

          await knex(flowPageTable)
            .where({ cmp_id, component_type: "page.meta-page-info" })
            .update({
              cmp_id: newCmpId.id,
              component_type: "page.meta-page-info-flow",
            });

          await knex(flowPageTable).where({ cmp_id }).del();

          counter++;
        }
      }
      console.log(`Updated ${counter} rows in table ${flowPageTable}`);
    }
    console.timeEnd(
      "Remove meta fields in flow pages - migration execution time",
    );
  } catch (error) {
    console.log("error occured during migration. Skipping migration");
    console.error(error);
  }
}
module.exports = { up };
