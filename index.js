const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const symbols = require('./app/routes/symbols');

const { PORT } = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', symbols);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));