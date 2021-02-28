const User = require('../../models/user');

const checkIfUsernameAvailable = (req, res, next) => {
  const { userName } = req.body;

  if (userName === '') {
    res.status(400).json({ error: 'Missing username' });
  }

  User.find({ userName })
    .exec()
    .then(users => {
      if (users.length !== 0) {
        res.status(400).json({ error: 'Username taken' });
      }
      return next();
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = checkIfUsernameAvailable;
