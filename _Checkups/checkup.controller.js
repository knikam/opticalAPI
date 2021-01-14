const Checkup = require("../_Checkups/checkup.model");

exports.create = (req, res) => {
  if (!req.body) {
    console.log("body is empty");
    res.statu(400).send({
      message: "Content Can not be empty",
    });
  }

  const checkup = new Checkup(req.body);

  Checkup.create(checkup, (err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message: err.message || "Error occcure while puting data",
      });
    else
      res.send({
        status: true,
        data: data,
        message: "Create checkup successfully.",
      });
  });
};

exports.findAll = (req, res) => {
  Checkup.findAll((err, data) => {
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
        message: "Retrive all checkups successfully.",
      });
  });
};

exports.findOne = (req, res) => {
  Checkup.findById(req.params.checkupId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Checkup with id ${req.params.checkupId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Error retrieving Checkup with id " + req.params.checkupId,
        });
      }
    } else
      res.send({
        status: true,
        data: data,
        message: "Retrive checkup " + req.params.checkupId + " successfully.",
      });
  });
};

exports.delete = (req, res) => {
  Checkup.remove(req.params.checkupId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: false,
          message: `Not found Checkup with id ${req.params.checkupId}.`,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Could not delete Checkup with id " + req.params.checkupId,
        });
      }
    } else
      res.send({
        status: true,
        message: `Checkup was deleted successfully!`,
      });
  });
};

exports.deleteAll = (req, res) => {
  Checkup.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while removing all Checkups.",
      });
    else
      res.send({
        status: true,
        message: `All Checkups were deleted successfully!`,
      });
  });
};
