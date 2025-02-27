require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.NODE_DOCKER_PORT || 3000;
const cors = require('cors');
const db = require('./models/Database');
const patientRoutes = require('./routes/PatientRoutes');

app.use(express.json());
app.use(cors());
app.use('/patient', patientRoutes);

(async () => {
  try {
    await db.sequelize.authenticate();
    app.listen(port, () => console.log(`Server running on port ${port}!`));
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.log(`Unable to connect to the database:${err}`);
  }
})();
