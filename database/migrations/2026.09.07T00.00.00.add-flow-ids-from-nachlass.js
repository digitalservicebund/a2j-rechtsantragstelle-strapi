"use strict";

/**
 * what this migration is doing:
 * For every page still linked to an old "/nachlass/..." flow_id, adds an
 * additional link to the corresponding new flow_id (same path without "/nachlass").
 */

const pageTableNames = ["form_flow_pages", "result_pages", "vorab_check_pages"];
const oldFlowIds = [
  "/nachlass/erbschein/wegweiser",
  "/nachlass/erbschein/nachlassgericht",
  "/nachlass/erbschein/anfrage",
  "/nachlass/erbausschlagung/anfrage",
  "/nachlass/erbausschlagung/gericht-finden",
  "/nachlass/erbschein/erbfolge",
];

async function up(knex) {
  let flowIdUpdateCounter = 0;
  try {
    for (const pageTableName of pageTableNames) {
      const linkTableName = `${pageTableName}_flow_ids_lnk`;
      console.log(`Processing table ${linkTableName}`);

      if (!(await knex.schema.hasTable(linkTableName))) {
        console.warn(`Table ${linkTableName} does not exist, skipping...`);
        continue;
      }

      const pageNameSingular = pageTableName.slice(0, -1); // slice off the 's'
      const pageIdCol = `${pageNameSingular}_id`;

      for (const oldFlowId of oldFlowIds) {
        const oldFlowRow = await knex("flow_ids")
          .where({ flow_id: oldFlowId })
          .first("id");

        if (!oldFlowRow) {
          console.warn(
            `Old flow ID ${oldFlowId} does not exist in flow_ids table, skipping...`,
          );
          continue;
        }

        const newFlowId = oldFlowId.replace("/nachlass", "");
        const newFlowRow = await knex("flow_ids")
          .where({ flow_id: newFlowId })
          .first("id");

        if (!newFlowRow) {
          console.warn(
            `New flow ID ${newFlowId} does not exist in flow_ids table, skipping...`,
          );
          continue;
        }

        const linkedPages = await knex(linkTableName).where({
          flow_id_id: oldFlowRow.id,
        });

        for (const { [pageIdCol]: id } of linkedPages) {
          const alreadyLinked = await knex(linkTableName)
            .where({ [pageIdCol]: id, flow_id_id: newFlowRow.id })
            .first();

          if (alreadyLinked) continue;

          const { maxFlowIdOrder } = await knex(linkTableName)
            .where({ [pageIdCol]: id })
            .max("flow_id_ord as maxFlowIdOrder")
            .first();

          await knex(linkTableName).insert({
            [pageIdCol]: id,
            flow_id_id: newFlowRow.id,
            flow_id_ord: (maxFlowIdOrder ?? 0) + 1,
          });
          flowIdUpdateCounter += 1;
        }
      }
    }
    console.log(`Updated ${flowIdUpdateCounter} flow ID links`);
  } catch (error) {
    console.error("Error occurred during migration:", error);
  }
}

module.exports = { up };
