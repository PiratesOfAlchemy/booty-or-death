const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().post('/', (req, res, next) => {
  User.insert({ ...req.body })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => next(error));
});
