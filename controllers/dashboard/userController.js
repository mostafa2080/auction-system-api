const db = require('../../db/models');
const User = db.User;
const createCrudFactory = require('../../utils/crudFactory');
const userCrud = createCrudFactory(User);

module.exports = {
  ...userCrud,
};
