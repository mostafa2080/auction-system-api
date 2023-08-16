'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z ]{3,}$/,
        },
      },
      material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      winner_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      sold_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('available', 'sold'),
        defaultValue: 'available',
      },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
