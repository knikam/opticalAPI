const User = require("../_Users/user.model");

exports.create = (req, res)=>{
    // Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //create user JSON
    const customer = new User({
        name : req.body.name,
        address : req.body.address,
        email_id : req.body.email_id,
        mobile_number : req.body.mobile_number,
        password : req.body.password,
        registration_no : req.body.registration_no,
        shop_name : req.body.shop_name,
        shop_gst_no : req.body.shop_gst_no,
        create_at : new Date()
    })

   User.create(customer, (err, data)=>{
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        }else{
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
   User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
   User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
   // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
   User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.userId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};