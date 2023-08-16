'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id', // Use snake_case here
      });

      models.User.hasMany(this, {
        foreignKey: 'user_id',
      });

      this.belongsTo(models.Item, {
        foreignKey: 'item_id', // Use snake_case here
      });

      models.Item.hasMany(this, {
        foreignKey: 'item_id',
      });

      this.belongsTo(models.Auction, {
        foreignKey: 'auction_id', // Use snake_case here
      });

      models.Auction.hasMany(this, {
        foreignKey: 'auction_id',
      });
    }
  }

  Bid.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      auction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bid',
    }
  );
  return Bid;
};
