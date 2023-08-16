const { body, param } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const ApiError = require('../apiError');
const db = require('../../db/models');
const Item = db.Item;

exports.createItemValidator = [
  body('name')
    .matches(/^[a-zA-Z ]{3,}$/)
    .withMessage(
      'Name must be at least 3 characters long and contain only letters and spaces.'
    )
    .isString(),
  body('material').notEmpty().withMessage('Material is required.'),
  body('color').notEmpty().withMessage('Color is required.'),
  body('size').notEmpty().withMessage('Size is required.'),
  body('winner_id')
    .custom(async (value, { req }) => {
      const user = await db.User.findByPk(value);
      if (!user) {
        throw new ApiError('user not found', 404);
      }
    })
    .optional(),
  validatorMw,
];

exports.updateItemValidator = [
  body('name')
    .matches(/^[a-zA-Z ]{3,}$/)
    .withMessage(
      'Name must be at least 3 characters long and contain only letters and spaces.'
    )
    .optional(),
  body('material').notEmpty().withMessage('Material is required.').optional(),
  body('color').notEmpty().withMessage('Color is required.').optional(),
  body('size').notEmpty().withMessage('Size is required.').optional(),
  validatorMw,
];

exports.getItemByIdValidator = [
  param('id').custom(async (value, { req }) => {
    const item = await Item.findByPk(value);
    if (!item) {
      throw new ApiError('Item not found.', 404);
    }
  }),
  validatorMw,
];

exports.deleteItemValidator = [
  param('id').custom(async (value, { req }) => {
    const item = await Item.findByPk(value);
    if (!item) {
      throw new ApiError('Item not found.', 404);
    }
  }),
  validatorMw,
];
