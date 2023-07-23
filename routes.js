const express = require('express');

const dashboardRoute=require('./routes/dashboardRoute');
const websiteRoute=require('./routes/websiteRoute');

const router = express.Router();

router.use('/admin',dashboardRoute);
router.use('/',websiteRoute);


module.exports = router;