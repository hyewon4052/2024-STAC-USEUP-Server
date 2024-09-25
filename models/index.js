const sequelize = require('../config/sequelize')   

const Customer = require('./customer')(sequelize);
const Pickup = require('./pickup')(sequelize);
const Product = require('./product')(sequelize);
const Purchase = require('./purchase')(sequelize);

Product.hasMany(Purchase, { foreignKey: 'product_id' });
Purchase.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Customer,
  Pickup,
  Product,
  Purchase
}