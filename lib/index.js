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
  getPrompts(gameId)
    .then((prompts) => {
      const choiceArray = [prompts.heroicChoice, prompts.villainousChoice];
      const coinFlip = Math.round(Math.random());
      let otherChoice = null;
      coinFlip === 1 ? (otherChoice = 0) : (otherChoice = 1);
      return inquirer.prompt([
        {
          type: 'list',
          message: chalk.blue(prompts.prompt.replace(/{NAME}/g, user.username)),
          name: 'choice',
          choices: [choiceArray[coinFlip], choiceArray[otherChoice]],
        },
      ]);
    })
    .then((answers) => {
      const coinFlip = Math.round(Math.random());
      return getPrompts(gameId).then((prompts) => {
        getPrompts(prompts.villainousBlockId).then((chancePrompts) => {
          console.log(chancePrompts);
          if (answers.choice === 'quit') return;
          if (answers.choice === 'replay') return setUsername();
          if (answers.choice === prompts.villainousChoice) {
            if (chancePrompts.heroicBlockId === 0 && coinFlip >= 0) {
              postUserPlot(
                prompts.villainousBlockId,
                prompts.isHeroic,
                user.id
              );
              gameLoop(chancePrompts.villainousBlockId, user);
            }
            postUserPlot(prompts.villainousBlockId, prompts.isHeroic, user.id);
            gameLoop(prompts.villainousBlockId, user);
          } else {
            postUserPlot(prompts.heroicBlockId, prompts.isHeroic, user.id);
            gameLoop(prompts.heroicBlockId, user);
          }
        });
      });
    });
};

gameStart().then(() => setUsername());
