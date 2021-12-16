import fetch from 'node-fetch'
const BOOKS_API_KEY = process.env.GKEY

export type Book = {
    title?: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    industryIdentifiers?: [{ type?: string; identifier?: string }]
    pageCount?: number
    categories?: string[]
    language?: string
}

/**
 * Returns a Boolean value indicating whether the parameter is a 10- or 13-digit ISBN
 * @param isbn String to perform the test on
 */
export const testISBN = (isbn: string) => {
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm.test(isbn)
}

/**
 * Returns a Promise with a payload of either a successful Book or an unknown error
 * @param isbn 10- or 13-digit string in ISBN format
 */
export const search = (isbn: string): Promise<Book> => {
    const uri = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${BOOKS_API_KEY}`
    return new Promise(async (resolve, reject) => {
        await fetch(uri)
            .then((res: any) => res.json())
            .then((json: any) => {
                if (json.items.length > 0) {
                    if (json.items[0].volumeInfo !== undefined) {
                        resolve(json.items[0].volumeInfo as Book)
                    } else reject
                } else reject
            })
            .catch(reject)
    })
}
