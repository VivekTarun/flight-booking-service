'use strict';
const { Model } = require('sequelize');
const { Enums } = require('../utils/common');
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Booking.belongsTo(models.Flight, { foreignKey: 'flightId', as: 'flight' });
      // Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Booking.init(
    {
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Flights',
        //   key: 'id',
        // },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Users',
        //   key: 'id',
        // },
      },
      status: {
        type: DataTypes.Enums,
        values: [BOOKED, CANCELLED, INITIATED, PENDING],
        defaultValue: INITIATED,
        allowNull: false
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'Bookings', // Explicitly set the table name to match the migration
      timestamps: true, // Ensure createdAt and updatedAt are managed
    }
  );

  return Booking;
};
