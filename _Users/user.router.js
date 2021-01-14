var router = require("express").Router();
const user = require("../_Users/user.controller.js");
const verifyToken = require("../__Middleware/verifyToken");

// Create a new user
router.post("/", user.create);

// Retrieve all users
router.get("/",verifyToken.checkToken, user.findAll);

// Retrieve a single user with userId
router.get("/:userId",verifyToken.checkToken, user.findOne);

// Update a user with userId
router.put("/:userId",verifyToken.checkToken, user.update);

// Delete All Users
router.delete("/",verifyToken.checkToken, user.deleteAll);  

// Delete a user with userId
router.delete("/:userId",verifyToken.checkToken, user.delete);

// login user
router.post("/login", user.validate);

// Retrieve a single user with username
router.get("/username/:username",verifyToken.checkToken, user.findByUsername);

module.exports = router;
