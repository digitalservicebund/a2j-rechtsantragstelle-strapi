"use strict";

/**
This migration will loop through the tables listed in `pageTableNames` and check whether each entry has a `slug` field.
If there is a valid slug it will be split into a flowId & stepId.
The stepId is added directly to the entry, the flowId is created if previously unknown and a link entry is added in the corresponding `${pageTableName}_flow_ids_links` table.
*/

const pageTableNames = ["form_flow_pages", "result_pages", "vorab_check_pages"];

function splitSlug(slug) {
  const splitSlug = slug.split("/");
  if (splitSlug.length < 3 || !slug.startsWith("/")) {
    return undefined;
  }
  return {
    flow_id: `/${splitSlug[1]}/${splitSlug[2]}`,
    step_id: "/" + splitSlug.slice(3).join("/"),
  };
}

/**
 * @param {import('knex').Knex} knex
 */
async function up(knex) {
  try {
    let pageCounter = 0;
    let flowIdCounter = 0;
    let linkCounter = 0;

    for (const pageTableName of pageTableNames) {
      console.log(`Processing table ${pageTableName}`);

      // 1. Skip if table doesn't exist or doesn't contain slug column
      if (!(await knex.schema.hasTable(pageTableName))) {
        console.warn(`Table ${pageTableName} does not exist, skipping...`);
        continue;
      }
      if (!(await knex.schema.hasColumn(pageTableName, "slug"))) {
        console.warn(
          `Table ${pageTableName} exists but doesn't have column 'slug', skipping...`
        );
        continue;
      }

      for (const { id, slug } of await knex(pageTableName)) {
        const pageIds = splitSlug(slug);
        // 2. Skip entry if slug isn't valid
        if (!pageIds) continue;
        const { flow_id, step_id } = pageIds;

        // 3. Update step_id
        await knex(pageTableName).where({ id }).update({ step_id });
        pageCounter += 1;

        // 4. if flow_id doesn't exist, insert it into the flow_id table
        if ((await knex("flow_ids").where({ flow_id })).length === 0) {
          const currentTimestamp = knex.raw("CURRENT_TIMESTAMP");
          await knex("flow_ids").insert({
            flow_id,
            created_at: currentTimestamp,
            updated_at: currentTimestamp,
          });
          flowIdCounter += 1;
        }
        const flow_id_id = (
          await knex("flow_ids").where({ flow_id }).first("id")
        ).id;
        if (!flow_id_id) {
          console.error(`Could not find flow_id_id for ${flow_id}, skipping`);
          continue;
        }

        // 5. Link page id into flow_ids_links
        const linkTableName = `${pageTableName}_flow_ids_links`;
        if (!(await knex.schema.hasTable(linkTableName))) {
          console.warn(
            `Table ${linkTableName} does not exist, skipping linking flow id...`
          );
          continue;
        }
        const pageNameSingular = pageTableName.slice(0, -1); // slice off the 's'
        const pageIdCol = `${pageNameSingular}_id`;
        const pageOrderCol = `${pageNameSingular}_order`;

        if (
          (await knex(linkTableName).where({ [pageIdCol]: id })).length === 0
        ) {
          // 6. Insert link if it doesn't exist
          await knex(linkTableName).insert({
            [pageIdCol]: id,
            flow_id_id,
            flow_id_order: 1,
            [pageOrderCol]: 1,
          });
          linkCounter += 1;
        }
      }
      console.log(
        `Updated ${pageCounter} pages, added ${flowIdCounter} new flowIds and inserted ${linkCounter} links`
      );
    }
  } catch (error) {
    console.log(
      "The following error occured during migration, skipping migration..."
    );
    console.log(error);
  }
}

module.exports = { up };
