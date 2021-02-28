const express = require('express');
const router = express.Router();

//middlewares
const checkIfUsernameAvailable = require('../middlewares/user/checkIfUsernameAvailable');
const createUser = require('../middlewares/user/create');

router.post('/',
  checkIfUsernameAvailable,
  createUser,
  (req, res) =>res.json(req.user)
);

module.exports = router;
