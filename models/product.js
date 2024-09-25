const { DataTypes } = require('sequelize');

const STATUS = {
  inactive: 0,
  active: 1
};

const Product = (sequelize) => sequelize.define('Product', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: true, // 빈 문자열 허용하지 않음
      }
    },
    product_status: {
      type: DataTypes.ENUM('inactive', 'active'),
      allowNull: false,
      defaultValue: 'active'
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 0  // 가격은 음수가 될 수 없음
      }
    }
    }, {
        tableName: 'product',
        timestamps: false,       //true
        indexes: [
          {
            unique: true,
            fields: ['product_name']
          }
        ]
    }
);

module.exports = Product;
