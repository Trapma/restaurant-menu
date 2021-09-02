const knex = require("./knex");

//menu

function createMenu(menu) {
    return knex("menu").insert(menu);
}

async function getMenuId(id) {
    const menu = await knex("menu").where("id", id).select("*")

    const kind = await knex("kind_of_kitchen").where("id_menu", menu.id).select("*")
    const category = await knex("category").where("id_kind", kind.id).select("*")
    const type = await knex("type_of_dish").where("category_id", category.id).select("*")
    const dishes = await knex("dishes").where("type_id", type.id).select("*")

    const result = {
        menu,
        category,
        type,
        dishes
    }
    return result
}

//kind

function createKind(kind) {
    return knex("kind_of_kitchen").insert(kind);
}
function deleteKind(nameKind){
  return knex("kind_of_kitchen").where("name_kind", nameKind).del();
}

function getAllKind() {
    return knex("kind_of_kitchen").select("*")
}

//category

function createCategory(category) {
    return knex("category").insert(category)
}

function getAllCategory() {
    return knex("category").select("*")
}

//type

function createType(type) {
    return knex("type_of_dish").insert(type)
}

function getAllType() {
    return knex("type_of_dish").select("*")
}

function deleteType(nameType){
  return knex("type_of_dish").where("name_type", nameType).del();
}

//dishes

function createDish(dish) {
  return knex("dishes").insert(dish);
}

function gettAllDish() {
  return knex("dishes").select("*")
}

function deleteDish(id) {
  return knex("dishes").where("id", id).del();
}

function updateDish(id, dish) {
  return knex("dishes").where("id", id).update(dish);
}



module.exports = {
  //menu
  createMenu,
  getMenuId,

  //kind
  createKind,
  getAllKind,
  deleteKind,

  //category
  createCategory,
  getAllCategory,

  //type
  createType,
  getAllType,
  deleteType,

  //dish
  createDish,
  gettAllDish,
  deleteDish,
  updateDish,

};
