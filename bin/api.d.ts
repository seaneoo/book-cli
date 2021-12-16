export declare type Book = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
};
export declare const search: (isbn: string) => Promise<Book>;
