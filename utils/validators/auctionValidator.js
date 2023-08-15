const { body, param } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const db = require('../../db/models');
const Auction = db.Auction;

exports.createAuctionValidator = [
  body('start_date').custom((value) => {
    const currentDate = new Date();
    if (
      new Date(value) <= new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
    ) {
      throw new Error('Start date must be at least 24 hours from now.');
    }
    return true;
  }),
  body('end_date')
    .custom((value) => {
      const currentDate = new Date();
      if (
        new Date(value) <= new Date(currentDate.getTime() + 25 * 60 * 60 * 1000)
      ) {
        throw new Error('End date must be at least 25 hours from now.');
      }
      return true;
    })
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error('End date must be after the start date.');
      }
      return true;
    }),
  body('entry_fees')
    .isInt({ min: 1 })
    .withMessage('Entry fees must be a positive integer.'),
  validatorMw,
];

exports.updateAuctionValidator = [
  param('id').custom(async (value, { req }) => {
    const auction = await Auction.findByPk(value);
    if (!auction) {
      throw new Error('Auction not found.');
    }
  }),
  body('start_date').custom((value) => {
    const currentDate = new Date();
    if (
      new Date(value) <= new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
    ) {
      throw new Error('Start date must be at least 24 hours from now.');
    }
    return true;
  }),
  body('end_date')
    .custom((value) => {
      const currentDate = new Date();
      if (
        new Date(value) <= new Date(currentDate.getTime() + 25 * 60 * 60 * 1000)
      ) {
        throw new Error('End date must be at least 25 hours from now.');
      }
      return true;
    })
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error('End date must be after the start date.');
      }
      return true;
    }),
  body('entry_fees')
    .isInt({ min: 1 })
    .withMessage('Entry fees must be a positive integer.'),
  validatorMw,
];

exports.getAuctionByIdValidator = [
  param('id').custom(async (value, { req }) => {
    const auction = await Auction.findByPk(value);
    if (!auction) {
      throw new Error('Auction not found.');
    }
  }),
  validatorMw,
];

exports.deleteAuctionValidator = [
  param('id').custom(async (value, { req }) => {
    const auction = await Auction.findByPk(value);
    if (!auction) {
      throw new Error('Auction not found.');
    }
  }),
  validatorMw,
];
