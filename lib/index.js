const inquirer = require('inquirer');
const { getPrompts } = require('./utils/fetch-utils');
const { prompt, heroic_choice, villainous_choice } = getPrompts(1);
inquirer.prompt([prompt]).then((choices) => {
  [heroic_choice, villainous_choice];
});
