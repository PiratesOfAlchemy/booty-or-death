/* eslint-disable no-console */
const inquirer = require('inquirer');
const {
  getPrompts,
  postUsername,
  postUserPlot,
} = require('./utils/fetch-utils');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const gradient = require('gradient-string');
const skullArray = require('./utils/ascii');

// const rainbow = chalkAnimation.rainbow('This is a rainbow for pirates!').stop();
// rainbow.render();
// console.log(chalk.blue('Working?'));
// console.log(gradient('cyan', 'pink')('Hello world!'));

const skull = skullArray.map((row) => row);

const sleep = (ms = 10000) => new Promise((r) => setTimeout(r, ms));

async function gameStart() {
  figlet.text(
    'Booty or Death!',
    {
      font: 'Caligraphy2',
      horizontalLayout: 'default',
      verticalLayout: 'fitted',
      width: 80,
      whitespaceBreak: true,
    },
    (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(typeof skullArray);
      console.log(gradient.morning(data), skull.toString());
    }
  );

  await sleep();
  console.clear();
}

const setUsername = async () => {
  inquirer
    .prompt([
      {
        name: 'username',
        message: 'Enter your pirate name',
      },
    ])
    .then((answer) => {
      console.log(`Welcome aboard, ${answer.username}`);
      return postUsername(answer.username);
    })
    .then((userId) => {
      gameLoop(1, userId);
    });
};

const gameLoop = async (gameId, userId) => {
  getPrompts(gameId).then((prompts) => {
    prompts, userId;
    inquirer
      .prompt([
        {
          type: 'list',
          message: prompts.prompt,
          name: 'choice',
          choices: [prompts.heroicChoice, prompts.villainousChoice],
        },
      ])
      .then((answers) => {
        userId;
        getPrompts(gameId).then((prompts) => {
          userId;
          prompts;
          if (answers.choice === 'quit') return;
          if (answers.choice === 'replay') return setUsername();
          if (answers.choice === prompts.heroicChoice) {
            postUserPlot(prompts.heroicBlockId, prompts.isHeroic, userId);
            gameLoop(prompts.heroicBlockId, userId);
          } else {
            postUserPlot(prompts.villainousBlockId, prompts.isHeroic, userId);
            gameLoop(prompts.villainousBlockId, userId);
          }
        });
      });
  });
};


gameStart()
  .then(() => setUsername());
