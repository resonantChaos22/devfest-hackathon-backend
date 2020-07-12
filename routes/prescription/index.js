module.exports = (app) => {
  const prescription = require('./prescription');

  // Create a new prescription
  app.post('/prescription', prescription.create);

  // Retrieve all prescription
  app.get('/prescription', prescription.findAll);

  // Retrieve a single prescription with prescriptionId
  app.get('/prescription/:prescriptionId', prescription.findOne);

  // Update a prescription with prescriptionId
  app.put('/prescription/:prescriptionId', prescription.update);

  // Delete a prescription with prescriptionId
  app.delete('/prescription/:prescriptionID', prescription.delete);
};
