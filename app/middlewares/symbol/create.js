const Symbol = require('../../models/symbol');

const create = (req, res, next) => {
  const { symbol } = req.body;

  const newSymbol = new Symbol({
    name: symbol.toUpperCase()
  });

  newSymbol.save()
    .then(symbol => {
      req.symbol = symbol;
      next();
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = create;
