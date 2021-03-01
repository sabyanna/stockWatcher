const User = require('../../models/user');

const auth = (req, res, next) => {
  const { userName } = req.body;

  if (userName === '') {
    res.status(400).json({ error: 'Missing username' });
  }

  User.find({ userName })
    .exec()
    .then(() => next())
    .catch(() => {
      res.status(400).json({ error: 'Incorrect username' });
    });
};

module.exports = auth;
