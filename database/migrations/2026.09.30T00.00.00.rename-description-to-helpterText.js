// add doc

async function up(knex) {
  try {
    const hasDescriptionColumn = await knex.schema.hasColumn(
      "components_basic_textareas",
      "description",
    );
    const hasHelperTextColumn = await knex.schema.hasColumn(
      "components_basic_textareas",
      "helper_text",
    );

    console.log("Processing renaming column 'description' to 'helper_text'");
    
    if (hasDescriptionColumn && !hasHelperTextColumn) {
      await knex.schema.table("components_basic_textareas", function (table) {
        table.renameColumn("description", "helper_text");
      });
    }
    console.log("Successfully renamed column 'description' to 'helper_text'");
  } catch (error) {
    console.error("Error renaming column:", error);
  }
}
module.exports = { up };
