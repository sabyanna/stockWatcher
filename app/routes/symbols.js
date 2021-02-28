const express = require('express');
const router = express.Router();
const Symbol = require('../models/symbol')

router.post('/',
  (req, res) => {
    const { symbol } = req.body;
    const newSymbol = new Symbol({
      name: symbol.toUpperCase()
    });

    newSymbol.save()
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