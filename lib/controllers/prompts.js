const { Router } = require('express');
const Prompt = require('../models/Prompt');

module.exports = Router()
  .get('/', (req, res, next) => {
    Prompt.getAll()
      .then((prompts) => res.send(prompts))
      .catch((error) => next(error));
  });
