const express = require('express');

const {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
  restoreById,
} = require('../../controllers/dashboard/auctionController');
const {
  createAuctionValidator,
  updateAuctionValidator,
  getAuctionByIdValidator,
  deleteAuctionValidator,
} = require('../../utils/validators/auctionValidator');

const router = express.Router();

router.route('/').get(getAll).post(createAuctionValidator, createOne);
router
  .route('/:id')
  .get(getAuctionByIdValidator, getById)
  .put(updateAuctionValidator, updateById)
  .delete(deleteAuctionValidator, deleteById);

module.exports = router;
