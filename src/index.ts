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
import dayjs from 'dayjs'

import * as api from './api'

rl.question("Could you tell me your book's ISBN? ", async (isbn) => {
    spinner.start()
    await api
        .search(isbn)
        .then((book) => {
            spinner.succeed('I found your book! ^___^')

            console.log(`\n${book.title}: ${book.subtitle}`)
            console.log('by ' + book.authors?.join(', '))
            console.log(`${book.publisher}, ${dayjs(book.publishedDate, 'YYYY-MM-DD').year()}`)
            console.log(`${book.pageCount} pages`)
            console.log(`ISBN ${book.industryIdentifiers?.[0].identifier}\n`)
        })
        .catch((err) => {
            spinner.fail("I'm sorry, I couldn't find your book. Please try again. ＞︿＜")
            console.error(err)
        })
    rl.close()
})

rl.on('close', () => {
    process.exit(0)
})
