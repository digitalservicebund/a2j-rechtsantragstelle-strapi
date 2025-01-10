"use strict";

/**
 * what this migration is doing:
   Copies data from meta fields in pages, form-flow-pages, result-pages, and vorab-check-pages
   to their new pageMeta equivalents

   uses weird .raw syntax as it's currently not possible to create an INSERT INTO ... SELECT statement
   in knex
 */

async function up(knex) {
  try {
    const tables = [
      "pages_cmps",
      "form_flow_pages_cmps",
      "result_pages_cmps",
      "vorab_check_pages_cmps",
    ];
    const inserts = tables.map((collectionType) => {
      return knex(
        knex.raw("?? (??, ??, ??, ??)", [
          collectionType,
          "entity_id",
          "cmp_id",
          "component_type",
          "field",
        ]),
      ).insert(function () {
        this.select(
          "entity_id",
          "cmp_id",
          "component_type",
          knex.raw("?", ["pageMeta"]),
        )
          .from(collectionType)
          .where("field", "meta");
      });
    });
    const results = await Promise.all(inserts);
    results.forEach((result, idx) =>
      console.log(`${result.rowCount} rows inserted into table ${tables[idx]}.`),
    );
  } catch (error) {
    console.log("error occured during migration. Skipping migration");
    console.log(error);
  }
}

module.exports = { up };
