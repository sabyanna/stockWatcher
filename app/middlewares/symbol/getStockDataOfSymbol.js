const fetch = require('node-fetch');

const getStockDataOfSymbol = (req, res, next) => {
  const { symbol } = req;

  if (!symbol) {
    return res.status(400).json({ error: 'Missing symbols' });
  }

  const key = process.env.STOCK_API_KEY;
  const { name } = symbol;

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=${key}`;

  return fetch(url)
    .then(res => res.json())
    .then(stockInfo => {

      const timeSeries = stockInfo['Time Series (Daily)'];
      const formattedTimeSeries = Object.entries(timeSeries).map(key => {
        return {
          date: key[0],
          open: key[1]['1. open'],
          close: key[1]['4. close']
        };
      }).reverse();

      req.symbol = {
        name,
        timeSeries: formattedTimeSeries
      };

      return next();
    })
    .catch(() => res.status(500));
};

module.exports = getStockDataOfSymbol;
