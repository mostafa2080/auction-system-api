const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const globalError = require('./MiddleWares/errorMw');
const ApiError = require('./utils/apiError');
const mountRoute = require('./routes/index');

const router = require('./routes');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(express.json({ limit: '10kb' }));
router.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(` Mode: ${process.env.NODE_ENV}`);
}
//mounting routes 
mountRoute(app);

//using of the global error handler 
app.use(globalError);

//if no route is found 
app.all('*', (req, res, next) => {
  next(new ApiError(`Can not find this Route ${req.originalUrl}`, 400));
});

//global error handler
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Error ${err}`);
  server.close(() => {
    console.log(`shutting down....`);
    process.exit(1);
  });
});

module.exports = app;
