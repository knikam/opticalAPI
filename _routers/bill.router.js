  var router = require('express').Router();
  const bills = require("../_controllers/bill.controller");

  // Create a new bill
  router.post("/", bills.create);

  // Retrieve all bills
  router.get("/", bills.findAll);

  // Retrieve a single bill with billId
  router.get("/:billId", bills.findOne);

  // Update a bill with billId
  //router.put("/:billId", bills.update);

  // Delete a bill with billId
  router.delete("/:billId", bills.delete);

  // Create a new bill
  router.delete("/", bills.deleteAll);

  module.exports = router;