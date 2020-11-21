var router = require("express").Router();
const user = require("../_Users/user.controller.js");
const verifyToken = require("../__Middleware/verifyToken");

// Create a new user
router.post("/", user.create);

// Retrieve all users
router.get("/",verifyToken.checkToken, user.findAll);

// Retrieve a single user with userId
router.get("/:userId", user.findOne);

// Update a user with userId
router.put("/:userId", user.update);

// Delete a user with userId
router.delete("/:userId", user.delete);

// Delete All Users
router.delete("/", user.deleteAll);

// login user
router.post("/login", user.validate);

module.exports = router;
