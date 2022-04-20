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
  console.log(res.body);
  return res.body;
};

const postUserPlot = async (blockId, wasHeroic, userId) => {
  await agent
    .post('http://localhost:7890/api/v1/user_plots')
    .send({ blockId, wasHeroic, userId });
};

const fetchHeroicSum = async (id) => {
  const res = await agent.get(`http://localhost:7890/api/v1/user_plots/${id}`);
  return Number(res.text);
};

const setBooty = async (userId) => {
  const bootyArray = ['A little booty', 'some booty', 'A lot of booty'];
  const heroicSum = await fetchHeroicSum(userId);
  if (heroicSum <= 2) return bootyArray[0];
  else if (heroicSum <= 4) return bootyArray[1];
  else if (heroicSum <= 6) return bootyArray[2];
};

module.exports = { getPrompts, postUsername, postUserPlot, setBooty };
