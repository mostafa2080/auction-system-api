const { body, param } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const db = require('../../db/models');
const Bid = db.Bid;
const Auction = db.Auction;
const Item = db.Item;

const bidExistsById = async (value) => {
  const bid = await Bid.findByPk(value);
  if (!bid) {
    throw new Error('Bid not found.');
  }
};

const auctionExistsById = async (value) => {
  const auction = await Auction.findByPk(value);
  if (!auction) {
    throw new Error('Auction not found.');
  }
};

const itemExistsById = async (value) => {
  const item = await Item.findByPk(value);
  if (!item) {
    throw new Error('Item not found.');
  }
};

exports.createBidValidator = [
  body('amount')
    .isInt({ min: 1 })
    .withMessage('Amount must be a positive integer.'),
  body('user_id')
    .isInt({ min: 1 })
    .withMessage('Invalid user ID.'),
  body('item_id')
    .isInt({ min: 1 })
    .withMessage('Invalid item ID.')
    .custom(itemExistsById),
  body('auction_id')
    .isInt({ min: 1 })
    .withMessage('Invalid auction ID.')
    .custom(auctionExistsById),
  validatorMw,
];

exports.updateBidValidator = [
  param('bidId').custom(bidExistsById),
  body('amount')
    .isInt({ min: 1 })
    .withMessage('Amount must be a positive integer.')
    .optional(),
  body('user_id')
    .isInt({ min: 1 })
    .withMessage('Invalid user ID.')
    .optional(),
  body('item_id')
    .isInt({ min: 1 })
    .withMessage('Invalid item ID.')
    .optional()
    .custom(itemExistsById),
  body('auction_id')
    .isInt({ min: 1 })
    .withMessage('Invalid auction ID.')
    .optional()
    .custom(auctionExistsById),
  validatorMw,
];

exports.getBidByIdValidator = [
  param('bidId').custom(bidExistsById),
  validatorMw,
];

exports.deleteBidValidator = [
  param('bidId').custom(bidExistsById),
  validatorMw,
];
