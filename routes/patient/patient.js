const Patient = require('../../models/Patient');

// Create and Save a new Patient
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'patient content can not be empty',
    });
  }

  // Create a patient
  const patient = new Patient({
    name: req.body.name,
    type: req.body.type,
    prescriptions: req.body.prescriptions,
    doctor: req.body.doctors,
    docs: req.body.docs,
  });

  // Save patient in the database
  Patient.save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Patient.',
      });
    });
};

// Retrieve and return all patients from the database.
exports.findAll = (req, res) => {
  Patient.find()
    .then((patients) => {
      res.send(patients);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving patients.',
      });
    });
};

exports.findOne = (req, res) => {
  Patient.findById(req.params.patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({
          message: 'patient not found with id ' + req.params.patientId,
        });
      }
      res.send(patient);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'patient not found with id ' + req.params.patientId,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving patient with id ' + req.params.patientId,
      });
    });
};

// Update a patient identified by the patientId in the request
exports.update = (req, res) => {
  // Find patient and update it with the request body
  Patient.findByIdAndUpdate(
    req.params.patientId,
    {
      name: req.body.name,
      type: req.body.type,
      prescriptions: req.body.prescriptions,
      doctor: req.body.doctors,
      docs: req.body.docs,
    },
    { new: true }
  )
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({
          message: 'patient not found with id ' + req.params.patientId,
        });
      }
      res.send(patient);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'patient not found with id ' + req.params.patientId,
        });
      }
      return res.status(500).send({
        message: 'Error updating patient with id ' + req.params.patientId,
      });
    });
};

// Delete a patient with the specified patientId in the request
exports.delete = (req, res) => {
  console.log(req.params.patientID);
  Patient.findOneAndRemove({ _id: req.params.patientId }, function (err) {
    if (err) console.log(err);
    console.log('Successful deletion');
    res.send({ delete: 'Success' });
  });
};
