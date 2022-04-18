const inquirer = require('inquirer');
const { getPrompts, postUsername } = require('./utils/fetch-utils');


const setUsername = async () => {

  inquirer
    .prompt([
      {
        name: 'username', 
        message: 'enter your pirate name', 
      }
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
          answers.choice === prompts.heroicChoice
            ? gameLoop(prompts.heroicBlockId)
            : gameLoop(prompts.villainousBlockId);
        });
      });
  });
};

setUsername();

