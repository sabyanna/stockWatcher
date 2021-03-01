const Symbol = require('../../models/symbol');

const create = (req, res, next) => {
  const { symbol, userId } = req.body;

  if (!symbol || symbol === '' || !userId) {
    return res.status(500);
  }

  const newSymbol = new Symbol({
    name: symbol.toUpperCase(),
    ownerId: userId
  });

  return newSymbol.save()
    .then(symbol => {
      req.symbol = symbol;
      return next();
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};

module.exports = create;
