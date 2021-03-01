const express = require('express');
const router = express.Router();

//middlewares
const checkIfUsernameAvailable = require('../middlewares/user/checkIfUsernameAvailable');
const createUser = require('../middlewares/user/create');
const authUser = require('../middlewares/user/auth');

router.post('/register',
  checkIfUsernameAvailable,
  createUser,
  (req, res) => res.json({ userId: req.userId })
);

router.post('/login',
  authUser,
  (req, res) => res.json({ userId: req.userId })
);

module.exports = router;
