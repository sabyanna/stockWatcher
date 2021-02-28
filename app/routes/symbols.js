const express = require('express');
const router = express.Router();

//middlewares
const createSymbol = require('../middlewares/symbol/create');
const getSymbolsOfUser = require('../middlewares/symbol/getSymbolsOfUser');

router.post('/',
  createSymbol,
  (req, res) => res.json(req.symbol)
);

router.get('/',
  getSymbolsOfUser,
  (req, res) =>res.json(req.symbols)
);

module.exports = router;
