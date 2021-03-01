const { PORT } = require('./config');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./app/middlewares/logger');
const users = require('./app/routes/users');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to mongoose');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(error => console.log(error));

app.use(cors());
app.use(bodyParser.json());

app.use(logger);
app.use('/user', users);
