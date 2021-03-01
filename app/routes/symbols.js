const express = require('express');
const router = express.Router();

//middlewares
const createSymbol = require('../middlewares/symbol/create');
const getSymbolsOfUser = require('../middlewares/symbol/getSymbolsOfUser');
const getStockDataOfUserSymbols = require('../middlewares/symbol/getStockDataOfUserSymbols');

router.post('/:userId',
  createSymbol,
  (req, res) => res.json(req.symbol)
);

router.get('/:userId',
  getSymbolsOfUser,
  getStockDataOfUserSymbols,
  (req, res) => res.json(req.symbols)
);

module.exports = router;
