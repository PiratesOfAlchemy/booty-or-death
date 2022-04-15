const { Router } = require('express');
const UserPlot = require('../models/UserPlot');

module.exports = Router()
  .get('/:id', (req, res, next) => {
    UserPlot.getSumByUserId(req.params.id)
      .then((userPlots) => res.send(userPlots))
      .catch((error) => next(error));
  })

  .post('/', (req, res, next) => {
    UserPlot.insert({ ...req.body })
      .then((userPlot) => {
        res.send(userPlot);
      })
      .catch((error) => next(error));
  });
