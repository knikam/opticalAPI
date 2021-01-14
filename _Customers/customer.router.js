var router = require("express").Router();
const customers = require("../_Customers/customer.controller.js");

// Create a new Customer
router.post("/", customers.create);

// Retrieve all Customers
router.get("/", customers.findAll);

// Retrieve a single Customer with customerId
router.get("/:customerId", customers.findOne);

// Update a Customer with customerId
router.put("/:customerId", customers.update);

// Delete a Customer with customerId
router.delete("/:customerId", customers.delete);

// Create a new Customer
router.delete("/", customers.deleteAll);

// Find by contact detail
router.get("/customerByContact/:contactId", customers.findByContact);

// Find By name pattern
router.get("/customerByName/:name", customers.findByName);

// Find By Date
router.get("/customerByDates/:startDate/:endDate", customers.findByDates);

module.exports = router;
