import fetch from 'node-fetch'
const BOOKS_API_KEY = process.env.GKEY

export type Book = {
    title: string
    authors: string[]
    publisher: string
    publishedDate: string
    description: string
    pageCount: number
    categories: string[]
}

