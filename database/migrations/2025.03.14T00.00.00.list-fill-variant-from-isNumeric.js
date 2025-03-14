"use strict";

/**
 * The List component currently has a boolean field `isNumeric`.
 * We want to instead move to an enum field `variant` = `unordered` / `numbered` (to be extended later).
 * This migration fills the new `variant` field for all List components based on the value of `isNumeric`
 */

async function up(knex) {
  try {
    const lists = knex("components_page_lists");
    const listsWithVariantNull = lists.where({ variant: null });

    const changesNumbered = await listsWithVariantNull
      .where({ is_numeric: true })
      .update({ variant: "numbered" });

    const changesUnordered = await listsWithVariantNull
      .where({ is_numeric: false })
      .update({ variant: "unordered" });

    console.log(
      `Updated ${changesNumbered} lists to numbered and ${changesUnordered} lists to ordered`,
    );
  } catch (error) {
    console.error(error);
    console.warn("Error occurred during migration. Skipping...");
  }
}

module.exports = { up };
