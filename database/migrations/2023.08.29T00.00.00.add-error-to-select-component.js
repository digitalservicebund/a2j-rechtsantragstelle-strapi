"use strict";

/**
 * what this migration is doing:
 TODO
 *
 */

async function up(knex) {
  try {
    const errorName = "selectionRequired";
    const errorId = (
      await knex("errors").select("id").where({ name: errorName })
    )
      .map((item) => item.id)
      .at(0);

    const selectComponentIds = (
      await knex("components_basic_selects").select("id")
    ).map((item) => item.id);

    const selectComponentWithErrorIds = (
      await knex("components_basic_selects_errors_links").select("id")
    ).map((item) => item.id);

    const selectComponentsWithoutErrorIds = selectComponentIds.filter(
      (id) => !selectComponentWithErrorIds.includes(id)
    );

    let count = 0;
    for (const id of selectComponentsWithoutErrorIds) {
      await knex("components_basic_selects_errors_links").insert({
        select_id: id,
        error_id: errorId,
        error_order: 1,
      });
      count++;
    }
    console.log(`Added ${count} row(s)`);
  } catch (error) {
    console.log("error occured during migration. Skipping migration");
    console.log(error);
  }
}

module.exports = { up };
