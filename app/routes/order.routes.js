

module.exports = app => {
  const orders = require("../controllers/order.controller.js");
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
  router.post("/",  [authJwt.verifyToken, authJwt.isAdmin], orders.create);

  // Retrieve all orders
  

  

  // Retrieve a single Tutorial with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], orders.findOne);

  // Update a Tutorial with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], orders.update);

  // Delete a Tutorial with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], orders.delete);

  // Delete all orders
  router.delete("/", [authJwt.verifyToken, authJwt.isModerator], orders.deleteAll);

  app.use('/api/orders', router);
};