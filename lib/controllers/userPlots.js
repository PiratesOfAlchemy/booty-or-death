const { Router } = require('express');
const UserPlot = require('../models/UserPlot');

module.exports = Router()
  .get('/', (req, res, next) => {
    UserPlot.getAll()
      .then((userplots) => res.send(userplots))
      .catch((error) => next(error));
  });
