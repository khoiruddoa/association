

module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
  const { authJwt } = require("../middleware");
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Tutorial
  router.post("/",  [authJwt.verifyToken, authJwt.isAdmin], customers.create);

  // Retrieve all customers
  router.get("/",  customers.findAll);

  

  // Retrieve a single Tutorial with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], customers.findOne);

  // Update a Tutorial with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], customers.update);

  // Delete a Tutorial with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], customers.delete);

  // Delete all customers
  router.delete("/", [authJwt.verifyToken, authJwt.isModerator], customers.deleteAll);

  app.use('/api/customers', router);
};