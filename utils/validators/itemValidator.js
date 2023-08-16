const { body, param } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
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
    console.log(value); // This can be removed if not needed
    const item = await Item.findByPk(value);
    if (!item) {
      throw new Error('Item not found.');
    }
  }),
  validatorMw,
];

exports.deleteItemValidator = [
  param('id').custom(async (value, { req }) => {
    const item = await Item.findByPk(value);
    if (!item) {
      throw new Error('Item not found.');
    }
  }),
  validatorMw,
];
