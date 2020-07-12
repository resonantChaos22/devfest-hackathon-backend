module.exports = (app) => {
  const meds = require('./meds');

  // Create a new meds
  app.post('/meds', meds.create);

  // Retrieve all meds
  app.get('/meds', meds.findAll);

  // Retrieve a single meds with medsId
  app.get('/meds/:medsId', meds.findOne);

  // Update a meds with medsId
  app.put('/meds/:medsId', meds.update);

  // Delete a meds with medsId
  app.delete('/meds/:medsID', meds.delete);
};
