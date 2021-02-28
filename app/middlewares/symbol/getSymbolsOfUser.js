const Symbol = require('../../models/symbol');

const getSymbolsOfUser = (req, res, next) => {
  Symbol.find()
    .then(symbols => {
      req.symbols = symbols;
      next();
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = getSymbolsOfUser;
