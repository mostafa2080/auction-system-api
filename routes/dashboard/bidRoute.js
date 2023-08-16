const express = require('express');
const {
  getAll,
  getBidOfAuction,
  getBidOnItem,
  getBidsByAuctionAndItem,
} = require('../../controllers/dashboard/bidController');

const router = express.Router();

router.route('/').get(getAll);

router.route('/auction/:auctionId').get(getBidOfAuction);

router.route('/item/:itemId').get(getBidOnItem);

router.route('/auction/:auctionId/item/:itemId').get(getBidsByAuctionAndItem);

module.exports = router;
