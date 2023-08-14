const userRoute = require('./dashboard/userRoute');

const mountRoutes = (app) => {
  app.use('/api/v1/users', userRoute);
};

module.exports = mountRoutes;
