const fetch = require('node-fetch');

const getStockDataOfUserSymbols = (req, res, next) => {
  const { symbols } = req;

  if (!symbols) {
    return res.status(400).json({ error: 'Missing symbols' });
  }

  const requests = symbols.map(symbol => {
    const key = process.env.STOCK_API_KEY;
    const { name } = symbol;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=${key}`;
  
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(stock => {
          const { name, stockInfo } = stock;
          const timeSeries = stockInfo['Time Series (Daily)'];

          const formattedTimeSeries = Object.entries(timeSeries).map(key => {
            return {
              date: key[0],
              open: key[1]['1. open'],
              close: key[1]['4. close']
            };
          }).reverse();

          resolve({
            name,
          timeSeries: formattedTimeSeries
          });
        })
        .catch(err => reject(err));
  
      });
   });

  return Promise.all(requests)
    .then(symbols => {
      req.symbols = symbols;
      return next();
    }).catch(() => {
      return res.status(500);
    });
};

module.exports = getStockDataOfUserSymbols;
