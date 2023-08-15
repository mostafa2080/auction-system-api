const express = require('express');
const {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
  restoreById,
} = require('../../controllers/dashboard/userController');

const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  restoreUserValidator,
} = require('../../utils/validators/userValidator');
const router = express.Router();

router.route('/').get(getAll).post(createUserValidator, createOne);
router
  .route('/:id')
  .get(getUserByIdValidator, getById)
  .put(updateUserValidator, updateById)
  .delete(deleteUserValidator, deleteById)
  .post(restoreUserValidator, restoreById);

module.exports = router;
