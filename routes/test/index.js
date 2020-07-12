module.exports = (app) => {
  const test = require('./test');

  // Create a new test
  app.post('/test', test.create);

  // Retrieve all test
  app.get('/test', test.findAll);

  // Retrieve a single test with testId
  app.get('/test/:testId', test.findOne);

  // Update a test with testId
  app.put('/test/:testId', test.update);

  // Delete a test with testId
  app.delete('/test/:testID', test.delete);
};
