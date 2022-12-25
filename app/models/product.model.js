module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    product_name: {
      type: Sequelize.STRING
    },
    uom: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    }
  });

  return Product;
};