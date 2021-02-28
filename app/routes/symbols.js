const express = require('express');
const router = express.Router();
const Symbol = require('../models/symbol');

router.post('/',
  (req, res) => {
    const symbol = new Symbol({
      name: req.body.symbol
    });

    symbol.save()
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);

router.get('/',
  (req, res) => {
    Symbol.find()
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);

module.exports = router;
