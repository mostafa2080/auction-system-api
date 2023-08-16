const express = require('express');

const {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
} = require('../../controllers/dashboard/itemController');
const {
  createItemValidator,
  updateItemValidator,
  getItemByIdValidator,
  deleteItemValidator,
} = require('../../utils/validators/itemValidator');

const router = express.Router();

router.route('/').get(getAll).post(createItemValidator, createOne);
router
  .route('/:id')
  .get(getItemByIdValidator, getById)
  .put(updateItemValidator, updateById)
  .delete(deleteItemValidator, deleteById);

module.exports = router;
