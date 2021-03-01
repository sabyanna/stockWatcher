const express = require('express');
const router = express.Router();

//middlewares
const checkIfUsernameAvailable = require('../middlewares/user/checkIfUsernameAvailable');
const createUser = require('../middlewares/user/create');
const authUser = require('../middlewares/user/auth');
const createSymbol = require('../middlewares/symbol/create');
const getSymbolsOfUser = require('../middlewares/symbol/getSymbolsOfUser');
const getStockDataOfUserSymbols = require('../middlewares/symbol/getStockDataOfUserSymbols');

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
  (req, res) => res.json(req.symbol)
);

router.get('/:userId/symbols',
  getSymbolsOfUser,
  getStockDataOfUserSymbols,
  (req, res) => res.json(req.symbols)
);

router.get('/:userId/symbols/:symbolName',
  (req, res, next) => {
    const { symbolName } = req.params;
    req.symbols = [{ name: symbolName }];

    return next();
  },
  getStockDataOfUserSymbols,
  (req, res) => res.json(req.symbols)
);

module.exports = router;
