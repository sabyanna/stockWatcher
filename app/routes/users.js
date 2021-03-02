const express = require('express');
const router = express.Router();

//middlewares
const checkIfUsernameAvailable = require('../middlewares/user/checkIfUsernameAvailable');
const createUser = require('../middlewares/user/create');
const authUser = require('../middlewares/user/auth');
const createSymbol = require('../middlewares/symbol/create');
const getSymbolsOfUser = require('../middlewares/symbol/getSymbolsOfUser');
const getLatestStockDataOfSymbols = require('../middlewares/symbol/getLatestStockDataOfSymbols');
const getStockDataOfSymbol = require('../middlewares/symbol/getStockDataOfSymbol');

router.post('/register',
  checkIfUsernameAvailable,
  createUser,
  (req, res) => res.json({ userId: req.userId })
);

router.post('/login',
  authUser,
  (req, res) => res.json({ userId: req.userId })
);

router.post('/:userId/symbols',
  createSymbol,
  getLatestStockDataOfSymbols,
  (req, res) => res.json(req.symbols[0])
);

router.get('/:userId/symbols',
  getSymbolsOfUser,
  getLatestStockDataOfSymbols,
  (req, res) => res.json(req.symbols)
);

router.get('/:userId/symbols/:symbolName',
  (req, res, next) => {
    const { symbolName } = req.params;
    req.symbol = { name: symbolName };

    return next();
  },
  getStockDataOfSymbol,
  (req, res) => res.json(req.symbol)
);

module.exports = router;
