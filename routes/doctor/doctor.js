const Doctor = require("../../models/Doctor");
const upload = require("../../config/mutler");

// Create and Save a new Doctor
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Doctor content can not be empty",
    });
  }

  let filename = "";
  // UPLOADING
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
    } else {
      filename = req.file.filename;
    }
  });
  // Create a Doctor
  const doctor = new Doctor({
    userID: req.user._id,
    name: req.body.name,
    type: req.body.type,
    hospital: req.body.hospital,
    docs: filename,
  });

  // Save doctor in the database
  doctor
    .save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the doctor.",
      });
    });
};

// Retrieve and return all doctors from the database.
exports.findAll = (req, res) => {
  Doctor.find()
    .then((doctors) => {
      res.send(doctors);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctors.",
      });
    });
};

exports.findOne = (req, res) => {
  Doctor.findById(req.params.doctorId)
    .then((doctor) => {
      if (!doctor) {
        return res.status(404).send({
          message: "doctor not found with id " + req.params.doctorId,
        });
      }
      res.send(doctor);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "doctor not found with id " + req.params.doctorId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving doctor with id " + req.params.doctorId,
      });
    });
};

// Update a doctor identified by the doctorId in the request
exports.update = (req, res) => {
  // Find doctor and update it with the request body
  Doctor.findByIdAndUpdate(
    req.params.doctorId,
    {
      name: req.body.name,
      type: req.body.type,
      hospital: req.body.hospital,
      docs: req.body.docs,
    },
    { new: true }
  )
    .then((doctor) => {
      if (!doctor) {
        return res.status(404).send({
          message: "doctor not found with id " + req.params.doctorId,
        });
      }
      res.send(doctor);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "doctor not found with id " + req.params.doctorId,
        });
      }
      return res.status(500).send({
        message: "Error updating doctor with id " + req.params.doctorId,
      });
    });
};

// Delete a doctor with the specified doctorId in the request
exports.delete = (req, res) => {
  console.log(req.params.doctorID);
  Doctor.findOneAndRemove({ _id: req.params.doctorId }, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.send({ delete: "Success" });
  });
};
