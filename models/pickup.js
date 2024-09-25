const { DataTypes } = require('sequelize');

const STATUS = {
  PENDING: 0,
  ACCEPTED: 1,
  COMPLETED: 2
};

const Pickup = (sequelize) => sequelize.define('Pickup', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'completed'),
      allowNull: false,
      defaultValue: 'pending' // 기본 값 설정
    },
    accepted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    picked_up_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true // 빈 문자열을 허용하지 않음
      }
    },
    detailed_address: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true // 빈 문자열을 허용하지 않음
      }
    }
    }, {
        tableName: 'pickup',
        timestamps: false       //ture
    }
);

module.exports = Pickup;
