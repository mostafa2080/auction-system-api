const express = require('express');
const {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
  restoreById,
} = require('../../controllers/dashboard/adminController');

const {
  createAdminValidator,
  deleteAdminValidator,
  updateAdminValidator,
  getAdminByIdValidator,
  restoreAdminValidator,
} = require('../../utils/validators/adminValidator');
const router = express.Router();

router.route('/').get(getAll).post(createAdminValidator, createOne);
router
  .route('/:id')
  .get(getAdminByIdValidator, getById)
  .put(updateAdminValidator, updateById)
  .delete(deleteAdminValidator, deleteById)
  .post(restoreAdminValidator, restoreById);

module.exports = router;
