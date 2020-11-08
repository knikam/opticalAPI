  var router = require('express').Router();
  const checkups = require("../_controllers/checkup.controller.js");

  // Create a new checkup
  router.post("/", checkups.create);

  // Retrieve all checkups
  router.get("/", checkups.findAll);

  // Retrieve a single checkup with checkupId
  router.get("/:checkupId", checkups.findOne);

  // Update a checkup with checkupId
 // router.put("/:checkupId", checkups.update);

  // Delete a checkup with checkupId
  router.delete("/:checkupId", checkups.delete);

  // Create a new checkup
  router.delete("/", checkups.deleteAll);

  module.exports = router;