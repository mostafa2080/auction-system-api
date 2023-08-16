const db = require('../../db/models');
const BidCondition = db.Item_bid_condition;
const createCrudFactory = require('../../utils/crudFactory');
const itemBidConditionCrud = createCrudFactory(BidCondition);

module.exports = {
  ...itemBidConditionCrud,
};
