#!/usr/bin/env node

// TODO: Alternative way to handle providing your own Google API key
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

import * as api from './api'

rl.question("What is your book's ISBN? ", async (isbn) => {
    await api
        .search(isbn)
        .then((book) => {})
        .catch(console.error)
    rl.close()
})

rl.on('close', () => {
    process.exit(0)
})
