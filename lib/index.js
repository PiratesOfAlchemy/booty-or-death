const inquirer = require('inquirer');
const { getPrompts } = require('./utils/fetch-utils');

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
gameLoop(1);
