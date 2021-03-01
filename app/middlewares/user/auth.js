const User = require('../../models/user');

const auth = (req, res, next) => {
  const { userName } = req.body;

  if (userName === '') {
    res.status(400).json({ error: 'Missing username' });
  }

  User.find({ userName })
    .exec()
    .then(users => {
      if (users.length === 0) {
        res.status(400).json({ error: 'Incorrect username' });
      }

      const [{ _id }] = users;
      req.userId = _id;
      
      return next();
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = auth;
