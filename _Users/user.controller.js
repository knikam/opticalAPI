const User = require("../_Users/user.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!",
    });
  }

  //create user JSON
  const customer = new User({
    name: req.body.name,
    address: req.body.address,
    email_id: req.body.email_id,
    mobile_number: req.body.mobile_number,
    password: req.body.password,
    registration_no: req.body.registration_no,
    shop_name: req.body.shop_name,
    shop_gst_no: req.body.shop_gst_no,
    create_at: new Date(),
  });

  User.create(customer, (err, data) => {
    if (err) {
      if (err.kind === "already_exist") {
        res.status(500).send({
          status: false,
          message: "username already exist",
        });
        return;
      }

      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    } else {
      res.status(200).send({
        status: true,
        data: data,
        message: "Create user successfully.",
      });
    }
  });
};

exports.validate = (req, res) => {
  User.validate(req.body.username, req.body.password, (err, data, token) => {
    if (err) {
      if (err.kind === "id_not_found")
        res.status(401).send({
          status: false,
          message: "username not found.",
        });
      if (err.kind === "password_not_found")
        res.status(401).send({
          status: false,
          message: "password is incorrect.",
        });
      if (err.kind === "not_found")
        res.status(401).send({
          status: false,
          message: "something went to wrong.",
        });
    } else
      res.status(200).send({
        status: true,
        data: data,
        token: token,
        message: "Login successfully.",
      });
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else
      res.send({
        status: true,
        data: data,
        message: "Retrive customer successfully.",
      });
  });
};

exports.findByUsername = (req, res) => {
  User.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind == "not_found")
        res.status(404).send({
          status: false,
          message: "Not found user with username" + req.params.username,
        });
      else
        res.status(500).send({
          status: false,
          message: "Error retrieving user with username " + req.params.username,
        });
    } else {
      res.send({
        status: true,
        data: data,
        message: "Retrive user with username " + req.params.username,
      });
    }
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error retrieving user with id " + req.params.userId,
        });
      }
    } else
      res.send({
        status: true,
        data: data,
        message: "Retrive user with Id" + req.params.userId,
      });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!",
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Customer with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error updating Customer with id " + req.params.userId,
        });
      }
    } else
      res.send({
        status: true,
        data: data,
        message: "Update user with Id " + req.params.userId,
      });
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Customer with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Could not delete Customer with id " + req.params.userId,
        });
      }
    } else
      res.send({
        status: true,
        message: `Customer was deleted successfully!`,
      });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else
      res.status(200).send({
        status: true,
        data: data,
        message: `All Users were deleted successfully!`,
      });
  });
};

