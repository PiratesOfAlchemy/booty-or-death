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

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

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
      console.log(`Welcome aboard, ${answer.username}`);
      return postUsername(answer.username);
    })
    .then((user) => {
      gameLoop(1, user);
    });
};

const gameLoop = async (gameId, user) => {
  let currentPrompts = {};
  getPrompts(gameId)
    .then((prompts) => {
      currentPrompts = prompts;
      return getPrompts(prompts.villainousBlockId);
    })
    .then((chancePrompts) => {
      const coinFlip = Math.round(Math.random());
      if (chancePrompts.heroicBlockId === '0' && coinFlip === 1) {
        currentPrompts.villainousBlockId = chancePrompts.villainousBlockId;
      }
    })
    .then(() => {
      console.log('Line 78', currentPrompts);
      const choiceArray = [
        currentPrompts.heroicChoice,
        currentPrompts.villainousChoice,
      ];
      const coinFlip = Math.round(Math.random());
      let otherChoice = null;
      coinFlip === 1 ? (otherChoice = 0) : (otherChoice = 1);
      return inquirer.prompt([
        {
          type: 'list',
          message: chalk.blue(
            currentPrompts.prompt.replace(/{NAME}/g, user.username)
          ),
          name: 'choice',
          choices: [choiceArray[coinFlip], choiceArray[otherChoice]],
        },
      ]);
    })
    .then((answers) => {
      if (answers.choice === 'quit') return;
      if (answers.choice === 'replay') return setUsername();
      if (answers.choice === currentPrompts.villainousChoice) {
        postUserPlot(
          currentPrompts.villainousBlockId,
          currentPrompts.isHeroic,
          user.id
        );
        gameLoop(currentPrompts.villainousBlockId, user);
      } else {
        postUserPlot(
          currentPrompts.heroicBlockId,
          currentPrompts.isHeroic,
          user.id
        );
        gameLoop(currentPrompts.heroicBlockId, user);
      }
    });
};
gameStart().then(() => setUsername());
