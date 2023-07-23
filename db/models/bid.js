"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);

      models.User.hasMany(this, {
        foreignKey: "user_id",
      });

      this.belongsTo(models.Item);

      models.Item.hasMany(this, {
        foreignKey: "item_id",
      });

      this.belongsTo(models.Auction);

      models.Auction.hasMany(this, {
        foreignKey: "auction_id",
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
      modelName: "Bid",
    }
  );
  return Bid;
};
