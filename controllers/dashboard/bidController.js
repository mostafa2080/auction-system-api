const db = require('../../db/models');
const Bid = db.Bid;
const createCrudFactory = require('../../utils/crudFactory');
const bidCrud = createCrudFactory(Bid);
const asyncHandler = require('express-async-handler');
const apiError = require('../../utils/apiError');

const getBidOfAuction = asyncHandler(async (req, res, next) => {
  const { auctionId } = req.params;
  const item = await Bid.findOne({ where: { auction_id: auctionId } });
  if (!item) {
    throw new apiError('No Bids On This Auction', 404);
  }
  res.status(200).json({ status: 'success', data: item });
});

const getBidOnItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const item = await Bid.findOne({ where: { item_id: itemId } });
  if (!item) {
    throw new apiError('No Bids On This Item', 404);
  }
  res.status(200).json({ status: 'success', data: item });
});

const getBidsByAuctionAndItem = asyncHandler(async (req, res, next) => {
  const { auctionId, itemId } = req.params;

  const bids = await Bid.findAll({
    where: {
      auction_id: auctionId,
      item_id: itemId,
    },
  });

  if (bids.length === 0) {
    throw new apiError('No Bids Found for this Auction and Item', 404);
  }

  res.status(200).json({ status: 'success', data: bids });
});

module.exports = {
  ...bidCrud,
  getBidOfAuction,
  getBidOnItem,
  getBidsByAuctionAndItem
};
