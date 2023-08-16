const db = require('../../db/models');
const Item = db.Item;
const createCrudFactory = require('../../utils/crudFactory');
const itemCrud = createCrudFactory(Item);

module.exports = {
  ...itemCrud,
};
