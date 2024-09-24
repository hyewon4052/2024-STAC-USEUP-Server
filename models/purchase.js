const { DataTypes } = require('sequelize');

const STATUS = {
  PENDING: 0,
  SHIPPED: 1,
  DELIVERED: 2
};

const Purchase = (sequelize) => sequelize.define('Purchase', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product', 
        key: 'id'
      }
    },
    delivery_status: {
      type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
      allowNull: false,
      defaultValue: 'pending' // 기본 상태를 설정
    },
    purchased_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true // 빈 문자열 허용하지 않음
      }
    },
    detailed_address: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
    }, {
        tableName: 'purchase',
        timestamps: false,      // ture
        indexes: [
          {
            fields: ['product_id']
          }
        ]
    }
);

module.exports = Purchase;
  