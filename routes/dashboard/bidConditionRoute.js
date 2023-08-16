const express = require('express');

const {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
  restoreById,
} = require('../../controllers/dashboard/bidConditionController');
const {
  createBidConditionValidator,
  updateBidConditionValidator,
} = require('../../utils/validators/itemBidConditionValidator');

const router = express.Router();

router.route('/').get(getAll).post(createBidConditionValidator, createOne);
router.route('/:id').get(getById).put(updateById).delete(deleteById);

module.exports = router;
