const agent = require('superagent');
const chalk = require('chalk');
const wrap = require('word-wrap');
const GAME_URL = 'https://booty-or-death.herokuapp.com';

const getPrompts = async (id) => {
  const res = await agent
    .get(`${GAME_URL}/api/v1/plots/${id}`);
  
  return res.body;
};

const postUsername = async (username) => {
  const res = await agent
    .post(`${GAME_URL}/api/v1/users`)
    .send({ username })
    .catch((error) => error);
  return res.body;
};

const postUserPlot = async (blockId, wasHeroic, userId) => {
  await agent
    .post(`${GAME_URL}/api/v1/user_plots`)
    .send({ blockId, wasHeroic, userId });
};

const fetchHeroicSum = async (id) => {
  const res = await agent.get(
    `${GAME_URL}/api/v1/user_plots/${id}`
  );
  return Number(res.text);
};

const setBooty = async (userId) => {
  const heroicSum = await fetchHeroicSum(userId);
  const booty = chalk.yellowBright(
    `\n{NAME}'s booty total: ${heroicSum * 100} gold doubloons!\n`
  );
  const bootyArray = [
    `${booty} You are too rotten of a pirate! No booty for you!!!`,
    `${booty} Make better choices next time. You were able to sock away a lil booty.`,
    `${booty} Not too shabby! You are almost ready to be a full time pirate.`,
    `${booty} Look at all that booty!!!`,
    `${booty} You are a first class pirate. You got booty for days!!!`,
  ];
  if (heroicSum === 0) return bootyArray[0];
  else if (heroicSum === 1) return bootyArray[1];
  else if (heroicSum === 2) return bootyArray[2];
  else if (heroicSum === 3) return bootyArray[3];
  else if (heroicSum === 4) return bootyArray[4];
};

const promptString = (prompt, user, totalBooty) => {
  let newString = prompt;
  if (totalBooty) {
    newString = prompt.replace(/{BOOTY}/g, totalBooty);
  }
  const promptStringFinal = newString.replace(/{NAME}/g, user.username);
  return wrap(promptStringFinal, { width: 80 });
};

// const setPrompts = async (id) => {
//   let currentPrompts = {};
//   getPrompts(id)
//     .then((prompts) => {
//       currentPrompts = prompts;
//       return getPrompts(prompts.villainousBlockId);
//     })
//     .then((chancePrompts) => {
//       const coinFlip = Math.round(Math.random());
//       //This coin flip conditional is set to never trigger for testing purposes
//       if (chancePrompts.heroicBlockId === '0' && coinFlip <= 0) {
//         currentPrompts.villainousBlockId = chancePrompts.villainousBlockId;
//       }
//     });
//   return currentPrompts;
// };

module.exports = {
  postUsername,
  postUserPlot,
  setBooty,
  promptString,
  getPrompts,
};
