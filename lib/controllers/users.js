const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().post('/', (req, res, next) => {
  console.log('test test');
  User.insert({
    ...req.body,
    username: req.user.username,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => next(error));
});
