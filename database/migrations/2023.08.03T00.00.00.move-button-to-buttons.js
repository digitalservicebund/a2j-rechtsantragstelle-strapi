"use strict";

/**
 * what this migration is doing:
 * if button exists and no buttons -> make the one button the first of the buttons
 *
 * what we need to do afterwards:
 * delete the button property from the schemas -> will remove the column from the db
 *
 */

async function up(knex) {
  if (process.env.NODE_ENV === "test") {
    return;
  }
  console.log("migration: move button to buttons");

  const components_with_button_and_buttons = [
    "boxes",
    "link_list_boxes",
    "info_box_items",
  ];

  let changed = 0;

  for (const component of components_with_button_and_buttons) {
    const componentIds = await knex(`components_page_${component}`).select(
      "id"
    );
    for (const { id: componentId } of componentIds) {
      const nestedComponents = await knex(
        `components_page_${component}_components`
      )
        .select("*")
        .where({ entity_id: componentId });
      const buttonExists = nestedComponents.some(
        (row) => row.field === "button"
      );
      const buttonsExist = nestedComponents.some(
        (row) => row.field === "buttons"
      );

      if (buttonExists && !buttonsExist) {
        // change field "button" to "buttons"
        const changedDatasetCount = await knex(
          `components_page_${component}_components`
        )
          .where({ entity_id: componentId, field: "button" })
          .update({ field: "buttons" });
        changed += changedDatasetCount;
        console.log({ changedDatasetCount, componentId, component });
      }
    }
  }
  console.log({ changed });
}

module.exports = { up };
