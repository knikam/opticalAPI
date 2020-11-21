const Bill = require("../_Bills/bill.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const bill = new Bill(req.body);

  Bill.create(bill, (err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message: err.message || "Error occcure while puting data",
      });
    else
      res.send({
        status: true,
        data: data,
        message: "Create bill successfully",
      });
  });
};

exports.findAll = (req, res) => {
  Bill.findAll((err, data) => {
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
        message: "Retrive data successfully.",
      });
  });
};

exports.findOne = (req, res) => {
  Bill.findById(req.params.billId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Bill with id ${req.params.billId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: `Error retrieving Bill with id " ${req.params.billId}.`,
        });
      }
    } else
      res.send({
        status: true,
        data: data,
        message: `Retrive data of bill  ${req.params.billId}. `,
      });
  });
};

exports.delete = (req, res) => {
  Bill.remove(req.params.billId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Bill with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Could not delete Bill with id " + req.params.customerId,
        });
      }
    } else
      res.send({
        status: true,
        data: data,
        message: `Bill was deleted successfully!`,
      });
  });
};

exports.deleteAll = (req, res) => {
  Bill.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while removing all Bills.",
      });
    else
      res.send({
        status: true,
        message: `All Bills were deleted successfully!`,
      });
  });
};
