const db = require('../../db/models');
const Admin = db.Admin;
const createCrudFactory = require('../../utils/crudFactory');
const adminCrud = createCrudFactory(Admin);

module.exports = {
  ...adminCrud,
};
