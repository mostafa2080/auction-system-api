const app = require('./app');
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
const { dbconnection } = require('./config/database');

dotenv.config({ path: '.env' });

dbconnection();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
