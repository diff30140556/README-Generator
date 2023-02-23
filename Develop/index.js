// import needed packages for this application
const GenerateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
const inquirer = require('inquirer');

// create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'userName',
        message: 'What is your GitHub user name?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    },
    {
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a short description of your project:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'what does the user need to know about using the repo?',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'what does the user need to know about contributing to the repo?',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What command should be run to install dependencies?',
        default: 'npm i',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What command should be run to run tests?',
        default: 'npm test',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license of your project use?',
        choices:['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
];

// create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./new_README/${fileName}`, data, err => {
        if (err) throw new Error(`Oops! Looks like there's something wrong with writing file.`)
        console.log('README.md file created successfully!');
    })
}

// ask questions function
function askQuestions() {
    inquirer
        .prompt(questions)
            .then(answer => {
                console.log(answer)
                let markDownLanguage = GenerateMarkdown(answer);
                writeToFile('README.md', markDownLanguage)
            })
            .catch(err => {
                throw new Error(`Oops! Looks like there's something wrong.`)
            })
}

// initialize app, fire ask questions function
function init() {
    askQuestions();
}

// Function call to initialize app
init();