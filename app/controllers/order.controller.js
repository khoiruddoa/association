const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a customer
      const order = {
        customer_id: req.body.customer_id,
       product_id: req.body.product_id,
      date: req.body.date,
      status: req.body.status
      };
    
      // Save Tutorial in the database
      Order.create(order)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
  
};

exports.findAll = (req, res) => {
 

  Order.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  
};




exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find order with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
  
};


exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
  
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete customer with id=" + id
      });
    });
  
};


exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} customer were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customer."
      });
    });
  
};

