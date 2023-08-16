'use strict';
const { Model } = require('sequelize');
const ApiError = require('../../utils/apiError');

module.exports = (sequelize, DataTypes) => {
  class Item_bid_condition extends Model {
    static associate(models) {
      this.belongsTo(models.Auction, {
        foreignKey: 'auction_id',
      });

      this.belongsTo(models.Item, {
        foreignKey: 'item_id',
      });
    }
  }

  Item_bid_condition.init(
    {
      item_id: DataTypes.INTEGER,
      auction_id: DataTypes.INTEGER,
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      start_amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      minimum_bidding_amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      current_high_bid: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      close_price: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      duration: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Item_bid_condition',
      hooks: {
        beforeUpdate: async (item_bid_condition, options) => {
          const auction = await sequelize.models.Auction.findByPk(
            item_bid_condition.auction_id
          );
          if (auction.isActive)
            throw new ApiError(
              "can't update the bidding condition after the auction is activated",
              400
            );
        },
      },
    }
  );
  return Item_bid_condition;
};
