// add doc

async function up(knex) {
  try {
    console.log("Processing renaming column 'description' to 'helper_text'");
    await knex.schema.table("components_basic_textareas", function (table) {
      table.renameColumn("description", "helper_text");
    });
    console.log("Successfully renamed column 'description' to 'helper_text'");
  } catch (error) {
    console.error("Error renaming column:", error);
  }
}
module.exports = { up };
