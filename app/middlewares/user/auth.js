const User = require('../../models/user');

const auth = (req, res, next) => {
  const { userName } = req.body;

  if (userName === '') {
    res.status(400).json({ error: 'Missing username' });
  }

  User.find({ userName })
    .exec()
    .then(users => {
      const [ { _id } ] = users;

      req.userId = _id;

      return next();
    })
    .catch(() => {
      res.status(500).json({ error: 'user not found' });
    });
};

module.exports = auth;
