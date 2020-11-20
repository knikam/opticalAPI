var router = require("express").Router();
const user = require("../_Users/user.controller.js");

// Create a new user
router.post("/", user.create);

// Retrieve all users
router.get("/", user.findAll);

// Retrieve a single user with userId
router.get("/:userId", user.findOne);

// Update a user with userId
router.put("/:userId", user.update);

// Delete a user with userId
router.delete("/:userId", user.delete);

// Create a new user
router.delete("/", user.deleteAll);

module.exports = router;
