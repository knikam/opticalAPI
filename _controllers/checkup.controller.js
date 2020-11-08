const Checkup = require("../_models/checkup.model");

exports.create = (req, res)=>{

    if(!req.body){
        console.log("body is empty");
        res.statu(400).send({
            message:"Content Can not be empty"
        });
    }

    const checkup = new Checkup(req.body);

    Checkup.create(checkup, (err, data)=>{
         if(err)
            res.status(500).send({
                message: err.message || "Error occcure while puting data"
            });
        else 
            res.send(data);
    });
};

exports.findAll = (req, res)=>{
    Checkup.findAll((err,data)=>{
         if (err)
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
            });
        else 
            res.send(data);
    });
}

exports.findOne = (req, res)=>{
    Checkup.findById(req.params.checkupId,(err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found Checkup with id ${req.params.checkupId}.`
                });
            } else {
                    res.status(500).send({
                    message: "Error retrieving Checkup with id " + req.params.checkupId
                });
            }
        } else 
            res.send(data);
    });
}

exports.delete = (req, res)=>{
    Checkup.remove(req.params.checkupId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Checkup with id ${req.params.checkupId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Checkup with id " + req.params.checkupId
        });
      }
    } else res.send({ message: `Checkup was deleted successfully!` });
  });

}

exports.deleteAll = (req, res)=>{
    Checkup.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Checkups."
      });
    else res.send({ message: `All Checkups were deleted successfully!` });
  });
}