#!/usr/bin/env node

import * as dotenv from 'dotenv'
dotenv.config()

import * as readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('What is your name? ', (name) => {
    console.log(`Hello, ${name}!`)
    rl.close()
})

rl.on('close', () => {
    process.exit(0)
})

export {}
