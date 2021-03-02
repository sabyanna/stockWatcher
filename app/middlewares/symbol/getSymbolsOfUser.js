const Symbol = require('../../models/symbol');

const getSymbolsOfUser = (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(500).json({ error: 'Missing userId' });
  }

  return Symbol.find({ ownerId: userId })
    .then(symbols => {
      req.symbols = symbols;
      return next();
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
  };

module.exports = getSymbolsOfUser;
