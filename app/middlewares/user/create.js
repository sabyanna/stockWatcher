const User = require('../../models/user');

const create = (req, res, next) => {
  const { userName } = req.body;

  const newUser = new User({
    userName
  });

  return newUser.save()
    .then(user => {
      const { _id } = user;
      req.userId = _id;
  
      return next();
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

module.exports = create;
