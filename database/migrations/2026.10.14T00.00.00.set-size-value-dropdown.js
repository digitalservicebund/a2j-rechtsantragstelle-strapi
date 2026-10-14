// add doc

const DROPDOWN_TABLE = "components_form_elements_dropdowns";

async function up(knex) {
  try {
    const dropdown = knex(DROPDOWN_TABLE);

    const columnTitleExists = await knex.schema.hasColumn(
      DROPDOWN_TABLE,
      "size",
    );
    if (!columnTitleExists) {
      await knex.schema.alterTable(DROPDOWN_TABLE, function (table) {
        table.string("size");
      });
    }

    const updateDropdownsSmall = await dropdown
      .where({ size: null, width: "characters16" })
      .update({ size: "small" });

    const updateDropdownsSmall2 = await dropdown
      .where({ size: null, width: "characters24" })
      .update({ size: "small" });

    const totalDropdownSmall = updateDropdownsSmall + updateDropdownsSmall2;

    console.log(`Updated ${totalDropdownSmall} dropdowns with the size small`);
  } catch (error) {
    console.error("Error update dropdowns:", error);
  }
}
module.exports = { up };
