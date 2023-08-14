'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [/^[a-zA-Z ]{3,}$/],
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: {
            // args: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/],
          },
        },
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        exclude: true,
      },
      passwordResetExpires: {
        type: DataTypes.DATE,
        exclude: true,
      },

      phone: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [/^01[0125][0-9]{8}$/],
          },
        },
      },
      image: DataTypes.STRING,
      balance: { type: DataTypes.INTEGER, defaultValue: 0 },
      pending_balance: { type: DataTypes.INTEGER, defaultValue: 0 },
      false_bids: DataTypes.INTEGER,
      banned: DataTypes.DATE,
      is_active: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.banned < new Date();
        },
      },
    },

    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
