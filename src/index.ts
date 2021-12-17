#!/usr/bin/env node

// TODO: Do not use env vars for Google API key
import * as dotenv from 'dotenv'
dotenv.config()

import * as readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
yargs(hideBin(process.argv)).argv

import ora from 'ora'
const spinner = ora({ text: "Looking for your book! (>'-'<)", spinner: 'point' })

import * as api from './api'

rl.question("Could you tell me your book's ISBN? ", async (isbn) => {
    spinner.start()
    await api
        .search(isbn)
        .then((book) => {
            spinner.succeed('I found your book! ^___^')
            // TODO: Output information on the book
        })
        .catch((err) => {
            spinner.fail("I'm sorry, I couldn't find your book. Please try again. ＞︿＜")
            // TODO: Log error codes somewhere(?)
        })
    rl.close()
})

rl.on('close', () => {
    process.exit(0)
})
