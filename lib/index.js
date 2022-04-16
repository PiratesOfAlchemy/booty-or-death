const inquirer = require('inquirer');
const { getPrompts } = require('./utils/fetch-utils');
getPrompts(1).then((prompts) => {
  const { prompt, heroicChoice, villainousChoice } = prompts;
  inquirer
    .prompt([
      {
        type: 'list',
        message: prompt,
        name: 'choices',
        choices: [heroicChoice, villainousChoice],
      },
    ])
    .then((choices) => {
      console.log(choices);
    });
});
