module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    customer_id: {
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return Order;
};