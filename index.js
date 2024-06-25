import chalk from 'chalk'
import inquirer  from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

// chalk colors the output in command line : Terminal string styling done right

let playername;

const sleep =(ms=2000)=>{
    new Promise((r)=>{
        setTimeout(r,ms)
    })
}

async function welcome(){
    const title = chalk.bgBlue("Who Wants to Play a Game?")
    await sleep();

    console.log(title)

    console.log(`
        ${chalk.bgBlue("How To Play?")}
        I am a process on your computer
        If you get a question wrong then i will be ${chalk.red("Killed")}
        So get all the questions right`)
}

await welcome()

// Inquirer.js : A collection of common interactive command line user interfaces.

async function askName(){
    const answers = await inquirer.prompt({
        name:"Player_Name",
        type:"input",
        message:"What is your name?",
        default(){
            return "Player"
        }
    })

    playername = answers.Player_Name
}
await askName()

// Nano Spinner : The simplest and tiniest terminal spinner for Node.js

async function question1(){
    const ans = await inquirer.prompt({
        name:"Question_1",
        type:'list',
        message:"Javascript was created in 10 days and then released on ?",
        choices:[
            "May 23,1995",
            "Nov 24,1995",
            "Dec 4,1995",
            "Dec 17,1995"
        ]
    })

    return handle_answer(ans.Question_1=="Dec 4,1995")
}

async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
      choices: ['4', '"4"', '"1111"', '69420'],
    });
    return handle_answer(answers.question_2 === '"1111"');
  }
  
  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
      choices: ['0', '🐏', '🐍', 'undefined'],
    });
  
    return handle_answer(answers.question_3 === 'undefined');
  }
  
  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'Which of the following is NOT a primitive type?\n',
      choices: [
        'boolean',
        'number',
        'null',
        'object', // Correct
      ],
    });
    return handle_answer(answers.question_4 === 'object');
  }
  
  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message:
        'JS is a high-level single-threaded, garbage-collected,\n' +
        'interpreted(or just-in-time compiled), prototype-based,\n' +
        'multi-paradigm, dynamic language with a ____ event loop\n',
      choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
    });
  
    return handle_answer(answers.question_5 === 'non-blocking');
  }

async function handle_answer(isCorrect){
    const spinner =createSpinner("Checking Answer").start()
    await sleep()
    if(isCorrect){
        spinner.success({text:`Yayyy! That's the correct answer ${playername}`})
    }
    else{
        spinner.error({text:`Game Over!!!!! You lose ${playername}`})
        process.exit(1)
    }
}

await question1()
await question2()
await question3()
await question4()
await question5()

// Figlet: This project aims to fully implement the FIGfont spec in JavaScript

function winner(){
    console.clear()
    const msg = `Congrats ${playername}, You Win!!!`

    figlet(msg,(err,data)=>{
        console.log(data)
    })
}

winner()
exit(0)