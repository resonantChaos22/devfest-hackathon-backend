const Test = require('../../models/Test');

// Create and Save a new test
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'test content can not be empty',
    });
  }

  // Create a test
  const test = new Test({
    name: req.body.name,
    doctor: req.body.doctor,
    patient: req.body.patient,
    prescription: req.body.prescription,
    date: req.body.date,
    docs: req.body.docs,
  });

  // Save test in the database
  Test.save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Test.',
      });
    });
};

// Retrieve and return all tests from the database.
exports.findAll = (req, res) => {
  Test.find()
    .then((tests) => {
      res.send(tests);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tests.',
      });
    });
};

exports.findOne = (req, res) => {
  Test.findById(req.params.testId)
    .then((test) => {
      if (!test) {
        return res.status(404).send({
          message: 'test not found with id ' + req.params.testId,
        });
      }
      res.send(test);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'test not found with id ' + req.params.testId,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving test with id ' + req.params.testId,
      });
    });
};

// Update a test identified by the testId in the request
exports.update = (req, res) => {
  // Find test and update it with the request body
  Test.findByIdAndUpdate(
    req.params.testId,
    {
      name: req.body.name,
      doctor: req.body.doctor,
      patient: req.body.patient,
      prescription: req.body.prescription,
      date: req.body.date,
      docs: req.body.docs,
    },
    { new: true }
  )
    .then((test) => {
      if (!test) {
        return res.status(404).send({
          message: 'test not found with id ' + req.params.testId,
        });
      }
      res.send(test);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'test not found with id ' + req.params.testId,
        });
      }
      return res.status(500).send({
        message: 'Error updating test with id ' + req.params.testId,
      });
    });
};

// Delete a test with the specified testId in the request
exports.delete = (req, res) => {
  console.log(req.params.testID);
  Test.findOneAndRemove({ _id: req.params.testId }, function (err) {
    if (err) console.log(err);
    console.log('Successful deletion');
    res.send({ delete: 'Success' });
  });
};
