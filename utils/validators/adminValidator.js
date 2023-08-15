const { body, param } = require('express-validator');
const validatorMw = require('../../MiddleWares/validatorMw');
const db = require('../../db/models');
const Admin = db.Admin;

exports.createAdminValidator = [
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
      const adminWithEmail = await Admin.findOne({ where: { email: value } });

      if (adminWithEmail) {
        throw new Error('Email is already in use.');
      }

      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('image').isString().withMessage('Please Upload Your Image '),
  validatorMw,
];

exports.updateAdminValidator = [
  param('id').custom(async (value, { req }) => {
    const admin = await Admin.findByPk(value);
    if (!admin) {
      throw new Error('Admin not found.');
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
      const adminWithEmail = await Admin.findOne({ where: { email: value } });

      if (adminWithEmail && adminWithEmail.id != req.params.id) {
        throw new Error('Email is already in use.');
      }

      return true;
    })
    .optional(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
    .optional(),
  validatorMw,
];

exports.getAdminByIdValidator = [
  param('id').custom(async (value, { req }) => {
    console.log(value);
    const admin = await Admin.findByPk(value);
    if (!admin) {
      throw new Error('admin not found.');
    }
  }),
  validatorMw,
];

exports.deleteAdminValidator = [
  param('id').custom(async (value, { req }) => {
    console.log(value);
    const admin = await Admin.findByPk(value);
    if (!admin) {
      throw new Error('admin not found.');
    }
  }),
  validatorMw,
];

exports.restoreAdminValidator = [param('id'), validatorMw];
