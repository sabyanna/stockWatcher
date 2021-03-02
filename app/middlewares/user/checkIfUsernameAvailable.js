const User = require('../../models/user');

const checkIfUsernameAvailable = (req, res, next) => {
  const { userName } = req.body;

  if (userName === '') {
    return res.status(400).json({ error: 'Missing username' });
  }

  return User.find({ userName })
    .exec()
    .then(users => {
      if (users.length !== 0) {
        return res.status(400).json({ error: 'Username taken' });
      }
      return next();
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};

module.exports = checkIfUsernameAvailable;
