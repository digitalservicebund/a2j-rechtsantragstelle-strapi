"use strict";

/**
 * what this migration is doing:
 * Sets preSelected=false for all existing SelectOption instances that are linked
 * to other components. If no link table is found, it updates all SelectOption rows.
 */

async function up(knex) {
  try {
    const selectOptionTable = "components_basic_select_options";

    const linkTableRows = await knex
      .select("table_name")
      .from("information_schema.tables")
      .where({ table_schema: "public" })
      .where("table_name", "like", "%select_options_links");

    const linkTables = linkTableRows.map((row) => row.table_name);

    const linkedOptionIds = new Set();

    for (const tableName of linkTables) {
      const columnRows = await knex
        .select("column_name")
        .from("information_schema.columns")
        .where({ table_schema: "public", table_name: tableName });

      const columnNames = columnRows.map((row) => row.column_name);
      const optionIdColumn = columnNames.find(
        (columnName) =>
          columnName === "select_option_id" ||
          (columnName.includes("select_option") && columnName.endsWith("_id")),
      );

      if (!optionIdColumn) {
        continue;
      }

      const idRows = await knex(tableName)
        .distinct(`${optionIdColumn} as id`)
        .whereNotNull(optionIdColumn);

      idRows.forEach((row) => linkedOptionIds.add(row.id));
    }

    let updated;

    if (linkedOptionIds.size > 0) {
      updated = await knex(selectOptionTable)
        .whereIn("id", Array.from(linkedOptionIds))
        .update({ pre_selected: false });

      console.log(
        `Updated ${updated} linked SelectOption row(s) to preSelected = false`,
      );
      return;
    }

    updated = await knex(selectOptionTable).update({ pre_selected: false });
    console.log(
      `No SelectOption link table data found; updated ${updated} total SelectOption row(s) to preSelected = false`,
    );
  } catch (error) {
    console.error("Error occurred during migration. Skipping...", error);
  }
}

module.exports = { up };
