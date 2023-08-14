// import get all users controller from controllers\dashboard\userController.js
// import create user controller from controllers\dashboard\userController.js

const express = require('express');
const {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
  restoreById,
} = require('../../controllers/dashboard/userController');

const { createUserValidator } = require('../../utils/validators/userValidator');
const router = express.Router();

router.route('/').get(getAll).post(createUserValidator, createOne);
router
  .route('/:id')
  .get(getById)
  .put(updateById)
  .delete(deleteById)
  .post(restoreById);

module.exports = router;
