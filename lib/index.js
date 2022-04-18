const inquirer = require('inquirer');
const { getPrompts, postUsername } = require('./utils/fetch-utils');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');

figlet.text('Booty or Death!!!', {
  font: 'Caligraphy2',
  horizontalLayout: 'default',
  verticalLayout: 'fitted',
  width: 100,
  whitespaceBreak: true

}, (err, data) => {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});
const rainbow = chalkAnimation.rainbow('This is a rainbow for pirates!').stop();
rainbow.render();
console.log(chalk.blue('Working?'));

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

//setUsername();

