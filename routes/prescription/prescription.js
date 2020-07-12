const Prescription = require('../../models/Prescription');

// Create and Save a new prescription
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'prescription content can not be empty',
    });
  }

  // Create a prescription
  const prescription = new Prescription({
    name: req.body.name,
    doctor: req.body.doctor,
    patient: req.body.patient,
    diagnostics: req.body.diagnostics,
    meds: req.body.meds,
    docs: req.body.docs,
    tests: req.body.tests,
    status: req.body.status,
    date: req.body.date,
  });

  // Save prescription in the database
  Prescription.save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the prescription.',
      });
    });
};

// Retrieve and return all prescriptions from the database.
exports.findAll = (req, res) => {
  Prescription.find()
    .then((prescriptions) => {
      res.send(prescriptions);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving prescriptions.',
      });
    });
};

exports.findOne = (req, res) => {
  Prescription.findById(req.params.prescriptionId)
    .then((prescription) => {
      if (!prescription) {
        return res.status(404).send({
          message: 'prescription not found with id ' + req.params.prescriptionId,
        });
      }
      res.send(prescription);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'prescription not found with id ' + req.params.prescriptionId,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving prescription with id ' + req.params.prescriptionId,
      });
    });
};

// Update a prescription identified by the prescriptionId in the request
exports.update = (req, res) => {
  // Find prescription and update it with the request body
  Prescription.findByIdAndUpdate(
    req.params.prescriptionId,
    {
      name: req.body.name,
      doctor: req.body.doctor,
      patient: req.body.patient,
      diagnostics: req.body.diagnostics,
      meds: req.body.meds,
      docs: req.body.docs,
      tests: req.body.tests,
      status: req.body.status,
      date: req.body.date,
    },
    { new: true }
  )
    .then((prescription) => {
      if (!prescription) {
        return res.status(404).send({
          message: 'prescription not found with id ' + req.params.prescriptionId,
        });
      }
      res.send(prescription);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'prescription not found with id ' + req.params.prescriptionId,
        });
      }
      return res.status(500).send({
        message: 'Error updating prescription with id ' + req.params.prescriptionId,
      });
    });
};

// Delete a prescription with the specified prescriptionId in the request
exports.delete = (req, res) => {
  console.log(req.params.prescriptionID);
  Prescription.findOneAndRemove({ _id: req.params.prescriptionId }, function (err) {
    if (err) console.log(err);
    console.log('Successful deletion');
    res.send({ delete: 'Success' });
  });
};
