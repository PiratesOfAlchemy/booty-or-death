const { Router } = require('express');
const Plot = require('../models/Plots');

module.exports = Router()
  .get('/', (req, res, next) => {
    Plot.getAll()
      .then((plots) => res.send(plots))
      .catch((error) => next(error));
  });
