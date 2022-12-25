module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    }
  });

  return Customer;
};