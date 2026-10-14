// add doc

async function up(knex) {
  try {
    const dropdown = knex("components_form_elements_dropdowns");
    const updateDropdowns = await dropdown
      .where({ size: null, width: "characters16" })
      .update({ size: "small" });

    console.log(`Updated ${updateDropdowns} dropdowns with the size small`);
  } catch (error) {
    console.error("Error update dropdowns:", error);
  }
}
module.exports = { up };
