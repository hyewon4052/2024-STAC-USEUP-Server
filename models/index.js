const sequelize = require('../config/sequelize')   

const Customer = require('./customer')(sequelize);
const Pickup = require('./pickup')(sequelize);
const Product = require('./product')(sequelize);
const Purchase = require('./purchase')(sequelize);
const Inquiry = require('./inquiry')(sequelize);

Product.hasMany(Purchase, { foreignKey: 'product_id' });
Purchase.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Customer,
  Pickup,
  Product,
  Purchase,
  Inquiry
}