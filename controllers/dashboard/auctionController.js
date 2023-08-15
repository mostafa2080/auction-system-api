const db = require('../../db/models');
const Auction = db.Auction;
const createCrudFactory = require('../../utils/crudFactory');
const auctionCrud = createCrudFactory(Auction);

module.exports = {
  ...auctionCrud,
};
