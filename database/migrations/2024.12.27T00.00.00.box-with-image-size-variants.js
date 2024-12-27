"use strict";

/**
 * what this migration is doing:
   Switches existing "ImgMTextL" variant BoxWithImage instances to their new equivalents
 */

async function up(knex) {
  try {
    const result = await knex("components_page_box_with_images").whereNotNull('variant').update({
    variant: 'M'
    });
    console.log(`Updated ${result.length} row(s)`);
  } catch (error) {
    console.log("error occured during migration. Skipping migration");
    console.log(error);
  }
}

module.exports = { up };
