const { body, param, check } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const db = require('../../db/models');
const User = db.User;

exports.signUpValidator = [
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
  check('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirmation) {
        throw new Error('password does not match');
      }
      return true;
    }),
  check('passwordConfirmation')
    .notEmpty()
    .withMessage('password confirmation required'),
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

exports.loginValidator = [
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address'),

  check('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters'),
  validatorMw,
];

exports.forgotPasswordValidator = [
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address'),
    validatorMw,
];
