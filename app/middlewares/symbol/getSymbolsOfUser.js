const Symbol = require('../../models/symbol');

const getSymbolsOfUser = (req, res, next) => Symbol
  .find({ ownerId: req.params.userId })
    .then(symbols => {
      req.symbols = symbols;
      return next();
    })
    .catch(error => {
      return res.status(500).json({ error });
    });

module.exports = getSymbolsOfUser;
