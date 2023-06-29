const express = require('express');
const app = express();
const db = require('./models/Database');
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

(async () => {
  try {
    db.sequelize.authenticate().then(() => {
      app.listen(port, () => console.log(`Server running on port ${port}!`));
      console.log('Connection has been established successfully.');
    });
  } catch (err) {
    console.log('Unable to connect to the database:' + err);
  }
})();
