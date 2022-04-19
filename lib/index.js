/* eslint-disable no-console */
const inquirer = require('inquirer');
const { getPrompts, postUsername } = require('./utils/fetch-utils');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const gradient = require('gradient-string');
const skull = require('./utils/ascii');

// const rainbow = chalkAnimation.rainbow('This is a rainbow for pirates!').stop();
// rainbow.render();
// console.log(chalk.blue('Working?'));
// console.log(gradient('cyan', 'pink')('Hello world!'));

const sleep = (ms = 4000) => new Promise((r) => setTimeout(r, ms));

async function gameStart() {
  figlet.text(
    'Booty or Death!',
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
      postUsername(answer.username);
      console.log(`Welcome aboard, ${answer.username}`);
    })
    .then(() => gameLoop(1));
};

const gameLoop = async (id) => {
  getPrompts(id).then((prompts) => {
    prompts;
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
        getPrompts(id).then((prompts) => {
          prompts;
          if (answers.choice === 'quit') return;
          if (answers.choice === 'replay') return setUsername();
          answers.choice === prompts.heroicChoice
            ? gameLoop(prompts.heroicBlockId)
            : gameLoop(prompts.villainousBlockId);
        });
      });
  });
};


gameStart()
  .then(() => setUsername());
