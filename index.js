#!/usr/bin/env node

const chalk = require('chalk')
const shell = require('shelljs')
const inquirer = require('inquirer')
const figlet = require('figlet')

const init = () => {
	console.log(
		chalk.greenBright(
			figlet.textSync('file-cli', {
				font: 'Ghost',
		    horizontalLayout: 'default',
		    verticalLayout: 'default'
			})
		)
	)
}

const askQuestions = () => {
	const questions = [
		{
			name: 'FILENAME',
			type: 'input',
			message: 'What is the name of the file without extension?'
		},
		{
			name: 'EXTENSION',
			type: 'list',
			message: 'What is the file extension?',
			choices: ['.js', '.go', '.rb', '.py', '.ts', '.dart', '.swift', '.html', '.css'],
			filter: val => val.split('.')[1]
		}
	]

	return inquirer.prompt(questions)
}

const createFile = (filename, extension) => {
	const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath)
  return filePath
}

const success = filePath => {
	console.log(
		chalk.white.bgGreen.bold(`Done! File created at ${filePath}`)
	)
}

const run = async () => {
	// show introduction
	init()

	// ask questions
	const answers = await askQuestions()
	const { FILENAME, EXTENSION } = answers

	// create the file
	const filePath = createFile(FILENAME, EXTENSION)

	// show result
	success(filePath)
}

run()
