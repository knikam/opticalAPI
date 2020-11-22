const Customer = require("../_Customers/customer.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!",
    });
  }

  const customer = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    mobile_number: req.body.mobile_number,
    address: req.body.address,
    user_id: req.body.user_id,
  });

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else
      res.send({
        status: true,
        message: "Create Customer successfully.",
      });
  });
};

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
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
        message: "Retrive all customers successfully.",
      });
  });
};

exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error retrieving Customer with id " + req.params.customerId,
        });
      }
    } else
      res.send({
        status: true,
        data: data,
        message: "Retrive customer " + req.params.customerId,
      });
  });
};

exports.findByContact = (req, res) => {
  Customer.findByContact(req.params.contactId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          status: false,
          message: "Customer not found",
        });
      } else {
        res.status(404).send({
          status: false,
          message: err.message || "Something went to wrong",
        });
      }
      return;
    }

    res.status(200).send({
      status: true,
      data: data,
      message: "Retrive customer with " + req.params.contactId,
    });
  });
};

exports.findByName = (req, res) => {
  Customer.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          status: false,
          message: "Customer not found",
        });
      } else {
        res.status(404).send({
          status: false,
          message: err.message || "Something went to wrong",
        });
      }
      return;
    }
    res.status(200).send({
      status: true,
      data: data,
      message: "Retrive customer with " + req.params.name,
    });
  });
};

exports.findByDates = (req, res) => {
  Customer.findByDates(
    req.params.startDate,
    req.params.endDate,
    (err, data) => {
      if (err) {
        if (err.kind == "not_found") {
          res.status(404).send({
            status: false,
            message: "Customer not found",
          });
        } else {
          res.status(404).send({
            status: false,
            message: err.message || "Something went to wrong",
          });
        }
        return;
      }
      res.status(200).send({
        status: true,
        data: data,
        message: "Retrive record",
      });
    }
  );
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: false,
            message: `Not found Customer with id ${req.params.customerId}.`,
          });
        } else {
          res.status(500).send({
            status: false,
            message: "Error updating Customer with id " + req.params.customerId,
          });
        }
      } else
        res.send({
          status: true,
          data: data,
          message: "update customer with Id " + req.params.customerId,
        });
    }
  );
};

exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Could not delete Customer with id " + req.params.customerId,
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
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else
      res.send({
        status: true,
        message: `All Customers were deleted successfully!`,
      });
  });
};
