const { PORT } = require('./config');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const symbols = require('./app/routes/symbols');
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

app.use('/', symbols);
app.use('/user', users);
