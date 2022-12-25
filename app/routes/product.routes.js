

module.exports = app => {
  const products = require("../controllers/product.controller.js");
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
  router.post("/",  [authJwt.verifyToken, authJwt.isAdmin], products.create);

  // Retrieve all products
  router.get("/",  products.findAll);

  

  // Retrieve a single Tutorial with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.findOne);

  // Update a Tutorial with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.update);

  // Delete a Tutorial with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.delete);

  // Delete all products
  router.delete("/", [authJwt.verifyToken, authJwt.isModerator], products.deleteAll);

  app.use('/api/products', router);
};