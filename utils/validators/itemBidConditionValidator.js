const { body } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const db = require('../../db/models');
const Auction = db.Auction;
const apiError = require('../apiError');

const auctionExistsById = async (value) => {
  const auction = await Auction.findByPk(value);
  if (!auction) {
    throw new apiError('Auction not found.', 404);
  }
};

exports.createBidConditionValidator = [
  body('item_id')
    .isInt({ min: 1 })
    .withMessage('Invalid item ID.')
    .custom(async (value) => {
      const item = await db.Item.findByPk(value);
      if (!item) {
        throw new apiError('Item not found.', 404);
      }
    }),
  body('auction_id')
    .isInt({ min: 1 })
    .withMessage('Invalid auction ID.')
    .custom(auctionExistsById),
  body('start_time').custom(async (value, { req }) => {
    const auction = await Auction.findByPk(req.body.auction_id);
    if (value < auction.start_date || value > auction.end_date - 3600000) {
      throw new apiError(
        'start_time must be after auction start_date and before auction end_date by at least 1 hour',
        400
      );
    }
  }),
  body('start_amount')
    .isInt({ min: 1 })
    .withMessage('Start amount must be a positive integer.'),
  body('minimum_bidding_amount')
    .isInt({ min: 1 })
    .withMessage('Minimum bidding amount must be a positive integer.')
    .custom((value, { req }) => {
      if (value >= req.body.start_amount * 0.25) {
        throw new apiError(
          'minimum_bidding_amount must be maximum 25% of start_amount',
          400
        );
      }
      return true;
    }),
  validatorMw,
];

exports.updateBidConditionValidator = [
  body('start_time')
    .custom(async (value, { req }) => {
      const auction = await Auction.findByPk(req.body.auction_id);
      if (value < auction.start_date || value > auction.end_date - 3600000) {
        throw new apiError(
          'start_time must be after auction start_date and before auction end_date by at least 1 hour',
          400
        );
      }
    })
    .optional(),
  body('minimum_bidding_amount')
    .isInt({ min: 1 })
    .withMessage('Minimum bidding amount must be a positive integer.')
    .custom((value, { req }) => {
      if (value >= req.body.start_amount * 0.25) {
        throw new apiError(
          'minimum_bidding_amount must be maximum 25% of start_amount',
          400
        );
      }
    })
    .optional(),
  validatorMw,
];
