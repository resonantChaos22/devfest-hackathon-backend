const Meds = require('../../models/Meds');

// Create and Save a new meds
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'meds content can not be empty',
    });
  }

  // Create a meds
  const meds = new Meds({
    name: req.body.name,
    prescription: req.body.prescription,
    timing: req.body.timing,
  });

  // Save meds in the database
  Meds.save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the meds.',
      });
    });
};

// Retrieve and return all medss from the database.
exports.findAll = (req, res) => {
  Meds.find()
    .then((medss) => {
      res.send(medss);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving medss.',
      });
    });
};

exports.findOne = (req, res) => {
  Meds.findById(req.params.medsId)
    .then((meds) => {
      if (!meds) {
        return res.status(404).send({
          message: 'meds not found with id ' + req.params.medsId,
        });
      }
      res.send(meds);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'meds not found with id ' + req.params.medsId,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving meds with id ' + req.params.medsId,
      });
    });
};

// Update a meds identified by the medsId in the request
exports.update = (req, res) => {
  // Find meds and update it with the request body
  Meds.findByIdAndUpdate(
    req.params.medsId,
    {
      name: req.body.name,
      prescription: req.body.prescription,
      timing: req.body.timing,
    },
    { new: true }
  )
    .then((meds) => {
      if (!meds) {
        return res.status(404).send({
          message: 'meds not found with id ' + req.params.medsId,
        });
      }
      res.send(meds);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'meds not found with id ' + req.params.medsId,
        });
      }
      return res.status(500).send({
        message: 'Error updating meds with id ' + req.params.medsId,
      });
    });
};

// Delete a meds with the specified medsId in the request
exports.delete = (req, res) => {
  console.log(req.params.medsID);
  Meds.findOneAndRemove({ _id: req.params.medsId }, function (err) {
    if (err) console.log(err);
    console.log('Successful deletion');
    res.send({ delete: 'Success' });
  });
};
