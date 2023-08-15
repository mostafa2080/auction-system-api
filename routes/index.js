const userRoute = require('./dashboard/userRoute');
const adminRoute = require('./dashboard/adminRoute');
const authRoute = require('./website/authRoute');
const mountRoutes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/admins', adminRoute);
  app.use('/api/v1/auth', authRoute);
};

module.exports = mountRoutes;
