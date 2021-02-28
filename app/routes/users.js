const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/',
  (req, res, next) => {
    const { userName } = req.body;

    if (userName === '') {
      res.send({ error: 'Missing username' });
    }

    User.find({ userName })
      .exec()
      .then(users => {
        if (users.length !== 0) {
          res.json({ error: 'Username taken' });
        }
        return next();
      })
      .catch(error => {
        res.json({ error });
      });
  },
  (req, res) => {
    const { userName } = req.body;
  
    const newUser = new User({
      userName
    });

    newUser.save()
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.json({ error });
      });
  }
);

module.exports = router;