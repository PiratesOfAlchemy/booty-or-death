#!/usr/bin/env node
/* eslint-disable no-console */
const inquirer = require('inquirer');
const {
  getPrompts,
  postUsername,
  postUserPlot,
  setBooty,
  promptString,
} = require('./lib/utils/utils');
const chalk = require('chalk');
//const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const gradient = require('gradient-string');
const { skull, ship, parrot } = require('./lib/utils/ascii');

// const rainbow = chalkAnimation.rainbow('This is a rainbow for pirates!').stop();
// rainbow.render();
// console.log(chalk.blue('Working?'));
// console.log(gradient('cyan', 'pink')('Hello world!'));

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const asciiMap = {
  24: parrot,
};

async function gameStart() {
  figlet.text(
    'Booty or Death!',
    {
      font: 'Caligraphy2',
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted',
      width: 70,
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
        prefix: '*',
        name: 'username',
        message: 'Enter your pirate name',
      },
    ])
    .then((answer) => {
      console.log(
        chalk.bold(gradient.mind(`Welcome aboard, ${answer.username}`)),
        ship
      );
      return postUsername(answer.username);
    })
    .then((user) => {
      gameLoop(1, user);
    });
};

const gameLoop = async (gameId, user) => {
  let currentPrompts = {};
  let totalBooty = false;
  getPrompts(gameId)
    .then((prompts) => {
      currentPrompts = prompts;
      return getPrompts(prompts.villainousBlockId);
    })
    .then((chancePrompts) => {
      const coinFlip = Math.round(Math.random());
      //This coin flip conditional is set to never trigger for testing purposes
      if (chancePrompts.heroicBlockId === '0' && coinFlip === 1) {
        currentPrompts.villainousBlockId = chancePrompts.villainousBlockId;
      }
    })
    .then(async () => {
      if (currentPrompts.heroicChoice === 'replay') {
        totalBooty = await setBooty(user.id);
      }
    })
    .then(() => {
      // eslint-disable-next-line quotes
      const chance = chalk.dim.red(`(CHANCE)`);
      const choiceArray = [
        currentPrompts.heroicChoice,
        currentPrompts.villainousChoice,
      ];

      if (asciiMap[currentPrompts.id]) console.log(asciiMap[currentPrompts.id]);
      const coinFlip = Math.round(Math.random());
      let otherChoice = null;
      coinFlip === 1 ? (otherChoice = 0) : (otherChoice = 1);
      return inquirer.prompt([
        {
          prefix: '*',
          type: 'list',
          message: chalk.cyanBright(
            promptString(currentPrompts.prompt, user, totalBooty)
          ),
          name: 'choice',
          choices: [
            choiceArray[coinFlip].replace(/{CHANCE}/g, chance),
            choiceArray[otherChoice].replace(/{CHANCE}/g, chance),
          ],
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
        console.clear();
        gameLoop(currentPrompts.villainousBlockId, user);
      } else {
        postUserPlot(
          currentPrompts.heroicBlockId,
          currentPrompts.isHeroic,
          user.id
        );
        console.clear();
        gameLoop(currentPrompts.heroicBlockId, user);
      }
    });
};
gameStart().then(() => setUsername());
