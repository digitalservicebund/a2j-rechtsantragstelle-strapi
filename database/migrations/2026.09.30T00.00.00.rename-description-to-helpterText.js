// add doc

async function up(knex) {
  try {
    console.log("Processing renaming column 'description' to 'helperText'");
    await knex.schema.table("components_basic_textareas", function (table) {
      table.renameColumn("description", "helperText");
    });
    console.log("Successfully renamed column 'description' to 'helperText'");
  } catch (error) {
    console.error("Error renaming column:", error);
  }
}
module.exports = { up };
