const User = require('../../models/user');

const create = (req, res, next) => {
  const { userName } = req.body;

  const newUser = new User({
    userName
  });

  newUser.save()
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = create;
