const userRoute = require('./dashboard/userRoute');
const adminRoute = require('./dashboard/adminRoute');
const authRoute = require('./website/authRoute');
const auctionRoute = require('./dashboard/auctionRoute');
const bidRoute = require('./dashboard/bidRoute');
const mountRoutes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/admins', adminRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/auction', auctionRoute);
  app.use('/api/v1/bid', bidRoute);
};

module.exports = mountRoutes;
