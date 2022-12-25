const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a customer
      const customer = {
        name: req.body.name,
       address: req.body.address,
      telephone: req.body.telephone
      };
    
      // Save Tutorial in the database
      Customer.create(customer)
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
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Customer.findAll({ where: condition })
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

  Customer.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Customer with id=${id}.`
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

  Customer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
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

  Customer.destroy({
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
  Customer.destroy({
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

