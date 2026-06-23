"use strict";

/**
 * what this migration is doing:
 * Ensures the pre_selected column exists on components_basic_select_options table
 * and sets all existing rows to preSelected=false
 */

async function up(knex) {
  try {
    const selectOptionTable = "components_basic_select_options";

    // Step 1: Add the column if it doesn't exist
    const columnExists = await knex.schema.hasColumn(
      selectOptionTable,
      "pre_selected"
    );

    if (!columnExists) {
      console.log(
        `Column "pre_selected" does not exist. Creating it...`
      );
      await knex.schema.table(selectOptionTable, (table) => {
        table.boolean("pre_selected").defaultTo(false);
      });
      console.log(`Column "pre_selected" created successfully.`);
    }

    // Step 2: Update all rows to false using Knex query builder
    // This handles both NULL values and any existing true values
    const updated = await knex(selectOptionTable).update({
      pre_selected: false,
    });

    console.log(
      `Updated ${updated} SelectOption row(s) to preSelected = false`
    );
  } catch (error) {
    console.error("Error occurred during migration:", error);
  }
}

module.exports = { up };
