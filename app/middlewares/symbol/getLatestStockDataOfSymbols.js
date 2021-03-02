const fetch = require('node-fetch');

const getLatestStockDataOfSymbols = (req, res, next) => {
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
        .then(stockInfo => {
          const timeSeries = stockInfo['Time Series (Daily)'];

          const latestTimeSeries = timeSeries[Object.keys(timeSeries)[0]];

          const stock = {
            date: Object.keys(timeSeries)[0],
            open: latestTimeSeries['1. open'],
            close: latestTimeSeries['4. close']
          };

          resolve({
            stockInfo: stock,
            name: symbol.name
          });
        })
        .catch(err => reject(err));
  
      });
   });

  return Promise.all(requests)
    .then(data => {
      req.symbols = data;
      return next();
    }).catch(() => {
      return res.status(500);
    });
};

module.exports = getLatestStockDataOfSymbols;
