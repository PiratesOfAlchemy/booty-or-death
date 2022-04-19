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

figlet.text(
  'Booty or Death!!!',
  {
    font: 'Caligraphy2',
    horizontalLayout: 'default',
    verticalLayout: 'fitted',
    width: 100,
    whitespaceBreak: true,
  },
  (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  }
);
const rainbow = chalkAnimation.rainbow('This is a rainbow for pirates!').stop();
rainbow.render();
console.log(chalk.blue('Working?'));

const setUsername = async () => {
  inquirer
    .prompt([
      {
        name: 'username',
        message: 'enter your pirate name',
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
            gameLoop(prompts.heroicBlockId);
          } else {
            postUserPlot(prompts.villainousBlockId, prompts.isHeroic, userId);
            gameLoop(prompts.villainousBlockId);
          }
        });
      });
  });
};

setUsername();
