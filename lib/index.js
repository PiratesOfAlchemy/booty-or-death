/* eslint-disable no-console */
const inquirer = require('inquirer');
const {
  getPrompts,
  postUsername,
  postUserPlot,
} = require('./utils/fetch-utils');
const chalk = require('chalk');
//const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const gradient = require('gradient-string');
const skull = require('./utils/ascii');

// const rainbow = chalkAnimation.rainbow('This is a rainbow for pirates!').stop();
// rainbow.render();
// console.log(chalk.blue('Working?'));
// console.log(gradient('cyan', 'pink')('Hello world!'));

const sleep = (ms = 8000) => new Promise((r) => setTimeout(r, ms));

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
      console.log(gradient.morning(data), skull);
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
      return postUsername(answer.username);
    })
    .then((user) => {
      gameLoop(1, user);
    });
};

const gameLoop = async (gameId, user) => {
  getPrompts(gameId)
    .then((prompts) => {
      return inquirer.prompt([
        {
          type: 'list',
          message: chalk.blue(prompts.prompt.replace(/{NAME}/g, user.username)),
          name: 'choice',
          choices: [prompts.heroicChoice, prompts.villainousChoice],
        },
      ]);
    })
    .then((answers) => {
      return getPrompts(gameId).then((prompts) => {
        if (answers.choice === 'quit') return;
        if (answers.choice === 'replay') return setUsername();
        if (answers.choice === prompts.heroicChoice) {
          postUserPlot(prompts.heroicBlockId, prompts.isHeroic, user.id);
          gameLoop(prompts.heroicBlockId, user);
        } else {
          postUserPlot(prompts.villainousBlockId, prompts.isHeroic, user.id);
          gameLoop(prompts.villainousBlockId, user);
        }
      });
    });
};

gameStart().then(() => setUsername());
