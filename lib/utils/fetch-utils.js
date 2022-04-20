const agent = require('superagent');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getPrompts = async (id) => {
  const res = await fetch(`http://localhost:7890/api/v1/plots/${id}`);
  const body = await res.json();
  return body;
};

const postUsername = async (username) => {
  const res = await agent
    .post('http://localhost:7890/api/v1/users')
    .send({ username })
    .catch((error) => error);
  return res.body;
};

const postUserPlot = async (blockId, wasHeroic, userId) => {
  await agent
    .post('http://localhost:7890/api/v1/user_plots')
    .send({ blockId, wasHeroic, userId });
};

const fetchHeroicSum = async (id) => {
  await agent
    .get(`http://localhost:7890/api/v1/user_plots/${id}`);
};

module.exports = { getPrompts, postUsername, postUserPlot, fetchHeroicSum };
