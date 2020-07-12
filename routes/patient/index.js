module.exports = (app) => {
  const patient = require('./patient');

  // Create a new patient
  app.post('/patient', patient.create);

  // Retrieve all patient
  app.get('/patient', patient.findAll);

  // Retrieve a single patient with patientId
  app.get('/patient/:patientId', patient.findOne);

  // Update a patient with patientId
  app.put('/patient/:patientId', patient.update);

  // Delete a patient with patientId
  app.delete('/patient/:patientID', patient.delete);
};
