const { body, param } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const db = require('../../db/models');
const User = db.User;

exports.createUserValidator = [
  body('name')
    .isLength({ min: 3 })
    .withMessage(
      'Name must be at least 3 characters long and contain only letters and spaces.'
    )
    .isString(),
  body('email')
    .isEmail()
    .withMessage('Invalid email format.')
    .custom(async (value, { req }) => {
      const userWithEmail = await User.findOne({ where: { email: value } });

      if (userWithEmail && userWithEmail.id != req.params.id) {
        throw new Error('Email is already in use.');
      }

      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('phone')
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage(
      'Invalid phone number format. It should start with 010, 011, 012, or 015 followed by 8 digits.'
    )
    .custom(async (value, { req }) => {
      const userWithPhone = await User.findOne({ where: { phone: value } });

      if (userWithPhone && userWithPhone.id != req.params.id) {
        throw new Error('Phone number is already in use.');
      }

      return true;
    }),
  validatorMw,
];

exports.updateUserValidator = [
  param('id').custom(async (value, { req }) => {
    console.log(value);
    const user = await User.findByPk(value);
    if (!user) {
      throw new Error('User not found.');
    }
  }),
  body('name')
    .isLength({ min: 3 })
    .withMessage(
      'Name must be at least 3 characters long and contain only letters and spaces.'
    )
    .optional(),
  body('email')
    .isEmail()
    .withMessage('Invalid email format.')
    .custom(async (value, { req }) => {
      const userWithEmail = await User.findOne({ where: { email: value } });

      if (userWithEmail && userWithEmail.id != req.params.id) {
        throw new Error('Email is already in use.');
      }

      return true;
    })
    .optional(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
    .optional(),
  body('phone')
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage(
      'Invalid phone number format. It should start with 010, 011, 012, or 015 followed by 8 digits.'
    )
    .custom(async (value, { req }) => {
      const userWithPhone = await User.findOne({ where: { phone: value } });

      if (userWithPhone && userWithPhone.id != req.params.id) {
        throw new Error('Phone number is already in use.');
      }

      return true;
    })
    .optional(),
  validatorMw,
];
exports.getUserByIdValidator = [
  param('id').custom(async (value, { req }) => {
    console.log(value);
    const user = await User.findByPk(value);
    if (!user) {
      throw new Error('User not found.');
    }
  }),
  validatorMw,
];

exports.deleteUserValidator = [
  param('id').custom(async (value, { req }) => {
    console.log(value);
    const user = await User.findByPk(value);
    if (!user) {
      throw new Error('User not found.');
    }
  }),
  validatorMw,
];

exports.restoreUserValidator = [param('id'), validatorMw];
