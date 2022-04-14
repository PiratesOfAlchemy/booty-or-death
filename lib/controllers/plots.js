const { Router } = require('express');
const Plot = require('../models/Plots');

module.exports = Router()
  .get('/', (req, res, next) => {
    Plot.getAll()
      .then((plots) => res.send(plots))
      .catch((error) => next(error));
  })

  .get('/:id', (req, res, next) => {
    Plot.getById(req.params.id)
      .then((plot) => res.send(plot))
      .catch((error) => next(error));
  });
