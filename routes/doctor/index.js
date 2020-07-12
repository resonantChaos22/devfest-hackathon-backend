module.exports = (app) => {
  const doctor = require('./doctor');

  // Create a new doctor
  app.post('/doctor', doctor.create);

  // Retrieve all doctor
  app.get('/doctor', doctor.findAll);

  // Retrieve a single doctor with doctorId
  app.get('/doctor/:doctorId', doctor.findOne);

  // Update a doctor with doctorId
  app.put('/doctor/:doctorId', doctor.update);

  // Delete a doctor with doctorId
  app.delete('/doctor/:doctorID', doctor.delete);
};
