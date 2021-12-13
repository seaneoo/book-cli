#!/usr/bin/env node

import * as dotenv from 'dotenv'
dotenv.config()

import * as readline from 'readline'
import { search } from './api'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question("What is your book's ISBN? ", async (isbn) => {
    console.log(`Searching for ISBN ${isbn}...`)

    const book = await search(isbn)
    console.log(book.title)
    console.log('by ' + book.authors.join(', '))
    console.log(book.pageCount + ' pages')

    rl.close()
})

rl.on('close', () => {
    process.exit(0)
})

export {}
