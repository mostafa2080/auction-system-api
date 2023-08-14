const { body } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');

// Define validation rules for user data
exports.createUserValidator = [
  body('name')
    .isLength({ min: 3 })
    .withMessage(
      'Name must be at least 3 characters long and contain only letters and spaces.'
    ),
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('phone')
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage(
      'Invalid phone number format. It should start with 010, 011, 012, or 015 followed by 8 digits.'
    ),
  validatorMw,
];

